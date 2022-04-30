<script>
    import { onMount } from 'svelte';
    import { SERIES_COLORS, STATE_COLORS, PROPS, formatPropValue, STATE_COLORS_REV, METALS, NON_METALS } from '../utils/constants';
    import Table from './Table.svelte';

    export let elements = [];

    let temperature = 0,
        celsiusTemp = -273,
        displayElement = elements[0],
        detailsExpanded = false,
        stateDisplay = null;

    function onHashChange () {
        let hash = window.location.hash.slice(1).toLowerCase();
        
        if (hash) {
            let parsedHash = parseInt(hash);

            if (isNaN(parsedHash)) 
                for (let i = 0; i < elements.length; i++) {
                    if (elements[i].nm.toLowerCase() == hash) displayElement = elements[i];
                }

            else if (elements[parsedHash]) displayElement = elements[parsedHash];
            else displayElement = elements[parseInt(localStorage.getItem('d_el') || '') - 1] || elements[0];
        }
    }

    function getColorForTemperature (element) {
        if (element.b && (element.b <= temperature)) return STATE_COLORS.gas;
        else if (element.b && (element.m <= temperature)) return element.m ? STATE_COLORS.liquid : STATE_COLORS.unknown;
        else if (element.m && (element.m > temperature)) return STATE_COLORS.solid;
        return STATE_COLORS.unknown;
    }

    function colourElementsOnTemperature () {
        for (let i = 0; i < elements.length; i++) {
            let element = elements[i];
            let elem = document.getElementById(`elem-${element.sym}`);
            if (elem) elem.style.color = getColorForTemperature(element);
        }
    }

    function dullSubGroups (o = 0.5) {
        ['Ln ', 'Ac '].forEach(x => {
            let elem = document.getElementById(`elem-${x}`);
            if (elem) elem.style.opacity = o;
        });
    }

    function displayElementHandler (e) {
        displayElement = e;
        window.scrollTo({ top: 0 });
        localStorage.setItem('d_el', e.n);
    }

    function displayElementsWithFilter (f) {
        dullSubGroups();

        for (let i = 0; i < elements.length; i++) {
            let element = elements[i];
            document.getElementById(`elem-${element.sym}`).style.opacity = f(element) ? 1 : 0.5;
        }
    }

    function displayElementsWithState (s) {
        stateDisplay = s;
        dullSubGroups();
        
        for (let i = 0; i < elements.length; i++) {
            let element = elements[i];
            let elem = document.getElementById(`elem-${element.sym}`);
            elem.style.opacity = STATE_COLORS_REV[getColorForTemperature(element)] == s ? 1 : 0.5;
        }
    }

    function normalizeTableDisplay () {
        stateDisplay = false;
        dullSubGroups(1);

        for (let i = 0; i < elements.length; i++) 
            document.getElementById(`elem-${elements[i].sym}`).style.opacity = 1;
    }

    $: {
        colourElementsOnTemperature(temperature);
        celsiusTemp = temperature - 273;
        if (stateDisplay) displayElementsWithState(stateDisplay);
    }

    onMount(() => {
        colourElementsOnTemperature();
        onHashChange();
    });
</script>

<svelte:window on:hashchange={onHashChange}/>

