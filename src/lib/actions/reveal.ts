/**
 * Subtiele scroll-reveal (PROJECT-BRIEF §6). Respecteert prefers-reduced-motion:
 * dan direct zichtbaar, geen animatie.
 */
export function reveal(node: HTMLElement, delay = 0) {
	const reduce =
		typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

	if (reduce || typeof IntersectionObserver === 'undefined') {
		node.style.opacity = '1';
		return;
	}

	node.style.opacity = '0';
	node.style.transform = 'translateY(16px)';
	node.style.transition = `opacity .6s ease ${delay}ms, transform .6s ease ${delay}ms`;

	const io = new IntersectionObserver(
		(entries) => {
			for (const e of entries) {
				if (e.isIntersecting) {
					node.style.opacity = '1';
					node.style.transform = 'none';
					io.unobserve(node);
				}
			}
		},
		{ threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
	);
	io.observe(node);

	return { destroy: () => io.disconnect() };
}
