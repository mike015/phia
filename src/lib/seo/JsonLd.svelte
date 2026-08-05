<script lang="ts">
	// Rendert JSON-LD veilig in <svelte:head>.
	let { data }: { data: Record<string, unknown> | Record<string, unknown>[] } = $props();
	// Escape <, >, & en de regelscheiders U+2028/U+2029, zodat geen enkele
	// stringwaarde uit de <script type="application/ld+json"> kan breken (XSS-hardening).
	const json = $derived(
		JSON.stringify(data)
			.replace(/</g, '\\u003c')
			.replace(/>/g, '\\u003e')
			.replace(/&/g, '\\u0026')
			.replace(/\u2028/g, '\\u2028')
			.replace(/\u2029/g, '\\u2029')
	);
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${json}</` + `script>`}
</svelte:head>