<div class="main" id="main">
    <div class="display-element">
        <h3 class="m-0" on:click={() => window.open(displayElement.src)}>{displayElement.nm}</h3>
        <p>{displayElement.des || 'No Description Available'}</p>

        <div class="values">
            {#each detailsExpanded ? Object.entries(PROPS) : Object.entries(PROPS).slice(0, 3) as [id, name]}
                <span>
                    <p class="strong">{name}:</p>
                    <p>{formatPropValue(id, displayElement[id])}</p>
                </span>
            {/each}
        </div>

        <div style="margin-top: 20px">
            {#if detailsExpanded}
                <a href={displayElement.src} target="_blank">Read more from Wikipedia</a>
                <a href="./#" on:click={() => detailsExpanded = false}>Read less</a>
            {:else}
                <a href="./#" on:click={() => detailsExpanded = true}>Read more</a>
            {/if}
        </div>
    </div>

    <div class="series">
        {#each Object.entries(SERIES_COLORS).slice(0, -1) as [name, color]}
            <span 
                class="item" 
                style="background-color: {color};"
                on:click={() => displayElementsWithFilter(x => x.ctg == name)}
            >{name}</span>
        {/each}

        <span 
            class="item" 
            style="background-color: var(--btn-bg); margin-right: -2px;" 
            on:click={() => displayElementsWithFilter(x => METALS.includes(x.ctg))}
        >Metal</span>

        <span 
            class="item" 
            style="background-color: var(--btn-bg);" 
            on:click={() => displayElementsWithFilter(x => NON_METALS.includes(x.ctg))}
        >Non Metal</span> <br/>
        
        <div class="flex flex-wrap">
            {#each Object.entries(STATE_COLORS) as [n, color]}
                <span 
                    class="item-state" 
                    style="color: {color}; background-color: {SERIES_COLORS['diatomic nonmetal']};"
                    on:click={() => displayElementsWithState(n)}
                >
                    <p>1</p>
                    <h3>H</h3>
                    <p class="trim-text">{n}</p>
                </span>
            {/each}
        </div>
    </div>

    <div class="inputs flex flex-wrap">
        <input type="range" min=0 max=6000 default=0 bind:value={temperature}/>

        <div class="flex flex-nowrap">
            <input type="number" min=0 max=6000 bind:value={temperature}/>
            <p>K</p>
        </div>

        <div class="flex flex-nowrap">
            <input 
                type="number" 
                min=-273 
                max=5727 
                value={celsiusTemp}
                on:input={e => temperature = parseFloat(e.target.value) + 273}
            />
            <p>°C</p>
        </div>
    </div>

    <div on:click={normalizeTableDisplay}>
        <Table {elements} {displayElementHandler}/>
    </div>

    <hr style="margin-top: 40px"/>
    
    <div class="footer">
        <p class="m-0">Made by <a class="strong" href="https://github.com/scientific-dev">TheSudarsanDev</a></p>
        <p style="margin-top: 4px">TheSudarsanDev © 2022</p>
    </div>
</div>

<style>
    .display-element {
        margin-bottom: 20px;
        padding: min(2vw, 2vh);
        border: 2px dashed var(--fg);
        border-radius: 5px;
    }

    .display-element *, .item-state * { margin: 0; }
    .display-element h3 { font-size: var(--h2-size); }

    .display-element h3:hover {
        text-decoration: underline;
        cursor: pointer;
    }

    .display-element a {
        outline: none;
        color: var(--bg);
        background-color: var(--fg);
        padding: 8px 16px;
        margin: 0;
        border-radius: 4px;
        text-decoration: none;
        display: inline-block;
        margin-top: 3px;
    }

    .display-element a:hover { background-color: var(--dark-fg); }

    .display-element > p {
        margin-top: 5px;
        font-size: 14px;
        font-weight: bold;
    }

    .series {
        margin-top: 10px;
        margin-bottom: 20px;
        color: white;
    }

    .series span {
        display: inline-block;
        text-align: center;
        border-radius: 3px;
        padding: 5px;
        margin: 2px;
        text-transform: capitalize;
        cursor: pointer;
        color: white;
    }

    .series span:hover {
        filter: brightness(120%);
        -webkit-filter: brightness(120%);
    }

    .item-state {
        text-align: left!important;
        border-radius: 2px;
        width: var(--cell-size);
    }

    .item-state p { font-size: 12px; }
    .item-state h3 { font-size: 20px; }

    .values { margin-top: 10px; }
    .values span p:first-child { margin-right: 5px; }

    .values span {
        display: block;
        font-size: 14px;
        margin-left: 5px;
    }

    .footer a { color: var(--fg); }
    
    .inputs { margin-bottom: min(5vw, 5vh); }
    .inputs div { margin: 0 5px; }
    .inputs p { margin: 4px; }

    input[type=number] {
        outline: none;
        border-radius: 3px;
        border: 1px solid var(--dark-fg);
    }

    input[type=range] {
        -webkit-appearance: none;
        background-color: transparent;
        outline: none;
        flex-grow: 1;
    }

    input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 24px;
        width: 15px;
        border-radius: 2px;
        background-color: white;
        margin-top: -2px;
        box-shadow: .5px .5px 0px #868686, 0px 0px 1px #0d0d0d;
    }

    input[type=range]::-moz-range-thumb {
        height: 24px;
        width: 15px;
        border-radius: 2px;
        background-color: white;
        margin-top: -2px;
        box-shadow: .5px .5px 0px #868686, 0px 0px 1px #0d0d0d;
    }

    input[type=range]::-ms-thumb {
        height: 24px;
        width: 15px;
        border-radius: 2px;
        background-color: white;
        margin-top: -2px;
        box-shadow: .5px .5px 0px #868686, 0px 0px 1px #0d0d0d;
    }

    input[type=range]::-webkit-slider-runnable-track {
        width: 100%;
        height: 20px;
        border-radius: 3px;
        cursor: pointer;
        background: linear-gradient(to right, lightblue, yellow, red);
    }

    input[type=range]::-moz-track {
        width: 100%;
        height: 20px;
        border-radius: 3px;
        cursor: pointer;
        background: linear-gradient(to right, lightblue, yellow, red);
    }

    input[type=range]::-ms-track {
        width: 100%;
        height: 20px;
        border-radius: 3px;
        cursor: pointer;
        background: linear-gradient(to right, lightblue, yellow, red);
    }

    @media (min-width: 800px) {
        .values span {
            max-width: 30%!important;
            flex: 0 0 30%!important;
        }
    }

    @media (min-width: 500px) {
        .values { 
            display: flex; 
            flex-wrap: wrap;
            flex-direction: row; 
        }

        .values span {
            max-width: 50%;
            flex: 0 0 50%;
            margin-top: 10px;
        }
    }

    @media (max-width: 500px) {
        .values span { margin-top: 5px; }
        .series .item { width: 100%; }

        input[type=range] { 
            width: 100%; 
            margin-bottom: 10px;
            margin-left: 5px;
        }
    }
</style>