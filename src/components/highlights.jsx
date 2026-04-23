import { createMemo, For } from "solid-js"
import { A, useLocation } from "@solidjs/router"

const highlights = [
    {
        label: 'Path of Growth',
        image: '/images/discipleship.jpg',
        href: '/path-of-growth'
    },
    {
        label: 'Our Mission',
        href: '/our-mission',
        image: '/images/mission.jpg'
    },
    {
        label: 'Our beliefs',
        image: '/images/beliefs.jpg',
        href: '/our-beliefs'
    },
    {
        label: 'Events',
        image: '/images/calendar.jpg',
        href: '/events'
    },
    {
        label: 'Living Faith <br /> Fellowship',
        image: '/images/lffellowship.jpg',
        href: 'https://lffellowship.com/'
    },
    {
        label: 'LFBI',
        image: '/images/lffellowship.jpg',
        href: 'https://lfbi.org/'
    },
]

export default function Highlights() {
    const location = useLocation()

    const normalizePath = (path) => {
        if (!path) return "/"
        const normalized = path.replace(/\/+$/, "")
        return normalized || "/"
    }

    const visibleHighlights = createMemo(() => {
        const currentPath = normalizePath(location.pathname)

        return highlights
            .filter(({ href }) => {
                if (!href || !href.startsWith("/")) return true
                return normalizePath(href) !== currentPath
            })
            .slice(0, 4)
    })

    return (
        <section class="w-full h-fit bg-blue-20">
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 lg:gap-10 px-5 sm:px-8 lg:px-10 py-10">
                <For each={visibleHighlights()}>
                    {({label, image = null, href = null}) => {
                        const Card = () => (
                            <>
                                {image && (<img src={image} class="inset-0 object-cover absolute w-full h-full opacity-75 group-hover:opacity-90 transition-opacity"/>)}
                                <span class="m-auto text-white font-bold font-serif text-sm sm:text-xl lg:text-2xl z-1 uppercase tracking-widest text-shadow-lg" innerHTML={label} />
                            </>
                        )

                        return href ? (
                            <A href={href} class="aspect-square bg-black w-full flex text-center group transition-colors cursor-pointer relative group">
                                <Card />
                            </A>
                        ) : (
                            <div class="aspect-square bg-black w-full flex text-center group transition-colors cursor-pointer relative group">
                                <Card />
                            </div>
                        )
                    }}
                </For>
            </div>
            
            
        </section>
    )
}
