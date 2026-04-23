import { For } from "solid-js"

import Nav from "@/components/nav"
import Hero from "@/components/hero"
import Footer from "@/components/footer"
import BackToTop from "@/components/back_to_top"
import Highlights from "@/components/highlights"

import Cross from "@/icons/cross.svg"
import Grow from "@/icons/grow.svg"
import Book from "@/icons/book.svg"
import Crown from "@/icons/crown.svg"

const steps = [
    {
        title: "Cost of Discipleship",
        content: "A class designed to answer your questions about discipleship and make it clear what you can expect in the discipleship process.",
    },
    {
        title: "Foundations 1",
        content: "<p class=\"mb-4\">The one-on-one process of a mature believer investing in another by establishing them in core doctrines and the four goals of discipleship: </p><ul class=\"list-disc pl-5\"><li>Established in the worship of God</li><li>Established in the word of God</li><li>Established in the local church</li><li>Established in the work of God</li></ul>",
    },
    {
        title: "Foundations 2 & 3",
        content: "Two classes where new disciples are equipped to begin engaging in ministry service and the mission of making disciples.",
    },
    {
        title: "Living Faith Bible Institute",
        content: "Continued discipleship meant to provide leadership development and theological training in a flexible, online format.",
    },
]

const markers = [
    {
        icon: Cross,
        tintClass: "text-[#87520b]",
        iconClass: "h-36 w-32 md:h-32 md:w-26 lg:h-40 lg:w-32",
    },
    {
        icon: Grow,
        tintClass: "text-[#38726c]",
        iconClass: "h-36 w-32 md:h-32 md:w-26 lg:h-40 lg:w-32",
    },
    {
        icon: Book,
        tintClass: "text-[#7a0000]",
        iconClass: "h-36 w-32 md:h-32 md:w-26 lg:h-40 lg:w-32",
    },
    {
        maskImage: "/images/lfbi-mask.png",
        tintClass: "text-black",
        iconClass: "h-36 w-36 md:h-44 md:w-44 lg:h-52 lg:w-52",
    },
    {
        icon: Crown,
        tintClass: "text-[#177384]",
        iconClass: "h-36 w-32 md:h-32 md:w-26 lg:h-40 lg:w-32",
    },
]

function StepMarker(props) {
    const Icon = props.icon

    return (
        <div class={`relative flex h-36 w-36 items-center justify-center md:h-44 md:w-44 lg:h-52 lg:w-52 ${props.tintClass}`}>
            <div class="absolute inset-0 rounded-full bg-current blur-3xl opacity-12" />

            {props.maskImage ? (
                <div
                    class={`relative z-10 bg-current ${props.iconClass}`}
                    style={{
                        opacity: 0.2,
                        "-webkit-mask-image": `url(${props.maskImage})`,
                        "mask-image": `url(${props.maskImage})`,
                        "-webkit-mask-repeat": "no-repeat",
                        "mask-repeat": "no-repeat",
                        "-webkit-mask-position": "center",
                        "mask-position": "center",
                        "-webkit-mask-size": "contain",
                        "mask-size": "contain",
                    }}
                />
            ) : (
                <Icon class={`relative z-10 ${props.iconClass}`} style={{ opacity: 0.2 }} />
            )}
        </div>
    )
}

function StepCard(props) {
    return (
        <article class="relative z-10 bg-white px-6 py-8 text-left text-blue-100 sm:px-8 sm:py-10 lg:min-h-[16rem]">
            <div class="hidden md:block absolute top-0 left-0 h-px w-1/2 bg-linear-to-r from-gold-30/50 to-white" />
            <div class="hidden md:block absolute top-0 left-0 h-1/2 w-px bg-linear-to-b from-gold-30/50 to-white" />

            <h2 class="font-serif text-[2rem] font-bold leading-[0.95] tracking-wide text-blue-100 sm:text-[2.25rem]">
                {props.title}
            </h2>

            <div class="mt-6 font-sans text-lg leading-relaxed text-blue-80 sm:text-xl [&_li]:text-blue-80 [&_p]:text-blue-80" innerHTML={props.content} />
        </article>
    )
}

export default function PathOfGrowth() {
    return (
        <>
            <Nav />
            <Hero angles={false} subtitle="Path of Growth" />

            <section class="bg-white py-16 sm:py-20 lg:py-24">
                <div class="container mx-auto max-w-7xl px-4 sm:px-6">
                    <div class="mx-auto max-w-6xl">
                        <div class="pointer-events-none relative z-0 mb-1 flex min-h-40 items-center justify-start -ml-10 pl-0 sm:mb-4 sm:ml-0 sm:min-h-36 sm:pl-2 lg:pl-6 md:min-h-44 lg:min-h-52">
                            <StepMarker {...markers[0]} />
                        </div>

                        <div class="relative z-10 flex flex-col gap-0">
                            <For each={steps}>
                                {(step, index) => (
                                    <>
                                        <div class="relative mx-auto -mt-5 w-full max-w-4xl pl-14 pr-1 sm:mt-0 sm:px-6">
                                            <div class="relative z-10 ml-auto max-w-3xl sm:mx-auto">
                                                <StepCard {...step} />
                                            </div>
                                        </div>

                                        {index() < steps.length - 1 ? (
                                            <div class="pointer-events-none relative z-0 my-1 flex min-h-40 items-center justify-start -ml-10 pl-0 sm:my-4 sm:ml-0 sm:min-h-36 sm:pl-2 lg:pl-6 md:min-h-44 lg:min-h-52">
                                                <StepMarker {...markers[index() + 1]} />
                                            </div>
                                        ) : (
                                            <div class="pointer-events-none relative z-0 mt-1 flex min-h-40 items-center justify-start -ml-10 pl-0 sm:mt-4 sm:ml-0 sm:min-h-36 sm:pl-2 lg:pl-6 md:min-h-44 lg:min-h-52">
                                                <StepMarker {...markers[index() + 1]} />
                                            </div>
                                        )}
                                    </>
                                )}
                            </For>
                        </div>
                    </div>
                </div>
            </section>

            <Highlights />
            <Footer />
            <BackToTop />
        </>
    )
}
