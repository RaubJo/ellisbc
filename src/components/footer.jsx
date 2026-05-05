
import { A } from "@solidjs/router"
import LogoWordmarkCutOff from "@/icons/logo_wordmark_cutoff.svg"
import LogoWordmark from "@/icons/logo_wordmark_full.svg"
import Phone from "@/icons/phone.svg"
import Location from "@/icons/location.svg"
import Envelope from "@/icons/envelope.svg"
import Youtube from "@/icons/Youtube.svg"
import Facebook from "@/icons/facebook.svg"
import { For, Show } from "solid-js"

import navLinks from "@/data/links"

export default function Footer() {
    return (
        <footer class="w-screen bg-blue-100 flex-col md:flex-row flex relative overflow-y-hidden pt-24 md:pt-64">
                <LogoWordmarkCutOff class="hidden sm:block pointer-events-none max-w-250 left-1/2 -translate-x-1/2 w-full mb-0 absolute opacity-11 bottom-0"></LogoWordmarkCutOff>
                <div class="container max-w-5xl flex flex-col sm:flex-row text-base md:text-lg w-full font-sans mb-10 mt-auto md:mx-auto">
                    <LogoWordmark class="sm:hidden pointer-events-none grow mx-auto px-10 mb-10 min-w-75" />
                    <div class="flex-col flex gap-4 w-fit [--icon-size:--spacing(8)] md:[--icon-size:--spacing(10)] mx-auto sm:ml-10 justify-end">
                        <Info />
                        <SocialIcons /> 
                    </div>

                    <div class="hidden sm:flex flex-col justify-end gap-6 md:flex-row md:mb-10 md:mt-auto md:w-1/2 mr-10 md:justify-between md:items-end text-base md:text-lg">
                        <For each={navLinks}>
                            {({name, href, target = null}) => (
                                <Show when={href}>
                                    <A href={href} target={target ?? "_self"} class="hover:underline">
                                        {name}
                                    </A>
                                </Show>
                            )}
                        </For>
                    </div>
                </div>

        </footer>
    )
}

function Info() {
    return (
        <>
        <div class="flex gap-4">
            <Location class="size-(--icon-size) fill-white"/>
            <A href="#" class="hover:underline font-light" target="_blank">107 W 9th St. <br/> Ellis, KS 67637</A>
        </div>
        <div class="flex gap-4">
            <Phone class="size-(--icon-size) fill-white"/>
            <a href="tel:+17857263567" class="hover:underline font-light">785.726.3567</a>
        </div>
        <div class="flex gap-4">
            <Envelope class="size-(--icon-size) fill-white"/>
            <a href="mailto:info@ellisbc.org">info@ellisbc.org</a>
        </div>
        </>
    )

}

function SocialIcons() {
    return(
        <div class="flex gap-4 items-center h-fit mx-auto sm:mx-0">
            <A href="https://www.youtube.com/@EllisBaptistChurch" class="w-fit h-fit" target="_blank">
                <Youtube class="h-full w-(--icon-size) fill-white hover:fill-[#FF0000]" />
            </A>
            <A href="https://www.facebook.com/www.ellisbc.org" class="h-full flex items-center" target="_blank">
                <Facebook class="h-[calc(var(--icon-size)-(--spacing(3)))] w-auto fill-white hover:fill-[#0866FF]" />
            </A>
        </div>
    )
}
