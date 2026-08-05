<script lang="ts">
	import { t, type Lang } from '$lib/i18n';

	let { lang, days, class: cls = '' }: { lang: Lang; days: string[]; class?: string } = $props();
	const d = $derived(t(lang));

	// Vaste weekvolgorde zodat de dagen altijd netjes op volgorde staan.
	const ORDER = ['ma', 'di', 'wo', 'do', 'vr', 'za', 'zo'];

	// Volledige dagnamen in kleine letters, bv. "woensdag".
	const names = $derived(
		ORDER.filter((k) => days.includes(k)).map((k) =>
			((d.days as Record<string, string>)[k] ?? k).toLowerCase()
		)
	);

	// "woensdag" · "woensdag en vrijdag" · "dinsdag, donderdag en zaterdag"
	const list = $derived(
		names.length <= 1
			? names.join('')
			: `${names.slice(0, -1).join(', ')} ${d.pages.menu.availAnd} ${names[names.length - 1]}`
	);
</script>

{#if days.length}
	<span
		class={`inline-flex items-center gap-2 rounded-full border border-[#159641] bg-[#DCEFE0] px-3 py-1 text-sm font-bold text-[#0E7A33] ${cls}`}
	>
		<span
			class="inline-block h-2.5 w-2.5 rounded-full"
			style="background:var(--color-green-bright)"
			aria-hidden="true"
		></span>
		{d.pages.menu.availOnly}
		{list}
	</span>
{/if}
