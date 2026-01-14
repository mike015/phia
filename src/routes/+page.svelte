<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
</script>

<SEO />

<!-- Hero Section - Fullscreen Video/Image with Centered Text -->
<section class="relative h-screen overflow-hidden">
	<!-- Video Background with Poster Fallback -->
	<div class="absolute inset-0 bg-[#0E0E0E]">
		<!-- Placeholder - replace with actual video or high-end food photography -->
		<div class="absolute inset-0 bg-gradient-to-br from-[#2D2D2D] via-[#1A1A1A] to-[#0E0E0E]"></div>
		<!-- Uncomment when video is ready:
		<video autoplay muted loop playsinline class="w-full h-full object-cover" poster="/images/hero-poster.jpg">
			<source src="/videos/hero-video.mp4" type="video/mp4" />
		</video>
		-->
	</div>
	
	<!-- Dark Overlay (BLACK, not red) -->
	<div class="absolute inset-0 bg-black/60"></div>
	
	<!-- Hero Content - CENTERED VERTICALLY -->
	<div class="relative h-full max-w-[1280px] mx-auto px-6 md:px-10">
		<div class="h-full flex items-center justify-center">
			<div class="text-center max-w-4xl">
				<!-- H1 - Proper line breaks, centered -->
				<h1 class="text-white mb-6">
					Kom en geniet van de<br />Surinaams-Creoolse keuken
				</h1>
				<!-- Tagline - Short, centered -->
				<p class="text-white/90 text-xl md:text-2xl mb-10 font-medium">
					Authentiek • Vers • Met liefde bereid
				</p>
				<!-- Two CTAs -->
				<div class="flex flex-col sm:flex-row gap-4 justify-center">
					<a 
						href="/menu" 
						class="inline-flex items-center justify-center h-[52px] px-8 bg-[#C5342F] text-white font-bold text-lg rounded-full hover:bg-[#A02822] hover:scale-[1.03] transition-all shadow-2xl"
					>
						Bekijk menu
					</a>
					<a 
						href="tel:0707851813" 
						class="inline-flex items-center justify-center h-[52px] px-8 bg-white text-[#0E0E0E] font-bold text-lg rounded-full hover:bg-white/90 hover:scale-[1.03] transition-all shadow-2xl"
					>
						Bel direct
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Quick Action Strip - 96px section spacing -->
<section class="py-24 bg-[#F6F6F6]">
	<div class="max-w-[1280px] mx-auto px-6 md:px-10">
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
			<!-- Card Design - 20-24px border-radius, soft shadows -->
			<a href="/menu" class="group bg-white rounded-[24px] shadow-lg hover:shadow-2xl transition-all p-8 text-center hover:-translate-y-1">
				<div class="w-16 h-16 bg-[#C5342F]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#C5342F]/20 transition-colors">
					<svg class="w-8 h-8 text-[#C5342F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
					</svg>
				</div>
				<h3 class="text-xl font-bold mb-2">Phia's Menu</h3>
				<p class="text-[#6B6B6B]">Bekijk ons volledige menu</p>
			</a>
			
			<a href="/maaltijd-of-soep" class="group bg-white rounded-[24px] shadow-lg hover:shadow-2xl transition-all p-8 text-center hover:-translate-y-1">
				<div class="w-16 h-16 bg-[#C5342F]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#C5342F]/20 transition-colors">
					<svg class="w-8 h-8 text-[#C5342F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
					</svg>
				</div>
				<h3 class="text-xl font-bold mb-2">Maaltijd of Soep</h3>
				<p class="text-[#6B6B6B]">Dagelijkse specials</p>
			</a>
			
			<a href="/contact" class="group bg-white rounded-[24px] shadow-lg hover:shadow-2xl transition-all p-8 text-center hover:-translate-y-1">
				<div class="w-16 h-16 bg-[#C5342F]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#C5342F]/20 transition-colors">
					<svg class="w-8 h-8 text-[#C5342F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
					</svg>
				</div>
				<h3 class="text-xl font-bold mb-2">Openingstijden & Locatie</h3>
				<p class="text-[#6B6B6B]">Vind ons in Den Haag</p>
			</a>
		</div>
	</div>
