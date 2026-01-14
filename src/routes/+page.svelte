<svelte:head>
	<title>Phia's Smulparadijs - Surinaams-Creoolse Keuken in Den Haag</title>
	<meta name="description" content="Kom en geniet van de Surinaams-Creoolse Keuken! Phia's gerechten en snacks zijn vanaf 13:30u verkrijgbaar. Voorkom lange wachttijden en bel ons van te voren." />
</svelte:head>

<!-- Hero Section with Video -->
<section class="relative h-[70vh] md:h-[85vh] overflow-hidden">
	<!-- Video Background (placeholder - will need actual video) -->
	<div class="absolute inset-0 bg-gray-900">
		<!-- Placeholder gradient for demo - replace with actual video -->
		<div class="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-80"></div>
		<!-- Video would go here:
		<video autoplay muted loop playsinline class="w-full h-full object-cover">
			<source src="/videos/hero-video.mp4" type="video/mp4" />
		</video>
		-->
	</div>
	
	<!-- Dark overlay for text readability -->
	<div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
	
	<!-- Hero Content -->
	<div class="relative h-full flex items-center justify-center">
		<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
			<h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">
				Kom en geniet van de<br />Surinaams-Creoolse Keuken!
			</h1>
			<p class="text-xl md:text-2xl mb-3 font-medium">
				Phia's gerechten en snacks zijn vanaf 13:30u verkrijgbaar ❤
			</p>
			<p class="text-lg md:text-xl mb-8 text-gray-200">
				Voorkom lange wachttijden en bel ons van te voren
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a 
					href="tel:0707851813" 
					class="inline-flex items-center justify-center px-8 py-4 bg-orange-600 text-white font-bold text-lg rounded-lg hover:bg-orange-700 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
				>
					<svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
					</svg>
					Bel 070-7851813
				</a>
				<a 
					href="/menu" 
					class="inline-flex items-center justify-center px-8 py-4 bg-white/90 text-gray-900 font-bold text-lg rounded-lg hover:bg-white transition-all shadow-xl hover:shadow-2xl hover:scale-105"
				>
					Bekijk het menu
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Quick Action Strip -->
<section class="py-12 bg-gray-50">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
			<a href="/menu" class="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-8 text-center hover:scale-105">
				<div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
					<svg class="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
					</svg>
				</div>
				<h3 class="text-xl font-bold text-gray-900 mb-2">Phia's Menu</h3>
				<p class="text-gray-600">Bekijk ons volledige menu</p>
			</a>
			
			<a href="/maaltijd-of-soep" class="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-8 text-center hover:scale-105">
				<div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
					<svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
					</svg>
				</div>
				<h3 class="text-xl font-bold text-gray-900 mb-2">Maaltijd of Soep</h3>
				<p class="text-gray-600">Dagelijkse specials</p>
			</a>
			
			<a href="/contact" class="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-8 text-center hover:scale-105">
				<div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
					<svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
					</svg>
				</div>
				<h3 class="text-xl font-bold text-gray-900 mb-2">Openingstijden & Locatie</h3>
				<p class="text-gray-600">Vind ons in Den Haag</p>
			</a>
		</div>
	</div>
</section>

<!-- Phia's Maaltijd of Soep Featured Section -->
<section class="py-16 bg-gradient-to-r from-orange-50 to-red-50">
	<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
			Phia's Maaltijd of Soep
		</h2>
		<p class="text-xl text-gray-700 mb-4">
			Houd de social media of onze website in de gaten!
		</p>
		<p class="text-lg text-gray-600 mb-8">
			Abonneer je op ons YouTube kanaal voor de nieuwste updates
		</p>
		<div class="flex flex-col sm:flex-row gap-4 justify-center">
			<a 
				href="/maaltijd-of-soep" 
				class="inline-flex items-center justify-center px-8 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-all shadow-md hover:shadow-lg"
			>
				Bekijk Maaltijd of Soep
			</a>
			<a 
				href="https://www.youtube.com/@phiassmulparadijs" 
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center justify-center px-8 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all shadow-md hover:shadow-lg"
			>
				<svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
					<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
				</svg>
				YouTube Abonneren
			</a>
		</div>
	</div>
</section>

