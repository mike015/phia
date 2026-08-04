<script lang="ts">
	// Rendert JSON-LD veilig in <svelte:head>.
	let { data }: { data: Record<string, unknown> | Record<string, unknown>[] } = $props();
	const json = $derived(JSON.stringify(data));
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${json}</` + `script>`}
</svelte:head>
