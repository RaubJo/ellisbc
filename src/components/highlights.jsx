import { For } from "solid-js"

const highlights = [
    {
        label: 'Discipleship',
        image: '/images/discipleship.jpg',
    },
    {
        label: 'Our Mission',
        image: '/images/mission.jpg'
    },
    {
        label: 'Our beliefs',
        image: '/images/beliefs.jpg'
    },
    {
        label: 'Events',
        image: '/images/calendar.jpg'
    },
    {
        label: 'Living Faith Fellowship',
    },
    {
        label: 'Watch Services'
    },
]

export default function Highlights() {
    return (
        <section class="w-full h-fit bg-blue-20">
            <div class="flex columns-4 gap-10 mx-10 py-10">
                <For each={highlights.slice(0, 4)}>
                    {({label, image = null}) => (
                        <div class="aspect-square bg-black w-full flex text-center group transition-colors cursor-pointer relative group">
                            {image && (<img src={image} class="inset-0 object-cover absolute w-full h-full opacity-75 group-hover:opacity-90 transition-opacity"/>)}
                            <span class="m-auto text-white font-bold font-serif text-2xl z-1 uppercase tracking-widest text-shadow-lg">{label}</span>
                        </div>
                    )}
                </For>
            </div>
            
            
        </section>
    )
}