</section>

<!-- Phia's Maaltijd of Soep - Accent section (10% red usage) -->
<section class="py-24 bg-[#0E0E0E] relative overflow-hidden">
	<!-- Subtle red accent line at top -->
	<div class="absolute top-0 left-0 right-0 h-1 bg-[#C5342F]"></div>
	
	<div class="max-w-[1280px] mx-auto px-6 md:px-10">
		<div class="max-w-3xl mx-auto text-center">
			<h2 class="text-white mb-6">
				Phia's Maaltijd of Soep
			</h2>
			<p class="text-white/80 text-lg mb-10">
				Houd de social media of onze website in de gaten!<br />
				Abonneer je op ons YouTube kanaal voor de nieuwste updates
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a 
					href="/maaltijd-of-soep" 
					class="inline-flex items-center justify-center h-[52px] px-8 bg-[#C5342F] text-white font-bold text-lg rounded-full hover:bg-[#A02822] hover:scale-[1.03] transition-all shadow-xl"
				>
					Bekijk Maaltijd of Soep
				</a>
				<a 
					href="https://www.youtube.com/@phiassmulparadijs" 
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center justify-center h-[52px] px-8 bg-white text-[#0E0E0E] font-bold text-lg rounded-full hover:bg-white/90 hover:scale-[1.03] transition-all shadow-xl"
				>
					<svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
						<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
					</svg>
					YouTube
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Menu Category Preview with Food Images -->
<section class="py-24 bg-white">
	<div class="max-w-[1280px] mx-auto px-6 md:px-10">
		<h2 class="text-center mb-16">Ons Menu</h2>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			<!-- Each card shows food image with dark gradient overlay -->
			<a href="/menu" class="group relative aspect-[4/5] rounded-[24px] overflow-hidden shadow-xl hover:shadow-2xl transition-all">
				<!-- Placeholder for food image - will be replaced with real images -->
				<div class="absolute inset-0 bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100"></div>
				<div class="absolute inset-0 bg-[url('/images/placeholder-food.jpg')] bg-cover bg-center"></div>
				<!-- Dark gradient overlay -->
				<div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
				<!-- Content overlay -->
				<div class="relative h-full flex flex-col justify-end p-8 text-white">
					<h3 class="text-2xl font-bold mb-2">Phia's Broodjes</h3>
					<p class="text-white/90 text-sm mb-4">HALAL</p>
					<!-- Hover: image zoom effect -->
					<div class="opacity-0 group-hover:opacity-100 transition-opacity">
						<span class="inline-block text-sm font-semibold underline">Bekijk →</span>
					</div>
				</div>
			</a>
			
			<a href="/menu" class="group relative aspect-[4/5] rounded-[24px] overflow-hidden shadow-xl hover:shadow-2xl transition-all">
				<div class="absolute inset-0 bg-gradient-to-br from-rose-100 via-pink-50 to-red-100"></div>
				<div class="absolute inset-0 bg-[url('/images/placeholder-food.jpg')] bg-cover bg-center"></div>
				<div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
				<div class="relative h-full flex flex-col justify-end p-8 text-white">
					<h3 class="text-2xl font-bold mb-2">Overige belegsoorten</h3>
					<p class="text-white/90 text-sm mb-4">niet HALAL</p>
					<div class="opacity-0 group-hover:opacity-100 transition-opacity">
						<span class="inline-block text-sm font-semibold underline">Bekijk →</span>
					</div>
				</div>
			</a>
			
			<a href="/menu" class="group relative aspect-[4/5] rounded-[24px] overflow-hidden shadow-xl hover:shadow-2xl transition-all">
				<div class="absolute inset-0 bg-gradient-to-br from-orange-100 via-amber-50 to-yellow-100"></div>
				<div class="absolute inset-0 bg-[url('/images/placeholder-food.jpg')] bg-cover bg-center"></div>
				<div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
				<div class="relative h-full flex flex-col justify-end p-8 text-white">
					<h3 class="text-2xl font-bold mb-2">Gerechten</h3>
					<p class="text-white/90 text-sm mb-4">Later op de dag</p>
					<div class="opacity-0 group-hover:opacity-100 transition-opacity">
						<span class="inline-block text-sm font-semibold underline">Bekijk →</span>
					</div>
				</div>
			</a>
		</div>
	</div>
</section>

<!-- Reviews Section - Fewer reviews, more whitespace, calm confidence -->
<section class="py-32 bg-[#F6F6F6]">
	<div class="max-w-[1280px] mx-auto px-6 md:px-10">
		<div class="text-center mb-16">
			<h2 class="mb-8">Wat klanten zeggen</h2>
			<div class="flex items-center justify-center mb-4">
				<div class="flex text-[#C5342F]">
					{#each Array(5) as _, i}
						<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
							<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
						</svg>
					{/each}
				</div>
			</div>
			<p class="text-[#6B6B6B] text-lg">Gebaseerd op Google reviews</p>
		</div>
		
		<!-- Only 2 reviews for calm, trustworthy feel -->
		<div class="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto mb-16">
			<div class="bg-white rounded-[24px] shadow-md p-10">
				<div class="flex text-[#C5342F] mb-6">
					{#each Array(5) as _, i}
						<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
							<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
						</svg>
					{/each}
				</div>
				<p class="text-lg mb-6 leading-relaxed">"Heerlijk eten en vriendelijke service! De Surinaamse gerechten zijn authentiek en vol smaak."</p>
				<p class="font-semibold text-[#0E0E0E]">— Tevreden klant</p>
			</div>
			
			<div class="bg-white rounded-[24px] shadow-md p-10">
				<div class="flex text-[#C5342F] mb-6">
					{#each Array(5) as _, i}
						<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
							<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
						</svg>
					{/each}
				</div>
				<p class="text-lg mb-6 leading-relaxed">"Beste Surinaamse eten in Den Haag! Altijd vers en smaakvol bereid."</p>
				<p class="font-semibold text-[#0E0E0E]">— Vaste klant</p>
			</div>
		</div>
		
		<div class="text-center">
			<a 
				href="https://www.google.com/maps/place/Phia's+Smulparadijs" 
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center justify-center h-[52px] px-8 bg-white text-[#0E0E0E] font-semibold rounded-full hover:bg-white/90 hover:scale-[1.03] transition-all shadow-lg border border-[#0E0E0E]/10"
			>
				Bekijk alle reviews op Google
			</a>
		</div>
	</div>
</section>

<!-- Location Section - 96px spacing -->
<section class="py-24 bg-white">
	<div class="max-w-[1280px] mx-auto px-6 md:px-10">
		<h2 class="text-center mb-16">Bezoek ons</h2>
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
			<div>
				<div class="mb-8">
					<h3 class="mb-4">Adres</h3>
					<p class="text-lg">Phia's Smulparadijs</p>
					<p class="text-lg">Theresiastraat 279</p>
					<p class="text-lg">2593 AS Den Haag</p>
				</div>
				
				<div class="mb-10">
					<h3 class="mb-4">Openingstijden</h3>
					<div class="space-y-2">
						<p><span class="font-semibold">Maandag:</span> Gesloten</p>
						<p><span class="font-semibold">Dinsdag - Zaterdag:</span> 10:00 - 18:00</p>
						<p><span class="font-semibold">Zondag:</span> Gesloten</p>
						<p class="mt-4 text-[#C5342F] font-semibold">Gerechten en snacks vanaf 13:30u</p>
					</div>
				</div>
				
				<div class="flex flex-col sm:flex-row gap-4">
					<a 
						href="https://www.google.com/maps/dir//Phia's+Smulparadijs" 
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center justify-center h-[52px] px-8 bg-[#0E0E0E] text-white font-semibold rounded-full hover:bg-[#161616] hover:scale-[1.03] transition-all shadow-lg"
					>
						<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
						</svg>
						Route
					</a>
					<a 
						href="tel:0707851813" 
						class="inline-flex items-center justify-center h-[52px] px-8 bg-[#C5342F] text-white font-semibold rounded-full hover:bg-[#A02822] hover:scale-[1.03] transition-all shadow-lg"
					>
						<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
						</svg>
						Bel nu
					</a>
				</div>
			</div>
			
			<!-- Map Placeholder -->
			<div class="aspect-square lg:aspect-video bg-[#F6F6F6] rounded-[24px] overflow-hidden shadow-xl">
				<div class="w-full h-full flex items-center justify-center text-[#6B6B6B]">
					<div class="text-center">
						<svg class="w-16 h-16 mx-auto mb-4 text-[#C5342F]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

<!-- Photo Preview - Real images with uneven grid, light background, hover zoom -->
<section class="py-32 bg-white">
	<div class="max-w-[1280px] mx-auto px-6 md:px-10">
		<h2 class="text-center mb-16">Phia's Foto's</h2>
		<!-- Uneven grid for visual interest -->
		<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
			<!-- Placeholder images - replace with real food photos -->
			<div class="md:col-span-2 aspect-square bg-gradient-to-br from-amber-50 to-orange-100 rounded-[20px] overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer group">
				<div class="w-full h-full flex items-center justify-center text-[#6B6B6B] text-sm group-hover:scale-110 transition-transform duration-300">
					Voeg foto toe
				</div>
			</div>
			<div class="aspect-square bg-gradient-to-br from-yellow-50 to-amber-100 rounded-[20px] overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer group">
				<div class="w-full h-full flex items-center justify-center text-[#6B6B6B] text-sm group-hover:scale-110 transition-transform duration-300">
					Voeg foto toe
				</div>
			</div>
			<div class="aspect-square bg-gradient-to-br from-rose-50 to-pink-100 rounded-[20px] overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer group">
				<div class="w-full h-full flex items-center justify-center text-[#6B6B6B] text-sm group-hover:scale-110 transition-transform duration-300">
					Voeg foto toe
				</div>
			</div>
			<div class="aspect-square bg-gradient-to-br from-orange-50 to-yellow-100 rounded-[20px] overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer group">
				<div class="w-full h-full flex items-center justify-center text-[#6B6B6B] text-sm group-hover:scale-110 transition-transform duration-300">
					Voeg foto toe
				</div>
			</div>
			<div class="aspect-square bg-gradient-to-br from-amber-50 to-rose-100 rounded-[20px] overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer group">
				<div class="w-full h-full flex items-center justify-center text-[#6B6B6B] text-sm group-hover:scale-110 transition-transform duration-300">
					Voeg foto toe
				</div>
			</div>
			<div class="md:col-span-2 aspect-square bg-gradient-to-br from-yellow-50 to-orange-100 rounded-[20px] overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer group">
				<div class="w-full h-full flex items-center justify-center text-[#6B6B6B] text-sm group-hover:scale-110 transition-transform duration-300">
					Voeg foto toe
				</div>
			</div>
		</div>
		<div class="text-center">
			<a 
				href="/fotos" 
				class="inline-flex items-center justify-center h-[52px] px-8 bg-[#C5342F] text-white font-semibold rounded-full hover:bg-[#A02822] hover:scale-[1.03] transition-all shadow-lg"
			>
				Bekijk alle foto's
			</a>
		</div>
	</div>
</section>
