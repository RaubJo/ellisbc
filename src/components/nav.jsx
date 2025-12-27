import Logo from "@/icons/logo_wordmark_full.svg"
import { A } from "@solidjs/router"
import { createSignal, onMount, onCleanup } from "solid-js"

export default function Nav() {
    const [isScrolled, setIsScrolled] = createSignal(false)

    const onScroll = () => {
		setIsScrolled(window.scrollY > 330)
	}

    onMount(() => {
		onScroll() 
		window.addEventListener("scroll", onScroll, { passive: true })

        onCleanup(() => {
		    window.removeEventListener("scroll", onScroll)
	    })
	})



    return (
        <nav 
            class="w-full fixed top-0 left-0 min-h-12 h-fit z-20 px-10 flex transition-all duration-300"
            classList={{
                'bg-blue-100': isScrolled(),
                'shadow-xl': isScrolled()
            }}
        >
            <Logo class="w-38 my-4"/>

            <div class="grow flex justify-end items-center text-xl gap-8">
                <A href="about">About</A>
                <A href="next-steps">Next Steps</A>
                <A href="https://www.youtube.com/@EllisBaptistChurch/streams" target="_blank">Watch</A>
                <A href="https://www.facebook.com/www.ellisbc.org" target="_blank">Give</A>
            </div>
        </nav>
    )
}
