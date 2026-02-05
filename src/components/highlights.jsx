import { For } from "solid-js"
import { A } from "@solidjs/router"

const highlights = [
    {
        label: 'Discipleship',
        image: '/images/discipleship.jpg',
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
]

export default function Highlights() {
    return (
        <section class="w-full h-fit bg-blue-20">
            <div class="flex columns-4 gap-10 mx-10 py-10">
                <For each={highlights.slice(0, 4)}>
                    {({label, image = null, href = null}) => {
                        const Card = () => (
                            <>
                                {image && (<img src={image} class="inset-0 object-cover absolute w-full h-full opacity-75 group-hover:opacity-90 transition-opacity"/>)}
                                <span class="m-auto text-white font-bold font-serif text-xl lg:text-2xl z-1 uppercase tracking-widest text-shadow-lg">{label}</span>
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
