import { Transition } from "solid-transition-group"
import { createSignal, onMount, onCleanup } from "solid-js"
import Chevron from "@/icons/chevron.svg"

export default function Nav() {
	const [isScrolled, setIsScrolled] = createSignal(false)

	onMount(() => {
		const onScroll = () => {
			setIsScrolled(window.scrollY > window.innerHeight)
		}

		onScroll()

		window.addEventListener("scroll", onScroll, { passive: true })
		onCleanup(() => window.removeEventListener("scroll", onScroll))
	})

	return (
		<Transition
			enterClass="opacity-0"
			enterActiveClass="transition-all duration-300 ease-out"
			enterToClass="opacity-100"
			exitActiveClass="transition-all duration-200 ease-in"
			exitToClass="opacity-0" 
		>
			{isScrolled() && (
				<button
					class="fixed right-8 bottom-8 size-16 bg-blue-100 flex cursor-pointer"
					onClick={() =>
						window.scrollTo({ top: 0, behavior: "smooth" })
					}
				>
					<Chevron class="fill-white -rotate-90 m-auto size-12" />
				</button>
			)}
		</Transition>
	)
}
