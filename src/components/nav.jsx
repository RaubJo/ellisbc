import Logo from "@/icons/logo_wordmark_full.svg"
import { A } from "@solidjs/router"
import { createSignal, onMount, onCleanup, Show } from "solid-js"
import Hamburger from "@/components/hamburger"
import Dropdown from "@/components/dropdown"

import navLinks from "@/data/nav_links"
import { Presence, Motion } from "solid-motionone"


export default function Nav(props) {
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
                'bg-blue-100': isScrolled() || !(props?.clear ?? true),
                'shadow-xl': isScrolled()
            }}
        >
            <A href="/" class="my-auto z-20">
                <Logo class="w-36 lg:w-44 lg:py-3 transition-all"/>
            </A>

            <div class="hidden grow md:flex justify-end items-center">
                <Dropdown links={navLinks} />
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
                            <For
                                each={navLinks.flatMap((item) => {
                                    if (item.columns) {
                                        const columnLinks = item.columns
                                            .flatMap((column) => column.items ?? [])
                                            .filter((link) => link.title)
                                            .map((link) => ({
                                                type: "link",
                                                label: link.title,
                                                href: link.href,
                                            }))

                                        return item.mobile === false
                                            ? columnLinks
                                            : [{ type: "heading", label: item.name }, ...columnLinks]
                                    }

                                    return item.mobile === false
                                        ? []
                                        : [
                                            {
                                                type: "link",
                                                label: item.name,
                                                href: item.href,
                                                target: item.target,
                                            },
                                        ]
                                })}
                            >
                                {(entry, index) => (
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
                                        <Show
                                            when={entry.type === "link"}
                                            fallback={
                                                <div class="text-2xl font-bold text-right pt-2">
                                                    {entry.label}
                                                </div>
                                            }
                                        >
                                            <A
                                                href={entry.href}
                                                target={entry.target ?? "_self"}
                                                rel={entry.target === "_blank" ? "noreferrer" : undefined}
                                                class="hover:underline text-2xl"
                                            >
                                                {entry.label}
                                            </A>
                                        </Show>
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
