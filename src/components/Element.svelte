<script>
    import { SERIES_COLORS } from '../utils/constants';

    export let element, handler, fg = 'white';
    
    let bg = SERIES_COLORS[element.ctg] || SERIES_COLORS.unknown;
</script>

<div 
    class="element transition" 
    style="--bg: {bg}; --fg: {fg};" id="elem-{element.sym}"
    on:click={() => handler(element)}
>
    <p>{element.n}</p>
    <h3>{element.sym}</h3>
    <h4>{element.nm}</h4>
    <h5>{parseFloat(element.am.toFixed(2)) || ''}</h5>
</div>

<style>
    .element {
        background-color: var(--bg);
        color: var(--fg);
        padding: 2px;
        margin-right: 2px;
        margin-top: 2px;
        width: var(--cell-size)!important;
        max-width: var(--cell-size);
        flex: 0 0 var(--cell-size);
        cursor: pointer;
    }

    .element:hover {
        z-index: 1;
        transform: scale(105%);
        -webkit-transform: scale(105%);
        -moz-transform: scale(105%);
        -o-transform: scale(105%);
    }

    .element * { margin: 0; }

    p, h4, h5 {
        font-size: 12px;
        opacity: .95;
        font-weight: lighter;
    }

    h4 {
        margin-top: 4px;
        font-family: "Titillium Web";
    }

    h4, h5 {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    @media (max-width: 1200px) {
        p, h4, h5 { font-size: var(--font-size); }
        h3 { font-size: calc(var(--font-size) + 2px); }
        h4 { margin-top: 2px; }
    }
</style>