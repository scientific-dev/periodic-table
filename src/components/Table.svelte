<script>
    import Element from './Element.svelte';

    export let elements, displayElementHandler, gradientDisplay;
    let tableRow = [];

    const rowIndex = r => {
        if (r == 7) return '?';
        else if (r > 7) return r - 2;
        return r + 1;
    }

    $: {
        for (let i = 0; i < elements.length; i++) {
            let element = elements[i];
            let row = tableRow[element.cors[1] - 1];

            if (row) row[element.cors[0] - 1] = element;
            else {
                row = [];
                row[element.cors[0] - 1] = element;
                tableRow[element.cors[1] - 1] = row;
            }
        }

        tableRow[5][2] = {
            n: '57-71',
            nm: 'Lanthanides',
            sym: 'Ln ',
            ctg: 'lanthanide',
            am: 0
        }

        tableRow[6][2] = {
            n: '89-103',
            nm: 'Actinides',
            sym: 'Ac ',
            ctg: 'actinide',
            am: 0
        }
    }
</script>

<div class="table-wrapper shadow" id="table-wrapper">
    {#if gradientDisplay}
        <div class="g-index">
            <p>Min</p>
            <span></span>
            <p>Max</p>
        </div>
    {/if}

    <div class="table">
        <div class="row" style="margin-left: calc(var(--font-size) + 6px);">
            {#each Array(18) as _, i}
                <div class="index ix">
                    <p>{i + 1}</p>
                </div>
            {/each}
        </div>
    
        {#each tableRow as row, i}
            <div class="row r-{i}">
                <div class="index iy">
                    <p>{rowIndex(i)}</p>
                </div>
    
                {#each row as element}
                    {#if element}
                        <Element handler={displayElementHandler} {element}/>
                    {:else}
                        <div class="empty-element"/>
                    {/if}
                {/each}
            </div>
        {/each}
    </div>
</div>

<style>
    :global(:root) {
        --cell-size: calc((100% - 123px) / 18);
        --ix-size-full: calc(var(--cell-size) + 5px);
        --cell-size-full: calc(var(--cell-size) + 4px);
        --font-size: 12px;
    }

    .table-wrapper {
        padding: 30px 15px;
        background-color: var(--hl);
        border-radius: 6px;
        margin-left: 4px;
    }

    .row {
        display: flex;
        flex-wrap: nowrap;
        margin-left: 2px;
    }

    .empty-element {
        width: var(--cell-size-full)!important;
        max-width: var(--cell-size-full);
        flex: 0 0 var(--cell-size-full);
        height: var(--cell-size-full)!important;
        margin-right: 2px;
    }

    .r-8 {
        margin-top: 20px!important;
    }

    .index p {
        font-size: calc(var(--font-size) + 2px);
        font-weight: bold;
        margin: 0;
        text-align: center;
    }

    .ix {
        width: var(--ix-size-full)!important;
        max-width: var(--ix-size-full);
        flex: 0 0 var(--ix-size-full);
        margin-right: 2px;
    }

    .iy {
        margin-right: 8px;
        margin-left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .iy p {
        display: block;
    }

    .g-index {
        display: flex;
        flex-wrap: nowrap;
        margin-bottom: 20px;
    }

    .g-index span {
        flex-grow: 1;
        background: linear-gradient(to left, #000, #63a125);
        border-radius: 3px;
    }

    .g-index p { margin: 0 10px; }

    @media (max-width: 1200px) {
        .table-wrapper { --font-size: 8px; }
    }

    @media (max-width: 700px) {
        .table { overflow: auto; }
        :global(:root) {
            --cell-size: 40px;
            --ix-size-full: calc(var(--cell-size) + 4px);
        }
    }
</style>