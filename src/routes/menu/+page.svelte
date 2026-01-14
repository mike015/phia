<script lang="ts">
	// Menu data - to be replaced with CMS content
	const menuCategories = [
		{
			id: 'broodjes-halal',
			name: "Phia's Broodjes (HALAL)",
			halal: true,
			items: [
				{ name: 'Broodje Kip Kerrie', price: '€5,50', note: '' },
				{ name: 'Broodje Pom', price: '€6,00', note: '' },
				{ name: 'Broodje Moksi Meti', price: '€6,50', note: '' },
				{ name: 'Broodje Saoto', price: '€5,00', note: '' },
			]
		},
		{
			id: 'overige',
			name: 'Overige belegsoorten (niet HALAL)',
			halal: false,
			items: [
				{ name: 'Broodje Filet Americain', price: '€4,50', note: '' },
				{ name: 'Broodje Kaas', price: '€4,00', note: '' },
				{ name: 'Broodje Ham', price: '€4,50', note: '' },
			]
		},
		{
			id: 'gerechten',
			name: 'Gerechten (later op de dag)',
			halal: true,
			items: [
				{ name: 'Nasi', price: '€8,50', note: '' },
				{ name: 'Bami', price: '€8,50', note: '' },
				{ name: 'Pom', price: '€9,00', note: '' },
				{ name: 'Roti Kip', price: '€10,00', note: '' },
				{ name: 'Moksi Meti', price: '€11,00', note: 'Let op: echt heet!' },
			]
		}
	];
	
	let searchQuery = $state('');
	let selectedCategory = $state('all');
	let halalFilter = $state('all'); // 'all', 'halal', 'non-halal'
	
	// Filter menu items
	const filteredCategories = $derived.by(() => {
		let categories = menuCategories;
		
		// Filter by halal
		if (halalFilter === 'halal') {
			categories = categories.filter(cat => cat.halal);
		} else if (halalFilter === 'non-halal') {
			categories = categories.filter(cat => !cat.halal);
		}
		
		// Filter by category
		if (selectedCategory !== 'all') {
			categories = categories.filter(cat => cat.id === selectedCategory);
		}
		
		// Filter by search
		if (searchQuery) {
			categories = categories.map(cat => ({
				...cat,
				items: cat.items.filter(item => 
					item.name.toLowerCase().includes(searchQuery.toLowerCase())
				)
			})).filter(cat => cat.items.length > 0);
		}
		
		return categories;
	});
</script>

<svelte:head>
	<title>Menu - Phia's Smulparadijs</title>
	<meta name="description" content="Bekijk ons volledige menu met Surinaams-Creoolse gerechten, broodjes en snacks. HALAL opties beschikbaar." />
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<!-- Page Header -->
	<div class="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<h1 class="text-4xl md:text-5xl font-bold mb-4">Phia's Menu</h1>
			<p class="text-xl md:text-2xl text-orange-100">Authentieke Surinaams-Creoolse keuken</p>
		</div>
	</div>
	
	<!-- Filters Section -->
	<div class="bg-white shadow-md sticky top-16 md:top-20 z-40">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
			<!-- Search -->
			<div class="mb-4">
				<div class="relative">
					<input
						type="text"
						bind:value={searchQuery}
						placeholder="Zoek in het menu..."
						class="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
					/>
					<svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
					</svg>
				</div>
			</div>
			
			<!-- Category Filter Chips -->
			<div class="flex flex-wrap gap-2 mb-4">
				<button
					onclick={() => selectedCategory = 'all'}
					class="px-4 py-2 rounded-full font-medium transition-colors {selectedCategory === 'all' ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
				>
					Alles
				</button>
				{#each menuCategories as category}
					<button
						onclick={() => selectedCategory = category.id}
						class="px-4 py-2 rounded-full font-medium transition-colors {selectedCategory === category.id ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
					>
						{category.name}
					</button>
				{/each}
			</div>
			
			<!-- HALAL Filter Toggle -->
			<div class="flex gap-2">
				<button
					onclick={() => halalFilter = 'all'}
					class="px-4 py-2 rounded-lg font-medium transition-colors {halalFilter === 'all' ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
				>
					Alles
				</button>
				<button
					onclick={() => halalFilter = 'halal'}
					class="px-4 py-2 rounded-lg font-medium transition-colors {halalFilter === 'halal' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
				>
					HALAL
				</button>
				<button
					onclick={() => halalFilter = 'non-halal'}
					class="px-4 py-2 rounded-lg font-medium transition-colors {halalFilter === 'non-halal' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
				>
					Niet HALAL
				</button>
			</div>
		</div>
	</div>
	
	<!-- Menu Items -->
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-32 md:pb-12">
		{#if filteredCategories.length === 0}
			<div class="text-center py-16">
				<p class="text-xl text-gray-600">Geen menu items gevonden</p>
			</div>
		{:else}
			{#each filteredCategories as category}
				<div class="mb-12">
					<div class="flex items-center gap-3 mb-6">
						<h2 class="text-2xl md:text-3xl font-bold text-gray-900">{category.name}</h2>
						{#if category.halal}
							<span class="px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">HALAL</span>
						{/if}
					</div>
					
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						{#each category.items as item}
							<div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
								<div class="flex justify-between items-start mb-2">
									<h3 class="text-lg font-semibold text-gray-900 flex-1">{item.name}</h3>
									<span class="text-xl font-bold text-orange-600 ml-4">{item.price}</span>
								</div>
								{#if item.note}
									<p class="text-sm text-red-600 font-medium">{item.note}</p>
								{/if}
							</div>
						{/each}
					</div>
				</div>
			{/each}
		{/if}
		
		<!-- PDF Download -->
		<div class="mt-12 text-center">
			<button 
				class="inline-flex items-center justify-center px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all shadow-md hover:shadow-lg"
			>
				<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
				</svg>
				Download menu (PDF)
			</button>
		</div>
	</div>
</div>

<!-- Sticky CTA Sidebar (Desktop) -->
<div class="hidden md:block fixed right-8 bottom-8 z-40">
	<div class="bg-white rounded-xl shadow-2xl p-6 max-w-xs">
		<h3 class="text-lg font-bold text-gray-900 mb-2">Bel om te bestellen</h3>
		<p class="text-sm text-gray-600 mb-4">Gerechten en snacks vanaf 13:30u</p>
		<a 
			href="tel:0707851813" 
			class="block w-full px-6 py-3 bg-orange-600 text-white font-semibold text-center rounded-lg hover:bg-orange-700 transition-all shadow-md hover:shadow-lg"
		>
			<span class="flex items-center justify-center">
				<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
				</svg>
				070-7851813
			</span>
		</a>
	</div>
</div>
