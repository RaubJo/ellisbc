import { A, query, createAsync } from "@solidjs/router"
import { For } from "solid-js"


const getCtas = query(async () => {
    "use server"
    return [
        {
            image: {
                src: '/images/evangelism.png', 
                width: 300,
                height: 300,
                alt: ''
            },
            title: 'Who We Are',
            subtitle: 'Ordinary people seeking to know Christ, live His truth, and serve others.',
            href: 'who-we-are',
        },
        {
            image: {
                src: '/images/sermon.png', 
                width: 300,
                height: 300,
                alt: ''
            },
            title: 'What to Expect',
            subtitle: 'Engaging worship and biblical teaching for all ages.',
            href: 'who-we-are#what-to-expect',
        },
        {
            image: {
                src: '/images/worship.png', 
                width: 300,
                height: 300,
                alt: ''
            },
            title: 'What We Believe',
            subtitle: 'Biblical truth. Christ-centered faith. Lives changed by God’s grace.',
            href: 'our-beliefs',
        },
    ]
}, "ctas")

export default function TriCTA() {
    const cta = createAsync(() => getCtas())

    return(
        <section class="w-full py-12 bg-white px-10">
            <div class="flex gap-8 lg:justify-around w-fit xl:w-full mx-auto xl:px-12 flex-col md:flex-row">

                <For each={cta()}>
                    {({title, subtitle, image, href}) => 
                        <A href={href} class="w-4/5 md:w-1/3 flex flex-col items-center gap-4 mx-auto group">
                            <div class="size-42 lg:size-52 xl:size-64 relative cursor-pointer flex">
                                <img
                                    src={image.src}
                                    class="absolute inset-0 w-full h-full object-cover opacity-100 group-hover:opacity-90 transition-opacity"
                                />
                            </div>
                            <h1 class="font-serif uppercase text-blue-100 text-2xl lg:text-3xl whitespace-nowrap">{title}</h1>
                            <div class="w-2/5 h-px bg-black/80 mx-auto"/>
                            <p class="w-4/5 text-blue-100 font-sans text-lg text-center">{subtitle}</p>
                        </A> 
                    }
                </For>
            </div>
        </section>
    )
}
