<script>
    export let size = 50, title, center;
</script>

<div 
    class="logo-main"
    class:center
    style="--size: min({size}vh, {size}vw);"
>
    <div class="logo-inner">
        <h1 class="m-0">{title}</h1>
        <p><slot></slot></p>
    </div>
</div>

<style>
    .logo-main {
        background-color: var(--fg);
        border-radius: 3px;
        padding: 10px;
        width: var(--size);
        height: var(--size);
    }

    .logo-inner {
        border: 2px solid var(--bg);
        border-radius: 3px;
        height: calc(100% - 23px);
        padding: 10px;
        text-align: left;
        overflow-y: auto;
    }

    p, h1 {
        color: var(--bg);
        margin-top: min(2vw, 2vh)!important;
    }

    h1 { font-size: min(7.5vw, 7.5vh); }
    .center { margin-left: calc(50% - 20px - var(--size) / 2); }
</style>