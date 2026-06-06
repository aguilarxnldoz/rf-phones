/**
 * Static, GPU-cheap background.
 *
 * Replaces the previous implementation, which used three viewport-sized
 * `motion.div` blobs with `blur-[100–150px]` filters animating
 * `scale`/`x`/`y` on an infinite loop. That combo (huge blur radius +
 * continuous transforms on viewport-sized layers + a `mix-blend-overlay`
 * noise image) forced full-screen recomposites every frame and was the
 * primary cause of laggy hover/scroll throughout the app.
 *
 * This version paints once as plain radial gradients — zero JS, zero
 * animation, no `filter`/`backdrop-filter`, no blend modes.
 */
export function AnimatedBackground() {
	return (
		<div
			aria-hidden
			className="bg-dark-bg fixed inset-0 -z-10 overflow-hidden"
			style={{
				backgroundImage:
					"radial-gradient(60vw 50vh at 15% 10%, rgba(163,0,21,0.10), transparent 60%), radial-gradient(50vw 45vh at 85% 25%, rgba(163,0,21,0.05), transparent 60%), radial-gradient(70vw 55vh at 35% 95%, rgba(163,0,21,0.08), transparent 60%)",
			}}
		/>
	);
}
