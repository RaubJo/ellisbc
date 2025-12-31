import Logo from "@/icons/logo_wordmark_full.svg"
import { A } from "@solidjs/router"
import { createSignal, onMount, onCleanup } from "solid-js"
import Hamburger from "@/components/hamburger"

import links from "@/data/links"
import { Presence, Motion } from "solid-motionone"


export default function Nav() {
    const [isScrolled, setIsScrolled] = createSignal(false)
    const [open, setOpen] = createSignal(false)

    const onScroll = () => {
		setIsScrolled(window.scrollY > 330)
        
        if(open()) {
            setOpen(false)
        }
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
            class="w-full fixed top-0 left-0 min-h-(--height) h-(--height) z-20 px-4 md:px-10 flex transition-all duration-300 [--height:--spacing(24)] lg:[--height:--spacing(32)]"
            classList={{
                'bg-blue-100': isScrolled(),
                'shadow-xl': isScrolled()
            }}
        >
            <A href="/" class="my-auto z-20">
                <Logo class="w-38"/>
            </A>

            <div class="hidden grow md:flex justify-end items-center text-xl xl:text-2xl gap-8">
                <For each={links}>
                    {({label, href, target = null}) => <A href={href} target={target ?? "_self"} class="hover:underline">{label}</A>}
                </For>
            </div>

            <div class="md:hidden flex justify-end grow  w-fit items-center z-20">
                <Hamburger toggle={() => setOpen(!open())} toggled={open()}/>
            </div>

             <Presence exitBeforeEnter>
                {open() && (
                    <Motion.div 
                        class="bg-blue-100 w-full absolute left-0 h-fit flex justify-end pt-(--height)"
                        initial={{ y: "-100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, easing: "ease-in-out" }}
                    >
                        <div class="flex flex-col w-fit gap-y-4 pb-8 px-5 text-right">
                            <For each={links}>
                                {({label, href, target = null}, index) => (
                                    <Motion.div
                                        initial={{ x: 50, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ 
                                            duration: 0.3, 
                                            easing: "ease-out",
                                            delay: 0.3 + (index() * 0.1)
                                        }}
                                        exit={{opacity: 0}}
                                    >
                                        <A href={href} target={target ?? "_self"} class="hover:underline text-2xl">
                                            {label}
                                        </A>
                                    </Motion.div>
                                )}
                            </For>
                        </div>
                    </Motion.div>
                )}
            </Presence>
            
        </nav>
    )
}
