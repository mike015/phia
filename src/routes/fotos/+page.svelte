<script lang="ts">
	// Photo gallery - to be replaced with actual images from CMS
	const photos = [
		{ id: 1, src: '/images/placeholder-1.jpg', alt: 'Surinaams gerecht' },
		{ id: 2, src: '/images/placeholder-2.jpg', alt: 'Broodjes' },
		{ id: 3, src: '/images/placeholder-3.jpg', alt: 'Maaltijd' },
		{ id: 4, src: '/images/placeholder-4.jpg', alt: 'Interieur' },
		{ id: 5, src: '/images/placeholder-5.jpg', alt: 'Specials' },
		{ id: 6, src: '/images/placeholder-6.jpg', alt: 'Gerechten' },
		{ id: 7, src: '/images/placeholder-7.jpg', alt: 'Snacks' },
		{ id: 8, src: '/images/placeholder-8.jpg', alt: 'Soep' },
		{ id: 9, src: '/images/placeholder-9.jpg', alt: 'Roti' },
	];
	
	let selectedPhoto = $state<number | null>(null);
	
	function openLightbox(photoId: number) {
		selectedPhoto = photoId;
	}
	
	function closeLightbox() {
		selectedPhoto = null;
	}
	
	function nextPhoto() {
		if (selectedPhoto === null) return;
		const currentIndex = photos.findIndex(p => p.id === selectedPhoto);
		const nextIndex = (currentIndex + 1) % photos.length;
		selectedPhoto = photos[nextIndex].id;
	}
	
	function prevPhoto() {
		if (selectedPhoto === null) return;
		const currentIndex = photos.findIndex(p => p.id === selectedPhoto);
		const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
		selectedPhoto = photos[prevIndex].id;
	}
	
	const currentPhoto = $derived(photos.find(p => p.id === selectedPhoto));
</script>

<svelte:head>
	<title>Foto's - Phia's Smulparadijs</title>
	<meta name="description" content="Bekijk foto's van onze heerlijke Surinaams-Creoolse gerechten, broodjes en sfeer bij Phia's Smulparadijs in Den Haag." />
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<!-- Page Header -->
	<div class="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<h1 class="text-4xl md:text-5xl font-bold mb-4">Phia's Foto's</h1>
			<p class="text-xl md:text-2xl text-orange-100">Geniet met je ogen van onze heerlijke gerechten</p>
		</div>
	</div>
	
	<!-- Photo Grid -->
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-32 md:pb-12">
		<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
			{#each photos as photo}
				<button
					onclick={() => openLightbox(photo.id)}
					class="aspect-square bg-gradient-to-br from-orange-300 to-red-400 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer group"
				>
					<!-- Placeholder - will be replaced with actual images -->
					<div class="w-full h-full flex items-center justify-center text-white text-4xl font-bold group-hover:scale-110 transition-transform">
						{photo.id}
					</div>
				</button>
			{/each}
		</div>
		
		<!-- Social Media Links -->
		<div class="mt-12 text-center bg-white rounded-xl shadow-md p-8">
			<h2 class="text-2xl font-bold text-gray-900 mb-4">Meer foto's op social media</h2>
			<p class="text-gray-600 mb-6">Volg ons voor dagelijkse updates en meer foto's van onze gerechten</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a 
					href="https://www.instagram.com/phiassmulparadijs" 
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-md hover:shadow-lg"
				>
					<svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
						<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
					</svg>
					Instagram
				</a>
				<a 
					href="https://www.facebook.com/phiassmulparadijs" 
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
				>
					<svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
						<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
					</svg>
					Facebook
				</a>
			</div>
		</div>
	</div>
</div>

<!-- Lightbox -->
{#if selectedPhoto !== null && currentPhoto}
	<div 
		role="button"
		tabindex="0"
		class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
		onclick={closeLightbox}
		onkeydown={(e) => e.key === 'Escape' && closeLightbox()}
	>
		<!-- Close Button -->
		<button
			onclick={closeLightbox}
			class="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
			aria-label="Close lightbox"
		>
			<svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
			</svg>
		</button>
		
		<!-- Previous Button -->
		<button
			onclick={(e) => { e.stopPropagation(); prevPhoto(); }}
			class="absolute left-4 text-white hover:text-gray-300 transition-colors"
			aria-label="Previous photo"
		>
			<svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
			</svg>
		</button>
		
		<!-- Image -->
		<div 
			role="button"
			tabindex="0"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
			class="max-w-5xl max-h-[90vh] bg-gradient-to-br from-orange-400 to-red-500 rounded-lg overflow-hidden shadow-2xl"
		>
			<!-- Placeholder - will be replaced with actual image -->
			<div class="aspect-video flex items-center justify-center text-white text-6xl font-bold min-h-[400px]">
				{currentPhoto.id}
			</div>
		</div>
		
		<!-- Next Button -->
		<button
			onclick={(e) => { e.stopPropagation(); nextPhoto(); }}
			class="absolute right-4 text-white hover:text-gray-300 transition-colors"
			aria-label="Next photo"
		>
			<svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
			</svg>
		</button>
	</div>
{/if}
