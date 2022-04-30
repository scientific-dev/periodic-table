<script>
	import { onMount } from 'svelte';
	import InfoCard from './components/InfoCard.svelte';
	import Main from './components/Main.svelte';
	import './styles/global.css';

	let elements = null,
		darkMode = false;

	const manageDarkModeClass = () => document.body.classList[darkMode ? 'add' : 'remove']('darkmode');

	onMount(() => {
		darkMode = Boolean(JSON.parse(localStorage.getItem('dark_mode') || ''));
		manageDarkModeClass();
	});

	// TODO(scientific-dev): Change fetch url later...
	fetch('/elements.json')
		.then(res => res.json())
		.then(x => elements = x, () => elements = "error");
</script>

<div class="main">
	<h1 class="m-0">The Periodic Table</h1>

	<a 
		href="/#"
		on:click={() => {
			darkMode = !darkMode;
			localStorage.setItem('dark_mode', JSON.stringify(darkMode));
			manageDarkModeClass();
		}}
	>Toggle to {darkMode ? 'light' : 'dark'} mode?</a>

	<hr/>

	{#if !elements}
		<InfoCard title="Loading stuff..." center>
			It takes us some time to make the periodic table ready...
		</InfoCard>
	{:else if elements == "error"}
		<InfoCard title="500!" center>
			Internal Server Error. Try to refresh this page and if you see this again, kindly report this issue to the developers of the site.
		</InfoCard>
	{:else}
		<Main elements={Object.values(elements)}/>
	{/if}
</div>

<style>
	:global(hr) {
		border: .5px dashed var(--fg);
		margin-bottom: min(5vw, 5vh);
		margin-top: min(2.5vw, 2.5vh);
	}

	.main {
		padding: 5vw 2.5vw;
	}

	.main h1 {
		font-size: var(--h1-size);
	}

	.main a {
		color: var(--fg);
		text-decoration: none;
	}

	.main a:hover {
		text-decoration: underline;
	}

	@media (min-width: 1200px) {
		.main { padding: 5vw 8vw; }
	}
</style>