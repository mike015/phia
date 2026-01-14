<script lang="ts">
	let mobileMenuOpen = $state(false);
	let scrolled = $state(false);
	
	// Track scroll position for header background
	$effect(() => {
		const handleScroll = () => {
			scrolled = window.scrollY > 20;
		};
		
		if (typeof window !== 'undefined') {
			window.addEventListener('scroll', handleScroll);
			return () => window.removeEventListener('scroll', handleScroll);
		}
	});
	
	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}
	
	function closeMobileMenu() {
		mobileMenuOpen = false;
	}
</script>

<!-- Desktop Header - 88px height, sticky with transparent to solid transition -->
<header class="sticky top-0 z-50 transition-all duration-300 {scrolled ? 'bg-[#0E0E0E] shadow-xl' : 'bg-transparent'}">
	<div class="max-w-[1280px] mx-auto px-6 md:px-10">
		<div class="flex justify-between items-center h-[88px]">
			<!-- Logo / Site Name - Left -->
			<div class="flex-shrink-0">
				<a href="/" class="text-xl md:text-2xl font-bold text-white hover:opacity-80 transition-opacity">
					Phia's Smulparadijs
				</a>
			</div>
			
			<!-- Desktop Navigation - Center -->
			<nav class="hidden md:flex items-center space-x-8">
				<a href="/" class="text-white/90 hover:text-white transition-colors font-medium">Home</a>
				<a href="/menu" class="text-white/90 hover:text-white transition-colors font-medium">Phia's Menu</a>
				<a href="/maaltijd-of-soep" class="text-white/90 hover:text-white transition-colors font-medium">Maaltijd of Soep</a>
				<a href="/fotos" class="text-white/90 hover:text-white transition-colors font-medium">Foto's</a>
				<a href="/wie-zijn-wij" class="text-white/90 hover:text-white transition-colors font-medium">Wie zijn wij</a>
				<a href="/contact" class="text-white/90 hover:text-white transition-colors font-medium">Contact</a>
			</nav>
			
			<!-- Primary CTA - Right - Pill-shaped button -->
			<div class="hidden md:block">
				<a 
					href="tel:0707851813" 
					class="inline-flex items-center h-[44px] px-6 bg-[#C5342F] text-white font-semibold rounded-full hover:bg-[#A02822] hover:scale-[1.03] transition-all shadow-lg"
				>
					<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
					</svg>
					Bel 070-7851813
				</a>
			</div>
			
			<!-- Mobile Menu Button -->
			<button 
				onclick={toggleMobileMenu}
				class="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors text-white"
				aria-label="Menu"
			>
				{#if mobileMenuOpen}
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
					</svg>
				{:else}
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
					</svg>
				{/if}
			</button>
		</div>
	</div>
	
	<!-- Mobile Menu -->
	{#if mobileMenuOpen}
		<div class="md:hidden bg-[#0E0E0E] border-t border-white/10">
			<nav class="px-4 py-4 space-y-2">
				<a href="/" onclick={closeMobileMenu} class="block px-4 py-3 rounded-lg hover:bg-white/5 text-white font-medium transition-colors">Home</a>
				<a href="/menu" onclick={closeMobileMenu} class="block px-4 py-3 rounded-lg hover:bg-white/5 text-white font-medium transition-colors">Phia's Menu</a>
				<a href="/maaltijd-of-soep" onclick={closeMobileMenu} class="block px-4 py-3 rounded-lg hover:bg-white/5 text-white font-medium transition-colors">Maaltijd of Soep</a>
				<a href="/fotos" onclick={closeMobileMenu} class="block px-4 py-3 rounded-lg hover:bg-white/5 text-white font-medium transition-colors">Foto's</a>
				<a href="/wie-zijn-wij" onclick={closeMobileMenu} class="block px-4 py-3 rounded-lg hover:bg-white/5 text-white font-medium transition-colors">Wie zijn wij</a>
				<a href="/contact" onclick={closeMobileMenu} class="block px-4 py-3 rounded-lg hover:bg-white/5 text-white font-medium transition-colors">Contact</a>
			</nav>
		</div>
	{/if}
</header>

<!-- Mobile Bottom Bar - Sticky -->
<div class="md:hidden fixed bottom-0 left-0 right-0 bg-[#0E0E0E] border-t border-white/10 shadow-2xl z-50">
	<div class="flex justify-around items-center h-16">
		<a href="tel:0707851813" class="flex flex-col items-center justify-center flex-1 py-2 text-[#C5342F] hover:bg-white/5 transition-colors">
			<svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
			</svg>
			<span class="text-xs font-medium">Bel</span>
		</a>
		<a href="/menu" class="flex flex-col items-center justify-center flex-1 py-2 text-white/70 hover:bg-white/5 hover:text-white transition-colors">
			<svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
			</svg>
			<span class="text-xs font-medium">Menu</span>
		</a>
		<a href="https://www.google.com/maps/dir//Phia's+Smulparadijs" target="_blank" rel="noopener noreferrer" class="flex flex-col items-center justify-center flex-1 py-2 text-white/70 hover:bg-white/5 hover:text-white transition-colors">
			<svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
			</svg>
			<span class="text-xs font-medium">Route</span>
		</a>
	</div>
</div>