<!-- Menu Category Preview -->
<section class="py-16 bg-white">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<h2 class="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
			Ons Menu
		</h2>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			<div class="relative rounded-xl overflow-hidden shadow-lg group hover:shadow-2xl transition-all">
				<div class="aspect-video bg-gradient-to-br from-orange-400 to-orange-600"></div>
				<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
					<div class="p-6 text-white w-full">
						<h3 class="text-2xl font-bold mb-2">Phia's Broodjes</h3>
						<p class="mb-4 text-gray-200">HALAL</p>
						<a href="/menu" class="inline-block bg-white text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
							Bekijk
						</a>
					</div>
				</div>
			</div>
			
			<div class="relative rounded-xl overflow-hidden shadow-lg group hover:shadow-2xl transition-all">
				<div class="aspect-video bg-gradient-to-br from-red-400 to-red-600"></div>
				<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
					<div class="p-6 text-white w-full">
						<h3 class="text-2xl font-bold mb-2">Overige belegsoorten</h3>
						<p class="mb-4 text-gray-200">niet HALAL</p>
						<a href="/menu" class="inline-block bg-white text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
							Bekijk
						</a>
					</div>
				</div>
			</div>
			
			<div class="relative rounded-xl overflow-hidden shadow-lg group hover:shadow-2xl transition-all">
				<div class="aspect-video bg-gradient-to-br from-yellow-400 to-yellow-600"></div>
				<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
					<div class="p-6 text-white w-full">
						<h3 class="text-2xl font-bold mb-2">Gerechten</h3>
						<p class="mb-4 text-gray-200">Later op de dag</p>
						<a href="/menu" class="inline-block bg-white text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
							Bekijk
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Reviews Section -->
<section class="py-16 bg-gray-50">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-12">
			<h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
				Wat klanten zeggen
			</h2>
			<div class="flex items-center justify-center mb-4">
				<div class="flex text-yellow-400">
					{#each Array(5) as _, i}
						<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
							<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
						</svg>
					{/each}
				</div>
			</div>
			<p class="text-gray-600">Gebaseerd op Google reviews</p>
		</div>
		
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
			<div class="bg-white rounded-xl shadow-md p-6">
				<div class="flex text-yellow-400 mb-4">
					{#each Array(5) as _, i}
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
							<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
						</svg>
					{/each}
				</div>
				<p class="text-gray-700 mb-4">"Heerlijk eten en vriendelijke service! De Surinaamse gerechten zijn authentiek en vol smaak."</p>
				<p class="text-gray-900 font-semibold">- Tevreden klant</p>
			</div>
			
			<div class="bg-white rounded-xl shadow-md p-6">
				<div class="flex text-yellow-400 mb-4">
					{#each Array(5) as _, i}
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
							<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
						</svg>
					{/each}
				</div>
				<p class="text-gray-700 mb-4">"Beste Surinaamse eten in Den Haag! Altijd vers en smaakvol bereid."</p>
				<p class="text-gray-900 font-semibold">- Vaste klant</p>
			</div>
			
			<div class="bg-white rounded-xl shadow-md p-6">
				<div class="flex text-yellow-400 mb-4">
					{#each Array(5) as _, i}
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
							<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
						</svg>
					{/each}
				</div>
				<p class="text-gray-700 mb-4">"Geweldige plek voor lunch. De broodjes zijn echt aanraders!"</p>
				<p class="text-gray-900 font-semibold">- Google reviewer</p>
			</div>
		</div>
		
		<div class="text-center">
			<a 
				href="https://www.google.com/maps/place/Phia's+Smulparadijs" 
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center justify-center px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all shadow-md hover:shadow-lg"
			>
				Bekijk alle reviews op Google
			</a>
		</div>
	</div>
</section>

<!-- Location Section -->
<section class="py-16 bg-white">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<h2 class="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
			Bezoek ons
		</h2>
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
			<div>
				<div class="mb-8">
					<h3 class="text-xl font-bold text-gray-900 mb-4">Adres</h3>
					<p class="text-lg text-gray-700">Phia's Smulparadijs</p>
					<p class="text-lg text-gray-700">Theresiastraat 279</p>
					<p class="text-lg text-gray-700">2593 AS Den Haag</p>
				</div>
				
				<div class="mb-8">
					<h3 class="text-xl font-bold text-gray-900 mb-4">Openingstijden</h3>
					<div class="space-y-2 text-gray-700">
						<p><span class="font-medium">Maandag:</span> Gesloten</p>
						<p><span class="font-medium">Dinsdag - Zaterdag:</span> 10:00 - 18:00</p>
						<p><span class="font-medium">Zondag:</span> Gesloten</p>
						<p class="mt-4 text-orange-600 font-semibold">Gerechten en snacks vanaf 13:30u</p>
					</div>
				</div>
				
				<div class="flex flex-col sm:flex-row gap-4">
					<a 
						href="https://www.google.com/maps/dir//Phia's+Smulparadijs" 
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
					>
						<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
						</svg>
						Route plannen
					</a>
					<a 
						href="tel:0707851813" 
						class="inline-flex items-center justify-center px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-all shadow-md hover:shadow-lg"
					>
						<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
						</svg>
						Bel nu
					</a>
				</div>
			</div>
			
			<!-- Map Placeholder -->
			<div class="aspect-video bg-gray-200 rounded-xl overflow-hidden shadow-lg">
				<!-- Google Maps embed would go here -->
				<div class="w-full h-full flex items-center justify-center text-gray-500">
					<div class="text-center">
						<svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
						</svg>
						<p>Google Maps wordt hier geladen</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Photo Preview -->
<section class="py-16 bg-gray-50">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<h2 class="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
			Phia's Foto's
		</h2>
		<div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
			{#each Array(6) as _, i}
				<div class="aspect-square bg-gradient-to-br from-orange-300 to-red-400 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer">
					<!-- Photo placeholders - will be replaced with actual images -->
					<div class="w-full h-full flex items-center justify-center text-white text-4xl font-bold">
						{i + 1}
					</div>
				</div>
			{/each}
		</div>
		<div class="text-center">
			<a 
				href="/fotos" 
				class="inline-flex items-center justify-center px-8 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-all shadow-md hover:shadow-lg"
			>
				Bekijk alle foto's
			</a>
		</div>
	</div>
</section>
