<svelte:head>
	<title>Phia's Maaltijd of Soep - Phia's Smulparadijs</title>
	<meta name="description" content="Bekijk de dagelijkse specials en updates van Phia's Smulparadijs. Volg ons op social media voor de nieuwste maaltijden en aangepaste openingstijden." />
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<!-- Page Header -->
	<div class="bg-gradient-to-r from-red-600 to-orange-600 text-white py-16">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<h1 class="text-4xl md:text-5xl font-bold mb-4">Phia's Maaltijd of Soep</h1>
			<p class="text-xl md:text-2xl text-orange-100">Dagelijkse updates en specials</p>
		</div>
	</div>
	
	<!-- Main Content -->
	<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-32 md:pb-12">
		<!-- Featured "Vandaag" Block -->
		<div class="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-2xl shadow-2xl p-8 md:p-12 mb-12">
			<div class="flex items-start gap-4 mb-6">
				<div class="bg-white/20 rounded-full p-3">
					<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
					</svg>
				</div>
				<div class="flex-1">
					<h2 class="text-3xl font-bold mb-2">Vandaag</h2>
					<p class="text-xl text-orange-100">Bekijk onze social media voor de dagelijkse maaltijd!</p>
				</div>
			</div>
			<div class="bg-white/10 rounded-lg p-6 backdrop-blur">
				<p class="text-lg mb-4">
					Elke dag delen we onze speciale maaltijd of soep via onze social media kanalen.
					Volg ons om op de hoogte te blijven!
				</p>
				<div class="flex flex-col sm:flex-row gap-4">
					<a 
						href="https://www.youtube.com/@phiassmulparadijs" 
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center justify-center px-6 py-3 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100 transition-all shadow-md hover:shadow-lg"
					>
						<svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
							<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
						</svg>
						YouTube
					</a>
					<a 
						href="https://www.instagram.com/phiassmulparadijs" 
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center justify-center px-6 py-3 bg-white text-pink-600 font-semibold rounded-lg hover:bg-gray-100 transition-all shadow-md hover:shadow-lg"
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
						class="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-all shadow-md hover:shadow-lg"
					>
						<svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
							<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
						</svg>
						Facebook
					</a>
				</div>
			</div>
		</div>
		
		<!-- Content Cards -->
		<div class="space-y-8">
			<!-- Maaltijd of Soep Card -->
			<div class="bg-white rounded-xl shadow-md overflow-hidden">
				<div class="bg-gradient-to-r from-orange-600 to-red-600 p-6">
					<h3 class="text-2xl font-bold text-white flex items-center">
						<svg class="w-7 h-7 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
						</svg>
						Maaltijd of Soep
					</h3>
				</div>
				<div class="p-6">
					<p class="text-gray-700 mb-4">
						Bekijk onze YouTube kanaal voor de dagelijkse maaltijd of soep special!
						We delen regelmatig video's met onze heerlijke Surinaamse gerechten.
					</p>
					<a 
						href="https://www.youtube.com/@phiassmulparadijs" 
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center text-orange-600 font-semibold hover:text-orange-700"
					>
						Bekijk op YouTube
						<svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
						</svg>
					</a>
				</div>
			</div>
			
			<!-- Aangepaste Openingstijden Card -->
			<div class="bg-white rounded-xl shadow-md overflow-hidden">
				<div class="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
					<h3 class="text-2xl font-bold text-white flex items-center">
						<svg class="w-7 h-7 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
						</svg>
						Aangepaste Openingstijden
					</h3>
				</div>
				<div class="p-6">
					<p class="text-gray-700 mb-4">
						Houd onze website en social media in de gaten voor aangepaste openingstijden tijdens
						feestdagen en speciale gelegenheden.
					</p>
					<div class="bg-gray-50 rounded-lg p-4">
						<p class="font-semibold text-gray-900 mb-2">Normale openingstijden:</p>
						<ul class="space-y-1 text-gray-700">
							<li><span class="font-medium">Maandag:</span> Gesloten</li>
							<li><span class="font-medium">Dinsdag - Zaterdag:</span> 10:00 - 18:00</li>
							<li><span class="font-medium">Zondag:</span> Gesloten</li>
						</ul>
					</div>
				</div>
			</div>
			
			<!-- Huishoudelijke Mededeling Card -->
			<div class="bg-white rounded-xl shadow-md overflow-hidden">
				<div class="bg-gradient-to-r from-gray-700 to-gray-800 p-6">
					<h3 class="text-2xl font-bold text-white flex items-center">
						<svg class="w-7 h-7 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
						</svg>
						Huishoudelijke Mededeling
					</h3>
				</div>
				<div class="p-6">
					<p class="text-gray-700 mb-4">
						Voor de nieuwste updates, speciale mededelingen en eventuele wijzigingen,
						volg ons op onze social media kanalen.
					</p>
					<div class="flex flex-wrap gap-4">
						<a 
							href="https://www.facebook.com/phiassmulparadijs" 
							target="_blank"
							rel="noopener noreferrer"
							class="text-blue-600 hover:text-blue-700 font-medium"
						>
							Facebook →
						</a>
						<a 
							href="https://www.instagram.com/phiassmulparadijs" 
							target="_blank"
							rel="noopener noreferrer"
							class="text-pink-600 hover:text-pink-700 font-medium"
						>
							Instagram →
						</a>
					</div>
				</div>
			</div>
		</div>
		
		<!-- Call to Action -->
		<div class="mt-12 text-center bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-8">
			<h3 class="text-2xl font-bold text-gray-900 mb-4">Mis niets van Phia's!</h3>
			<p class="text-gray-700 mb-6">
				Abonneer je op onze kanalen om altijd op de hoogte te zijn van de dagelijkse specials
			</p>
			<a 
				href="https://www.youtube.com/@phiassmulparadijs" 
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-bold text-lg rounded-lg hover:bg-red-700 transition-all shadow-md hover:shadow-lg"
			>
				<svg class="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
					<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
				</svg>
				Abonneer op YouTube
			</a>
		</div>
	</div>
</div>
