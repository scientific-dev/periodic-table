
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function to_number(value) {
        return value === '' ? null : +value;
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.44.3' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev('SvelteDOMSetProperty', { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src\components\InfoCard.svelte generated by Svelte v3.44.3 */

    const file$4 = "src\\components\\InfoCard.svelte";

    function create_fragment$4(ctx) {
    	let div1;
    	let div0;
    	let h1;
    	let t0;
    	let t1;
    	let p;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[4].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			h1 = element("h1");
    			t0 = text(/*title*/ ctx[1]);
    			t1 = space();
    			p = element("p");
    			if (default_slot) default_slot.c();
    			attr_dev(h1, "class", "m-0 svelte-1lxrfk8");
    			add_location(h1, file$4, 10, 8, 200);
    			attr_dev(p, "class", "svelte-1lxrfk8");
    			add_location(p, file$4, 11, 8, 238);
    			attr_dev(div0, "class", "logo-inner svelte-1lxrfk8");
    			add_location(div0, file$4, 9, 4, 166);
    			attr_dev(div1, "class", "logo-main svelte-1lxrfk8");
    			set_style(div1, "--size", "min(" + /*size*/ ctx[0] + "vh, " + /*size*/ ctx[0] + "vw)");
    			toggle_class(div1, "center", /*center*/ ctx[2]);
    			add_location(div1, file$4, 4, 0, 65);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, h1);
    			append_dev(h1, t0);
    			append_dev(div0, t1);
    			append_dev(div0, p);

    			if (default_slot) {
    				default_slot.m(p, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*title*/ 2) set_data_dev(t0, /*title*/ ctx[1]);

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 8)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[3],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[3])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[3], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*size*/ 1) {
    				set_style(div1, "--size", "min(" + /*size*/ ctx[0] + "vh, " + /*size*/ ctx[0] + "vw)");
    			}

    			if (dirty & /*center*/ 4) {
    				toggle_class(div1, "center", /*center*/ ctx[2]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('InfoCard', slots, ['default']);
    	let { size = 50, title, center } = $$props;
    	const writable_props = ['size', 'title', 'center'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<InfoCard> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('size' in $$props) $$invalidate(0, size = $$props.size);
    		if ('title' in $$props) $$invalidate(1, title = $$props.title);
    		if ('center' in $$props) $$invalidate(2, center = $$props.center);
    		if ('$$scope' in $$props) $$invalidate(3, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ size, title, center });

    	$$self.$inject_state = $$props => {
    		if ('size' in $$props) $$invalidate(0, size = $$props.size);
    		if ('title' in $$props) $$invalidate(1, title = $$props.title);
    		if ('center' in $$props) $$invalidate(2, center = $$props.center);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [size, title, center, $$scope, slots];
    }

    class InfoCard extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { size: 0, title: 1, center: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "InfoCard",
    			options,
    			id: create_fragment$4.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*title*/ ctx[1] === undefined && !('title' in props)) {
    			console.warn("<InfoCard> was created without expected prop 'title'");
    		}

    		if (/*center*/ ctx[2] === undefined && !('center' in props)) {
    			console.warn("<InfoCard> was created without expected prop 'center'");
    		}
    	}

    	get size() {
    		throw new Error("<InfoCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<InfoCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<InfoCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<InfoCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get center() {
    		throw new Error("<InfoCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set center(value) {
    		throw new Error("<InfoCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const SERIES_COLORS = {
        'alkali metal': '#6c3b01',
        'alkaline earth metal': '#846011',
        'lanthanide': '#402c17',
        'actinide': '#732e4c',
        'post-transition metal': '#003666',
        'transition metal': '#711019',
        'noble gas': '#3a2151',
        'metalloid': '#015146',
        'polyatomic nonmetal': '#3e6418',
        'diatomic nonmetal': '#629e26',
        'unknown': '#545454'
    };

    const STATE_COLORS = {
        'solid': 'white',
        'liquid': '#7db7ff',
        'gas': '#ff8880',
        'unknown': '#d4d4d4'
    };

    const STATE_COLORS_REV = Object.fromEntries(Object.entries(STATE_COLORS).map(x => x.reverse()));

    const METALS = [
        'alkali metal',
        'alkaline earth metal',
        'lanthanide',
        'actinide',
        'transition metal',
        'post-transition metal'
    ];

    const NON_METALS = [
        'polyatomic nonmetal',
        'diatomic nonmetal',
        'noble gas'
    ];

    const PROPS = {
        n: 'Atomic Number',
        apprnc: 'Appearance',
        ctg: 'Category',
        clr: 'Color',
        sym: 'Symbol',
        am: 'Atomic Mass',
        by: 'Discovered By',
        nby: 'Named by',
        d: 'Density',
        b: 'Boiling Point',
        m: 'Melting Point',
        mh: 'Molar Heat',
        p: 'Period',
        phase: 'Phase',
        shls: 'Shells',
        ec: 'Electronic Configuration',
        ecs: 'Electronic Configuration Semantic',
        ea: 'Electronic Affinity',
        ie: 'Ionization Energies',
        ep: 'Electronegativity Pauling'
    };

    const formatTempValue = x => x ? `${x}K (${parseFloat((x - 273).toFixed(2))}°C) ` : 'No Data Available';

    const PROPS_FORMATTER = {
        shls: x => x?.join(', ') || 'No Data Available',
        b: formatTempValue,
        m: formatTempValue,
        d: x => x ? `${x} kg/m³` : 'No Data Available',
        c: x => x || 'No Color',
        ie: x => x?.join(', ') || 'No Data Available'
    };

    function formatPropValue (id, value) {
        return PROPS_FORMATTER[id] ? PROPS_FORMATTER[id](value) : (value || 'No Data Available');
    }

    /* src\components\Element.svelte generated by Svelte v3.44.3 */
    const file$3 = "src\\components\\Element.svelte";

    function create_fragment$3(ctx) {
    	let div;
    	let p;
    	let t0_value = /*element*/ ctx[0].n + "";
    	let t0;
    	let t1;
    	let h3;
    	let t2_value = /*element*/ ctx[0].sym + "";
    	let t2;
    	let t3;
    	let h4;
    	let t4_value = /*element*/ ctx[0].nm + "";
    	let t4;
    	let t5;
    	let h5;
    	let t6_value = (parseFloat(/*element*/ ctx[0].am.toFixed(2)) || '') + "";
    	let t6;
    	let div_id_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			t0 = text(t0_value);
    			t1 = space();
    			h3 = element("h3");
    			t2 = text(t2_value);
    			t3 = space();
    			h4 = element("h4");
    			t4 = text(t4_value);
    			t5 = space();
    			h5 = element("h5");
    			t6 = text(t6_value);
    			attr_dev(p, "class", "svelte-flvdfc");
    			add_location(p, file$3, 13, 4, 337);
    			attr_dev(h3, "class", "svelte-flvdfc");
    			add_location(h3, file$3, 14, 4, 361);
    			attr_dev(h4, "class", "svelte-flvdfc");
    			add_location(h4, file$3, 15, 4, 389);
    			attr_dev(h5, "class", "svelte-flvdfc");
    			add_location(h5, file$3, 16, 4, 416);
    			attr_dev(div, "class", "element transition svelte-flvdfc");
    			set_style(div, "--bg", /*bg*/ ctx[2]);
    			set_style(div, "--fg", "white");
    			attr_dev(div, "id", div_id_value = "elem-" + /*element*/ ctx[0].sym);
    			add_location(div, file$3, 8, 0, 189);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    			append_dev(p, t0);
    			append_dev(div, t1);
    			append_dev(div, h3);
    			append_dev(h3, t2);
    			append_dev(div, t3);
    			append_dev(div, h4);
    			append_dev(h4, t4);
    			append_dev(div, t5);
    			append_dev(div, h5);
    			append_dev(h5, t6);

    			if (!mounted) {
    				dispose = listen_dev(div, "click", /*click_handler*/ ctx[3], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*element*/ 1 && t0_value !== (t0_value = /*element*/ ctx[0].n + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*element*/ 1 && t2_value !== (t2_value = /*element*/ ctx[0].sym + "")) set_data_dev(t2, t2_value);
    			if (dirty & /*element*/ 1 && t4_value !== (t4_value = /*element*/ ctx[0].nm + "")) set_data_dev(t4, t4_value);
    			if (dirty & /*element*/ 1 && t6_value !== (t6_value = (parseFloat(/*element*/ ctx[0].am.toFixed(2)) || '') + "")) set_data_dev(t6, t6_value);

    			if (dirty & /*element*/ 1 && div_id_value !== (div_id_value = "elem-" + /*element*/ ctx[0].sym)) {
    				attr_dev(div, "id", div_id_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Element', slots, []);
    	let { element, handler } = $$props;
    	let bg = SERIES_COLORS[element.ctg] || SERIES_COLORS.unknown;
    	const writable_props = ['element', 'handler'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Element> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => handler(element);

    	$$self.$$set = $$props => {
    		if ('element' in $$props) $$invalidate(0, element = $$props.element);
    		if ('handler' in $$props) $$invalidate(1, handler = $$props.handler);
    	};

    	$$self.$capture_state = () => ({ SERIES_COLORS, element, handler, bg });

    	$$self.$inject_state = $$props => {
    		if ('element' in $$props) $$invalidate(0, element = $$props.element);
    		if ('handler' in $$props) $$invalidate(1, handler = $$props.handler);
    		if ('bg' in $$props) $$invalidate(2, bg = $$props.bg);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [element, handler, bg, click_handler];
    }

    class Element extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { element: 0, handler: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Element",
    			options,
    			id: create_fragment$3.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*element*/ ctx[0] === undefined && !('element' in props)) {
    			console.warn("<Element> was created without expected prop 'element'");
    		}

    		if (/*handler*/ ctx[1] === undefined && !('handler' in props)) {
    			console.warn("<Element> was created without expected prop 'handler'");
    		}
    	}

    	get element() {
    		throw new Error("<Element>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set element(value) {
    		throw new Error("<Element>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get handler() {
    		throw new Error("<Element>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set handler(value) {
    		throw new Error("<Element>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\Table.svelte generated by Svelte v3.44.3 */
    const file$2 = "src\\components\\Table.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i];
    	child_ctx[6] = i;
    	return child_ctx;
    }

    function get_each_context_1$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[7] = list[i];
    	return child_ctx;
    }

    function get_each_context_2$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[10] = list[i];
    	child_ctx[6] = i;
    	return child_ctx;
    }

    // (48:12) {#each Array(18) as _, i}
    function create_each_block_2$1(ctx) {
    	let div;
    	let p;
    	let t0_value = /*i*/ ctx[6] + 1 + "";
    	let t0;
    	let t1;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			t0 = text(t0_value);
    			t1 = space();
    			attr_dev(p, "class", "svelte-1qnfo3w");
    			add_location(p, file$2, 49, 20, 1260);
    			attr_dev(div, "class", "index ix svelte-1qnfo3w");
    			add_location(div, file$2, 48, 16, 1216);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    			append_dev(p, t0);
    			append_dev(div, t1);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2$1.name,
    		type: "each",
    		source: "(48:12) {#each Array(18) as _, i}",
    		ctx
    	});

    	return block;
    }

    // (64:20) {:else}
    function create_else_block$2(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "empty-element svelte-1qnfo3w");
    			add_location(div, file$2, 64, 24, 1734);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$2.name,
    		type: "else",
    		source: "(64:20) {:else}",
    		ctx
    	});

    	return block;
    }

    // (62:20) {#if element}
    function create_if_block$2(ctx) {
    	let element_1;
    	let current;

    	element_1 = new Element({
    			props: {
    				handler: /*displayElementHandler*/ ctx[0],
    				element: /*element*/ ctx[7]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(element_1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(element_1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const element_1_changes = {};
    			if (dirty & /*displayElementHandler*/ 1) element_1_changes.handler = /*displayElementHandler*/ ctx[0];
    			if (dirty & /*tableRow*/ 2) element_1_changes.element = /*element*/ ctx[7];
    			element_1.$set(element_1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(element_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(element_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(element_1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(62:20) {#if element}",
    		ctx
    	});

    	return block;
    }

    // (61:16) {#each row as element}
    function create_each_block_1$1(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$2, create_else_block$2];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*element*/ ctx[7]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$1.name,
    		type: "each",
    		source: "(61:16) {#each row as element}",
    		ctx
    	});

    	return block;
    }

    // (55:8) {#each tableRow as row, i}
    function create_each_block$1(ctx) {
    	let div1;
    	let div0;
    	let p;
    	let t0_value = /*rowIndex*/ ctx[2](/*i*/ ctx[6]) + "";
    	let t0;
    	let t1;
    	let t2;
    	let current;
    	let each_value_1 = /*row*/ ctx[4];
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1$1(get_each_context_1$1(ctx, each_value_1, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			p = element("p");
    			t0 = text(t0_value);
    			t1 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t2 = space();
    			attr_dev(p, "class", "svelte-1qnfo3w");
    			add_location(p, file$2, 57, 20, 1476);
    			attr_dev(div0, "class", "index iy svelte-1qnfo3w");
    			add_location(div0, file$2, 56, 16, 1432);
    			attr_dev(div1, "class", "row r-" + /*i*/ ctx[6] + " svelte-1qnfo3w");
    			add_location(div1, file$2, 55, 12, 1391);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, p);
    			append_dev(p, t0);
    			append_dev(div1, t1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div1, null);
    			}

    			append_dev(div1, t2);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*displayElementHandler, tableRow*/ 3) {
    				each_value_1 = /*row*/ ctx[4];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block_1$1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div1, t2);
    					}
    				}

    				group_outros();

    				for (i = each_value_1.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_1.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(55:8) {#each tableRow as row, i}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let div2;
    	let div1;
    	let div0;
    	let t;
    	let current;
    	let each_value_2 = Array(18);
    	validate_each_argument(each_value_2);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks_1[i] = create_each_block_2$1(get_each_context_2$1(ctx, each_value_2, i));
    	}

    	let each_value = /*tableRow*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div1 = element("div");
    			div0 = element("div");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div0, "class", "row svelte-1qnfo3w");
    			set_style(div0, "margin-left", "calc(var(--font-size) + 6px)");
    			add_location(div0, file$2, 46, 8, 1091);
    			attr_dev(div1, "class", "table svelte-1qnfo3w");
    			add_location(div1, file$2, 45, 4, 1062);
    			attr_dev(div2, "class", "table-wrapper svelte-1qnfo3w");
    			add_location(div2, file$2, 44, 0, 1029);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div1);
    			append_dev(div1, div0);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(div0, null);
    			}

    			append_dev(div1, t);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div1, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*tableRow, displayElementHandler, rowIndex*/ 7) {
    				each_value = /*tableRow*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div1, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			destroy_each(each_blocks_1, detaching);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Table', slots, []);
    	let { elements, displayElementHandler } = $$props;
    	let tableRow = [];

    	const rowIndex = r => {
    		if (r == 7) return '?'; else if (r > 7) return r - 2;
    		return r + 1;
    	};

    	const writable_props = ['elements', 'displayElementHandler'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Table> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('elements' in $$props) $$invalidate(3, elements = $$props.elements);
    		if ('displayElementHandler' in $$props) $$invalidate(0, displayElementHandler = $$props.displayElementHandler);
    	};

    	$$self.$capture_state = () => ({
    		Element,
    		elements,
    		displayElementHandler,
    		tableRow,
    		rowIndex
    	});

    	$$self.$inject_state = $$props => {
    		if ('elements' in $$props) $$invalidate(3, elements = $$props.elements);
    		if ('displayElementHandler' in $$props) $$invalidate(0, displayElementHandler = $$props.displayElementHandler);
    		if ('tableRow' in $$props) $$invalidate(1, tableRow = $$props.tableRow);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*elements, tableRow*/ 10) {
    			{
    				for (let i = 0; i < elements.length; i++) {
    					let element = elements[i];
    					let row = tableRow[element.cors[1] - 1];

    					if (row) row[element.cors[0] - 1] = element; else {
    						row = [];
    						row[element.cors[0] - 1] = element;
    						$$invalidate(1, tableRow[element.cors[1] - 1] = row, tableRow);
    					}
    				}

    				$$invalidate(
    					1,
    					tableRow[5][2] = {
    						n: '57-71',
    						nm: 'Lanthanides',
    						sym: 'Ln ',
    						ctg: 'lanthanide',
    						am: 0
    					},
    					tableRow
    				);

    				$$invalidate(
    					1,
    					tableRow[6][2] = {
    						n: '89-103',
    						nm: 'Actinides',
    						sym: 'Ac ',
    						ctg: 'actinide',
    						am: 0
    					},
    					tableRow
    				);
    			}
    		}
    	};

    	return [displayElementHandler, tableRow, rowIndex, elements];
    }

    class Table extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { elements: 3, displayElementHandler: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Table",
    			options,
    			id: create_fragment$2.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*elements*/ ctx[3] === undefined && !('elements' in props)) {
    			console.warn("<Table> was created without expected prop 'elements'");
    		}

    		if (/*displayElementHandler*/ ctx[0] === undefined && !('displayElementHandler' in props)) {
    			console.warn("<Table> was created without expected prop 'displayElementHandler'");
    		}
    	}

    	get elements() {
    		throw new Error("<Table>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set elements(value) {
    		throw new Error("<Table>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get displayElementHandler() {
    		throw new Error("<Table>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set displayElementHandler(value) {
    		throw new Error("<Table>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\Main.svelte generated by Svelte v3.44.3 */

    const { Object: Object_1$1, window: window_1 } = globals;
    const file$1 = "src\\components\\Main.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[25] = list[i][0];
    	child_ctx[26] = list[i][1];
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[25] = list[i][0];
    	child_ctx[26] = list[i][1];
    	return child_ctx;
    }

    function get_each_context_2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[31] = list[i][0];
    	child_ctx[25] = list[i][1];
    	return child_ctx;
    }

    // (107:12) {#each detailsExpanded ? Object.entries(PROPS) : Object.entries(PROPS).slice(0, 3) as [id, name]}
    function create_each_block_2(ctx) {
    	let span;
    	let p0;
    	let t0_value = /*name*/ ctx[25] + "";
    	let t0;
    	let t1;
    	let t2;
    	let p1;
    	let t3_value = formatPropValue(/*id*/ ctx[31], /*displayElement*/ ctx[3][/*id*/ ctx[31]]) + "";
    	let t3;
    	let t4;

    	const block = {
    		c: function create() {
    			span = element("span");
    			p0 = element("p");
    			t0 = text(t0_value);
    			t1 = text(":");
    			t2 = space();
    			p1 = element("p");
    			t3 = text(t3_value);
    			t4 = space();
    			attr_dev(p0, "class", "strong svelte-qjazaj");
    			add_location(p0, file$1, 108, 20, 3802);
    			attr_dev(p1, "class", "svelte-qjazaj");
    			add_location(p1, file$1, 109, 20, 3853);
    			attr_dev(span, "class", "svelte-qjazaj");
    			add_location(span, file$1, 107, 16, 3774);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, p0);
    			append_dev(p0, t0);
    			append_dev(p0, t1);
    			append_dev(span, t2);
    			append_dev(span, p1);
    			append_dev(p1, t3);
    			append_dev(span, t4);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*detailsExpanded*/ 16 && t0_value !== (t0_value = /*name*/ ctx[25] + "")) set_data_dev(t0, t0_value);
    			if (dirty[0] & /*detailsExpanded, displayElement*/ 24 && t3_value !== (t3_value = formatPropValue(/*id*/ ctx[31], /*displayElement*/ ctx[3][/*id*/ ctx[31]]) + "")) set_data_dev(t3, t3_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2.name,
    		type: "each",
    		source: "(107:12) {#each detailsExpanded ? Object.entries(PROPS) : Object.entries(PROPS).slice(0, 3) as [id, name]}",
    		ctx
    	});

    	return block;
    }

    // (119:12) {:else}
    function create_else_block$1(ctx) {
    	let a;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			a = element("a");
    			a.textContent = "Read more";
    			attr_dev(a, "href", "/#");
    			attr_dev(a, "class", "svelte-qjazaj");
    			add_location(a, file$1, 119, 16, 4255);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);

    			if (!mounted) {
    				dispose = listen_dev(a, "click", /*click_handler_2*/ ctx[14], false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(119:12) {:else}",
    		ctx
    	});

    	return block;
    }

    // (116:12) {#if detailsExpanded}
    function create_if_block_1$1(ctx) {
    	let a0;
    	let t0;
    	let a0_href_value;
    	let t1;
    	let a1;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			a0 = element("a");
    			t0 = text("Read more from Wikipedia");
    			t1 = space();
    			a1 = element("a");
    			a1.textContent = "Read less";
    			attr_dev(a0, "href", a0_href_value = /*displayElement*/ ctx[3].src);
    			attr_dev(a0, "target", "_blank");
    			attr_dev(a0, "class", "svelte-qjazaj");
    			add_location(a0, file$1, 116, 16, 4058);
    			attr_dev(a1, "href", "/#");
    			attr_dev(a1, "class", "svelte-qjazaj");
    			add_location(a1, file$1, 117, 16, 4149);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a0, anchor);
    			append_dev(a0, t0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, a1, anchor);

    			if (!mounted) {
    				dispose = listen_dev(a1, "click", /*click_handler_1*/ ctx[13], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*displayElement*/ 8 && a0_href_value !== (a0_href_value = /*displayElement*/ ctx[3].src)) {
    				attr_dev(a0, "href", a0_href_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(a1);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(116:12) {#if detailsExpanded}",
    		ctx
    	});

    	return block;
    }

    // (126:8) {#each Object.entries(SERIES_COLORS).slice(0, -1) as [name, color]}
    function create_each_block_1(ctx) {
    	let span;
    	let t_value = /*name*/ ctx[25] + "";
    	let t;
    	let mounted;
    	let dispose;

    	function click_handler_3() {
    		return /*click_handler_3*/ ctx[15](/*name*/ ctx[25]);
    	}

    	const block = {
    		c: function create() {
    			span = element("span");
    			t = text(t_value);
    			attr_dev(span, "class", "item svelte-qjazaj");
    			set_style(span, "background-color", /*color*/ ctx[26]);
    			add_location(span, file$1, 126, 12, 4487);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t);

    			if (!mounted) {
    				dispose = listen_dev(span, "click", click_handler_3, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(126:8) {#each Object.entries(SERIES_COLORS).slice(0, -1) as [name, color]}",
    		ctx
    	});

    	return block;
    }

    // (134:8) {#if moreFilters}
    function create_if_block$1(ctx) {
    	let br0;
    	let br1;
    	let t0;
    	let t1;
    	let span0;
    	let t3;
    	let span1;
    	let mounted;
    	let dispose;
    	let each_value = Object.entries(STATE_COLORS);
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			br0 = element("br");
    			br1 = element("br");
    			t0 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t1 = space();
    			span0 = element("span");
    			span0.textContent = "Metal";
    			t3 = space();
    			span1 = element("span");
    			span1.textContent = "Non Metal";
    			add_location(br0, file$1, 134, 12, 4744);
    			add_location(br1, file$1, 134, 17, 4749);
    			attr_dev(span0, "class", "item svelte-qjazaj");
    			set_style(span0, "background-color", "var(--btn-bg)");
    			set_style(span0, "margin-right", "-2px");
    			add_location(span0, file$1, 144, 12, 5098);
    			attr_dev(span1, "class", "item svelte-qjazaj");
    			set_style(span1, "background-color", "var(--btn-bg)");
    			add_location(span1, file$1, 150, 12, 5346);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, br0, anchor);
    			insert_dev(target, br1, anchor);
    			insert_dev(target, t0, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, t1, anchor);
    			insert_dev(target, span0, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, span1, anchor);

    			if (!mounted) {
    				dispose = [
    					listen_dev(span0, "click", /*click_handler_5*/ ctx[17], false, false, false),
    					listen_dev(span1, "click", /*click_handler_6*/ ctx[18], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*displayElementsWithState*/ 512) {
    				each_value = Object.entries(STATE_COLORS);
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(t1.parentNode, t1);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(br0);
    			if (detaching) detach_dev(br1);
    			if (detaching) detach_dev(t0);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(span0);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(span1);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(134:8) {#if moreFilters}",
    		ctx
    	});

    	return block;
    }

    // (137:12) {#each Object.entries(STATE_COLORS) as [name, color]}
    function create_each_block(ctx) {
    	let span;
    	let t_value = /*name*/ ctx[25] + "";
    	let t;
    	let mounted;
    	let dispose;

    	function click_handler_4() {
    		return /*click_handler_4*/ ctx[16](/*name*/ ctx[25]);
    	}

    	const block = {
    		c: function create() {
    			span = element("span");
    			t = text(t_value);
    			attr_dev(span, "class", "item svelte-qjazaj");
    			set_style(span, "color", /*color*/ ctx[26]);
    			set_style(span, "background-color", "var(--btn-bg)");
    			add_location(span, file$1, 137, 16, 4841);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t);

    			if (!mounted) {
    				dispose = listen_dev(span, "click", click_handler_4, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(137:12) {#each Object.entries(STATE_COLORS) as [name, color]}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let div9;
    	let div2;
    	let h3;
    	let t0_value = /*displayElement*/ ctx[3].nm + "";
    	let t0;
    	let t1;
    	let p0;
    	let t2_value = (/*displayElement*/ ctx[3].des || 'No Description Available') + "";
    	let t2;
    	let t3;
    	let div0;
    	let t4;
    	let div1;
    	let t5;
    	let div3;
    	let t6;
    	let t7;
    	let span;
    	let t9;
    	let div6;
    	let input0;
    	let t10;
    	let div4;
    	let input1;
    	let t11;
    	let p1;
    	let t13;
    	let div5;
    	let input2;
    	let t14;
    	let p2;
    	let t16;
    	let div7;
    	let table;
    	let t17;
    	let hr;
    	let t18;
    	let div8;
    	let p3;
    	let t19;
    	let a;
    	let t21;
    	let p4;
    	let current;
    	let mounted;
    	let dispose;

    	let each_value_2 = /*detailsExpanded*/ ctx[4]
    	? Object.entries(PROPS)
    	: Object.entries(PROPS).slice(0, 3);

    	validate_each_argument(each_value_2);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks_1[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
    	}

    	function select_block_type(ctx, dirty) {
    		if (/*detailsExpanded*/ ctx[4]) return create_if_block_1$1;
    		return create_else_block$1;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block0 = current_block_type(ctx);
    	let each_value_1 = Object.entries(SERIES_COLORS).slice(0, -1);
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	let if_block1 = /*moreFilters*/ ctx[5] && create_if_block$1(ctx);

    	table = new Table({
    			props: {
    				elements: /*elements*/ ctx[0],
    				displayElementHandler: /*displayElementHandler*/ ctx[7]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div9 = element("div");
    			div2 = element("div");
    			h3 = element("h3");
    			t0 = text(t0_value);
    			t1 = space();
    			p0 = element("p");
    			t2 = text(t2_value);
    			t3 = space();
    			div0 = element("div");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t4 = space();
    			div1 = element("div");
    			if_block0.c();
    			t5 = space();
    			div3 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t6 = space();
    			if (if_block1) if_block1.c();
    			t7 = space();
    			span = element("span");
    			span.textContent = "...";
    			t9 = space();
    			div6 = element("div");
    			input0 = element("input");
    			t10 = space();
    			div4 = element("div");
    			input1 = element("input");
    			t11 = space();
    			p1 = element("p");
    			p1.textContent = "K";
    			t13 = space();
    			div5 = element("div");
    			input2 = element("input");
    			t14 = space();
    			p2 = element("p");
    			p2.textContent = "°C";
    			t16 = space();
    			div7 = element("div");
    			create_component(table.$$.fragment);
    			t17 = space();
    			hr = element("hr");
    			t18 = space();
    			div8 = element("div");
    			p3 = element("p");
    			t19 = text("Made by ");
    			a = element("a");
    			a.textContent = "TheSudarsanDev";
    			t21 = space();
    			p4 = element("p");
    			p4.textContent = "TheSudarsanDev © 2022";
    			attr_dev(h3, "class", "m-0 svelte-qjazaj");
    			add_location(h3, file$1, 102, 8, 3442);
    			attr_dev(p0, "class", "svelte-qjazaj");
    			add_location(p0, file$1, 103, 8, 3541);
    			attr_dev(div0, "class", "values flex flex-wrap svelte-qjazaj");
    			add_location(div0, file$1, 105, 8, 3610);
    			set_style(div1, "margin-top", "20px");
    			attr_dev(div1, "class", "svelte-qjazaj");
    			add_location(div1, file$1, 114, 8, 3975);
    			attr_dev(div2, "class", "display-element svelte-qjazaj");
    			add_location(div2, file$1, 101, 4, 3403);
    			attr_dev(span, "class", "item svelte-qjazaj");
    			set_style(span, "background-color", "var(--fg)");
    			set_style(span, "color", "var(--bg)");
    			add_location(span, file$1, 157, 8, 5593);
    			attr_dev(div3, "class", "series svelte-qjazaj");
    			add_location(div3, file$1, 124, 4, 4376);
    			attr_dev(input0, "type", "range");
    			attr_dev(input0, "min", "0");
    			attr_dev(input0, "max", "6000");
    			attr_dev(input0, "default", "0");
    			attr_dev(input0, "class", "svelte-qjazaj");
    			add_location(input0, file$1, 168, 8, 5931);
    			attr_dev(input1, "type", "number");
    			attr_dev(input1, "min", "0");
    			attr_dev(input1, "max", "6000");
    			attr_dev(input1, "class", "svelte-qjazaj");
    			add_location(input1, file$1, 171, 12, 6058);
    			attr_dev(p1, "class", "svelte-qjazaj");
    			add_location(p1, file$1, 172, 12, 6134);
    			attr_dev(div4, "class", "flex flex-nowrap svelte-qjazaj");
    			add_location(div4, file$1, 170, 8, 6014);
    			attr_dev(input2, "type", "number");
    			attr_dev(input2, "min", "-273");
    			attr_dev(input2, "max", "5727");
    			input2.value = /*celsiusTemp*/ ctx[2];
    			attr_dev(input2, "class", "svelte-qjazaj");
    			add_location(input2, file$1, 176, 12, 6214);
    			attr_dev(p2, "class", "svelte-qjazaj");
    			add_location(p2, file$1, 183, 12, 6454);
    			attr_dev(div5, "class", "flex flex-nowrap svelte-qjazaj");
    			add_location(div5, file$1, 175, 8, 6170);
    			attr_dev(div6, "class", "inputs flex flex-wrap svelte-qjazaj");
    			add_location(div6, file$1, 167, 4, 5886);
    			add_location(div7, file$1, 187, 4, 6499);
    			set_style(hr, "margin-top", "40px");
    			add_location(hr, file$1, 191, 4, 6610);
    			attr_dev(a, "class", "strong svelte-qjazaj");
    			attr_dev(a, "href", "https://github.com/scientific-dev");
    			add_location(a, file$1, 194, 31, 6705);
    			attr_dev(p3, "class", "m-0");
    			add_location(p3, file$1, 194, 8, 6682);
    			set_style(p4, "margin-top", "4px");
    			add_location(p4, file$1, 195, 8, 6796);
    			attr_dev(div8, "class", "footer svelte-qjazaj");
    			add_location(div8, file$1, 193, 4, 6652);
    			attr_dev(div9, "class", "main");
    			attr_dev(div9, "id", "main");
    			add_location(div9, file$1, 100, 0, 3369);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div9, anchor);
    			append_dev(div9, div2);
    			append_dev(div2, h3);
    			append_dev(h3, t0);
    			append_dev(div2, t1);
    			append_dev(div2, p0);
    			append_dev(p0, t2);
    			append_dev(div2, t3);
    			append_dev(div2, div0);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(div0, null);
    			}

    			append_dev(div2, t4);
    			append_dev(div2, div1);
    			if_block0.m(div1, null);
    			append_dev(div9, t5);
    			append_dev(div9, div3);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div3, null);
    			}

    			append_dev(div3, t6);
    			if (if_block1) if_block1.m(div3, null);
    			append_dev(div3, t7);
    			append_dev(div3, span);
    			append_dev(div9, t9);
    			append_dev(div9, div6);
    			append_dev(div6, input0);
    			set_input_value(input0, /*temperature*/ ctx[1]);
    			append_dev(div6, t10);
    			append_dev(div6, div4);
    			append_dev(div4, input1);
    			set_input_value(input1, /*temperature*/ ctx[1]);
    			append_dev(div4, t11);
    			append_dev(div4, p1);
    			append_dev(div6, t13);
    			append_dev(div6, div5);
    			append_dev(div5, input2);
    			append_dev(div5, t14);
    			append_dev(div5, p2);
    			append_dev(div9, t16);
    			append_dev(div9, div7);
    			mount_component(table, div7, null);
    			append_dev(div9, t17);
    			append_dev(div9, hr);
    			append_dev(div9, t18);
    			append_dev(div9, div8);
    			append_dev(div8, p3);
    			append_dev(p3, t19);
    			append_dev(p3, a);
    			append_dev(div8, t21);
    			append_dev(div8, p4);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(window_1, "hashchange", /*onHashChange*/ ctx[6], false, false, false),
    					listen_dev(h3, "click", /*click_handler*/ ctx[12], false, false, false),
    					listen_dev(span, "click", /*click_handler_7*/ ctx[19], false, false, false),
    					listen_dev(input0, "change", /*input0_change_input_handler*/ ctx[20]),
    					listen_dev(input0, "input", /*input0_change_input_handler*/ ctx[20]),
    					listen_dev(input1, "input", /*input1_input_handler*/ ctx[21]),
    					listen_dev(input2, "input", /*input_handler*/ ctx[22], false, false, false),
    					listen_dev(div7, "click", /*normalizeTableDisplay*/ ctx[10], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if ((!current || dirty[0] & /*displayElement*/ 8) && t0_value !== (t0_value = /*displayElement*/ ctx[3].nm + "")) set_data_dev(t0, t0_value);
    			if ((!current || dirty[0] & /*displayElement*/ 8) && t2_value !== (t2_value = (/*displayElement*/ ctx[3].des || 'No Description Available') + "")) set_data_dev(t2, t2_value);

    			if (dirty[0] & /*detailsExpanded, displayElement*/ 24) {
    				each_value_2 = /*detailsExpanded*/ ctx[4]
    				? Object.entries(PROPS)
    				: Object.entries(PROPS).slice(0, 3);

    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2(ctx, each_value_2, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_1[i] = create_each_block_2(child_ctx);
    						each_blocks_1[i].c();
    						each_blocks_1[i].m(div0, null);
    					}
    				}

    				for (; i < each_blocks_1.length; i += 1) {
    					each_blocks_1[i].d(1);
    				}

    				each_blocks_1.length = each_value_2.length;
    			}

    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block0) {
    				if_block0.p(ctx, dirty);
    			} else {
    				if_block0.d(1);
    				if_block0 = current_block_type(ctx);

    				if (if_block0) {
    					if_block0.c();
    					if_block0.m(div1, null);
    				}
    			}

    			if (dirty[0] & /*displayElementsWithFilter*/ 256) {
    				each_value_1 = Object.entries(SERIES_COLORS).slice(0, -1);
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div3, t6);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}

    			if (/*moreFilters*/ ctx[5]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block$1(ctx);
    					if_block1.c();
    					if_block1.m(div3, t7);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if (dirty[0] & /*temperature*/ 2) {
    				set_input_value(input0, /*temperature*/ ctx[1]);
    			}

    			if (dirty[0] & /*temperature*/ 2 && to_number(input1.value) !== /*temperature*/ ctx[1]) {
    				set_input_value(input1, /*temperature*/ ctx[1]);
    			}

    			if (!current || dirty[0] & /*celsiusTemp*/ 4 && input2.value !== /*celsiusTemp*/ ctx[2]) {
    				prop_dev(input2, "value", /*celsiusTemp*/ ctx[2]);
    			}

    			const table_changes = {};
    			if (dirty[0] & /*elements*/ 1) table_changes.elements = /*elements*/ ctx[0];
    			table.$set(table_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(table.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(table.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div9);
    			destroy_each(each_blocks_1, detaching);
    			if_block0.d();
    			destroy_each(each_blocks, detaching);
    			if (if_block1) if_block1.d();
    			destroy_component(table);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function dullSubGroups(o = 0.5) {
    	['Ln ', 'Ac '].forEach(x => {
    		let elem = document.getElementById(`elem-${x}`);
    		if (elem) elem.style.opacity = o;
    	});
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Main', slots, []);
    	let { elements = [] } = $$props;

    	let temperature = 0,
    		celsiusTemp = -273,
    		displayElement = elements[0],
    		detailsExpanded = false,
    		moreFilters = false,
    		stateDisplay = null;

    	function onHashChange() {
    		let hash = window.location.hash.slice(1).toLowerCase();

    		if (hash) {
    			let parsedHash = parseInt(hash);

    			if (isNaN(parsedHash)) for (let i = 0; i < elements.length; i++) {
    				if (elements[i].nm.toLowerCase() == hash) $$invalidate(3, displayElement = elements[i]);
    			} else if (elements[parsedHash]) $$invalidate(3, displayElement = elements[parsedHash]); else $$invalidate(3, displayElement = elements[parseInt(localStorage.getItem('d_el') || '') - 1] || elements[0]);
    		}
    	}

    	function getColorForTemperature(element) {
    		if (element.b && element.b <= temperature) return STATE_COLORS.gas; else if (element.b && element.m <= temperature) return element.m ? STATE_COLORS.liquid : STATE_COLORS.unknown; else if (element.m && element.m > temperature) return STATE_COLORS.solid;
    		return STATE_COLORS.unknown;
    	}

    	function colourElementsOnTemperature() {
    		for (let i = 0; i < elements.length; i++) {
    			let element = elements[i];
    			let elem = document.getElementById(`elem-${element.sym}`);
    			if (elem) elem.style.color = getColorForTemperature(element);
    		}
    	}

    	function displayElementHandler(e) {
    		$$invalidate(3, displayElement = e);
    		window.scrollTo({ top: 0 });
    		localStorage.setItem('d_el', e.n);
    	}

    	function displayElementsWithFilter(f) {
    		dullSubGroups();

    		for (let i = 0; i < elements.length; i++) {
    			let element = elements[i];
    			document.getElementById(`elem-${element.sym}`).style.opacity = f(element) ? 1 : 0.5;
    		}
    	}

    	function displayElementsWithState(s) {
    		$$invalidate(11, stateDisplay = s);
    		dullSubGroups();

    		for (let i = 0; i < elements.length; i++) {
    			let element = elements[i];
    			let elem = document.getElementById(`elem-${element.sym}`);

    			elem.style.opacity = STATE_COLORS_REV[getColorForTemperature(element)] == s
    			? 1
    			: 0.5;
    		}
    	}

    	function normalizeTableDisplay() {
    		$$invalidate(11, stateDisplay = false);
    		dullSubGroups(1);
    		for (let i = 0; i < elements.length; i++) document.getElementById(`elem-${elements[i].sym}`).style.opacity = 1;
    	}

    	onMount(() => {
    		colourElementsOnTemperature();
    		onHashChange();
    	});

    	const writable_props = ['elements'];

    	Object_1$1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Main> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => window.open(displayElement.src);
    	const click_handler_1 = () => $$invalidate(4, detailsExpanded = false);
    	const click_handler_2 = () => $$invalidate(4, detailsExpanded = true);
    	const click_handler_3 = name => displayElementsWithFilter(x => x.ctg == name);
    	const click_handler_4 = name => displayElementsWithState(name);
    	const click_handler_5 = () => displayElementsWithFilter(x => METALS.includes(x.ctg));
    	const click_handler_6 = () => displayElementsWithFilter(x => NON_METALS.includes(x.ctg));

    	const click_handler_7 = () => {
    		if (moreFilters) normalizeTableDisplay();
    		$$invalidate(5, moreFilters = !moreFilters);
    	};

    	function input0_change_input_handler() {
    		temperature = to_number(this.value);
    		$$invalidate(1, temperature);
    	}

    	function input1_input_handler() {
    		temperature = to_number(this.value);
    		$$invalidate(1, temperature);
    	}

    	const input_handler = e => $$invalidate(1, temperature = parseFloat(e.target.value) + 273);

    	$$self.$$set = $$props => {
    		if ('elements' in $$props) $$invalidate(0, elements = $$props.elements);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		SERIES_COLORS,
    		STATE_COLORS,
    		PROPS,
    		formatPropValue,
    		STATE_COLORS_REV,
    		METALS,
    		NON_METALS,
    		Table,
    		elements,
    		temperature,
    		celsiusTemp,
    		displayElement,
    		detailsExpanded,
    		moreFilters,
    		stateDisplay,
    		onHashChange,
    		getColorForTemperature,
    		colourElementsOnTemperature,
    		dullSubGroups,
    		displayElementHandler,
    		displayElementsWithFilter,
    		displayElementsWithState,
    		normalizeTableDisplay
    	});

    	$$self.$inject_state = $$props => {
    		if ('elements' in $$props) $$invalidate(0, elements = $$props.elements);
    		if ('temperature' in $$props) $$invalidate(1, temperature = $$props.temperature);
    		if ('celsiusTemp' in $$props) $$invalidate(2, celsiusTemp = $$props.celsiusTemp);
    		if ('displayElement' in $$props) $$invalidate(3, displayElement = $$props.displayElement);
    		if ('detailsExpanded' in $$props) $$invalidate(4, detailsExpanded = $$props.detailsExpanded);
    		if ('moreFilters' in $$props) $$invalidate(5, moreFilters = $$props.moreFilters);
    		if ('stateDisplay' in $$props) $$invalidate(11, stateDisplay = $$props.stateDisplay);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*temperature, stateDisplay*/ 2050) {
    			{
    				colourElementsOnTemperature();
    				$$invalidate(2, celsiusTemp = temperature - 273);
    				if (stateDisplay) displayElementsWithState(stateDisplay);
    			}
    		}
    	};

    	return [
    		elements,
    		temperature,
    		celsiusTemp,
    		displayElement,
    		detailsExpanded,
    		moreFilters,
    		onHashChange,
    		displayElementHandler,
    		displayElementsWithFilter,
    		displayElementsWithState,
    		normalizeTableDisplay,
    		stateDisplay,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		click_handler_3,
    		click_handler_4,
    		click_handler_5,
    		click_handler_6,
    		click_handler_7,
    		input0_change_input_handler,
    		input1_input_handler,
    		input_handler
    	];
    }

    class Main extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { elements: 0 }, null, [-1, -1]);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Main",
    			options,
    			id: create_fragment$1.name
    		});
    	}

    	get elements() {
    		throw new Error("<Main>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set elements(value) {
    		throw new Error("<Main>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\App.svelte generated by Svelte v3.44.3 */

    const { Object: Object_1 } = globals;
    const file = "src\\App.svelte";

    // (45:1) {:else}
    function create_else_block(ctx) {
    	let main;
    	let current;

    	main = new Main({
    			props: {
    				elements: Object.values(/*elements*/ ctx[0])
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(main.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(main, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const main_changes = {};
    			if (dirty & /*elements*/ 1) main_changes.elements = Object.values(/*elements*/ ctx[0]);
    			main.$set(main_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(main.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(main.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(main, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(45:1) {:else}",
    		ctx
    	});

    	return block;
    }

    // (41:31) 
    function create_if_block_1(ctx) {
    	let infocard;
    	let current;

    	infocard = new InfoCard({
    			props: {
    				title: "500!",
    				center: true,
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(infocard.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(infocard, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const infocard_changes = {};

    			if (dirty & /*$$scope*/ 16) {
    				infocard_changes.$$scope = { dirty, ctx };
    			}

    			infocard.$set(infocard_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(infocard.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(infocard.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(infocard, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(41:31) ",
    		ctx
    	});

    	return block;
    }

    // (37:1) {#if !elements}
    function create_if_block(ctx) {
    	let infocard;
    	let current;

    	infocard = new InfoCard({
    			props: {
    				title: "Loading stuff...",
    				center: true,
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(infocard.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(infocard, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const infocard_changes = {};

    			if (dirty & /*$$scope*/ 16) {
    				infocard_changes.$$scope = { dirty, ctx };
    			}

    			infocard.$set(infocard_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(infocard.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(infocard.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(infocard, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(37:1) {#if !elements}",
    		ctx
    	});

    	return block;
    }

    // (42:2) <InfoCard title="500!" center>
    function create_default_slot_1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Internal Server Error. Try to refresh this page and if you see this again, kindly report this issue to the developers of the site.");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(42:2) <InfoCard title=\\\"500!\\\" center>",
    		ctx
    	});

    	return block;
    }

    // (38:2) <InfoCard title="Loading stuff..." center>
    function create_default_slot(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("It takes us some time to make the periodic table ready...");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(38:2) <InfoCard title=\\\"Loading stuff...\\\" center>",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let div;
    	let h1;
    	let t1;
    	let a;
    	let t2;
    	let t3_value = (/*darkMode*/ ctx[1] ? 'light' : 'dark') + "";
    	let t3;
    	let t4;
    	let t5;
    	let hr;
    	let t6;
    	let current_block_type_index;
    	let if_block;
    	let current;
    	let mounted;
    	let dispose;
    	const if_block_creators = [create_if_block, create_if_block_1, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (!/*elements*/ ctx[0]) return 0;
    		if (/*elements*/ ctx[0] == "error") return 1;
    		return 2;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			h1 = element("h1");
    			h1.textContent = "The Periodic Table";
    			t1 = space();
    			a = element("a");
    			t2 = text("Toggle to ");
    			t3 = text(t3_value);
    			t4 = text(" mode?");
    			t5 = space();
    			hr = element("hr");
    			t6 = space();
    			if_block.c();
    			attr_dev(h1, "class", "m-0 svelte-16fa7fn");
    			add_location(h1, file, 23, 1, 657);
    			attr_dev(a, "href", "/#");
    			attr_dev(a, "class", "svelte-16fa7fn");
    			add_location(a, file, 25, 1, 701);
    			add_location(hr, file, 34, 1, 920);
    			attr_dev(div, "class", "main svelte-16fa7fn");
    			add_location(div, file, 22, 0, 636);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h1);
    			append_dev(div, t1);
    			append_dev(div, a);
    			append_dev(a, t2);
    			append_dev(a, t3);
    			append_dev(a, t4);
    			append_dev(div, t5);
    			append_dev(div, hr);
    			append_dev(div, t6);
    			if_blocks[current_block_type_index].m(div, null);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(a, "click", /*click_handler*/ ctx[3], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if ((!current || dirty & /*darkMode*/ 2) && t3_value !== (t3_value = (/*darkMode*/ ctx[1] ? 'light' : 'dark') + "")) set_data_dev(t3, t3_value);
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(div, null);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if_blocks[current_block_type_index].d();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let elements = null, darkMode = false;
    	const manageDarkModeClass = () => document.body.classList[darkMode ? 'add' : 'remove']('darkmode');

    	onMount(() => {
    		$$invalidate(1, darkMode = Boolean(JSON.parse(localStorage.getItem('dark_mode') || '')));
    		manageDarkModeClass();
    	});

    	// TODO(scientific-dev): Change fetch url later...
    	fetch('./elements.json').then(res => res.json()).then(x => $$invalidate(0, elements = x), () => $$invalidate(0, elements = "error"));

    	const writable_props = [];

    	Object_1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => {
    		$$invalidate(1, darkMode = !darkMode);
    		localStorage.setItem('dark_mode', JSON.stringify(darkMode));
    		manageDarkModeClass();
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		InfoCard,
    		Main,
    		elements,
    		darkMode,
    		manageDarkModeClass
    	});

    	$$self.$inject_state = $$props => {
    		if ('elements' in $$props) $$invalidate(0, elements = $$props.elements);
    		if ('darkMode' in $$props) $$invalidate(1, darkMode = $$props.darkMode);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [elements, darkMode, manageDarkModeClass, click_handler];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    var main = new App({ target: document.body });

    return main;

})();
