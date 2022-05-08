<script>
    import { onMount } from 'svelte';
    import { NUMERIC_PROPS, PROPS } from '../utils/constants';

    export let onChange = () => {};

    let value, mounted;
    onMount(() => mounted = true);
    
    $: if (mounted) onChange(value);
</script>

<div class="mode-box flex flex-nowrap">
    <p style="margin-top: 1px;">Mode: </p>

    <select bind:value>
        <option label="Default" default>default</option>
        {#each NUMERIC_PROPS as prop}
            <option label={PROPS[prop]}>{prop}</option>
        {/each}
    </select>
</div>

<style>
    .mode-box p { margin: 0 10px; }

    .mode-box { 
        margin-bottom: 10px; 
        margin-left: -10px;
    }

    .mode-box select {
        font-family: "Recursive";
        outline: none;
        border: none;
        padding: 2px 5px;
        background-color: var(--fg);
        color: var(--bg);
        border-radius: 3px;
    }
</style>