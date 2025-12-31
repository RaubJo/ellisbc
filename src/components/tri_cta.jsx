import Globe from "@/icons/globe.svg"
import Bible from "@/icons/bible.svg"
import Church from "@/icons/church.svg"
import { query, createAsync } from "@solidjs/router"
import { For } from "solid-js"
import { A } from "@solidjs/router"


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
            title: 'Evangelism',
            subtitle: 'Aute cillum elit dolore fugiat esse',
            href: '#',
        },
        {
            image: {
                src: '/images/sermon.png', 
                width: 300,
                height: 300,
                alt: ''
            },
            title: 'Discipleship',
            subtitle: 'Aute cillum elit dolore fugiat esse',
            href: '#',
        },
        {
            image: {
                src: '/images/worship.png', 
                width: 300,
                height: 300,
                alt: ''
            },
            title: 'Worship',
            subtitle: 'Aute cillum elit dolore fugiat esse',
            href: '#',
        },
    ]
}, "ctas")

const icons = {
    evangelism: <Globe class="relative size-32 m-auto opacity-0 group-hover:opacity-100 transition-opacity" />,
    discipleship: <Bible class="relative size-32 m-auto opacity-0 group-hover:opacity-100 transition-opacity" />,
    worship: <Church class="relative size-32 m-auto opacity-0 group-hover:opacity-100 transition-opacity" />,
}

export default function TriCTA() {
    const cta = createAsync(() => getCtas())

    return(
        <section class="w-full py-12 bg-white px-10">
            <div class="flex gap-8 lg:justify-aroundw-fit xl:w-full mx-auto xl:px-12 flex-col md:flex-row">

                <For each={cta()}>
                    {({title, subtitle, image, href}) => 
                        <A href={href} class="w-4/5 md:w-1/3 flex flex-col items-center gap-4 mx-auto group">
                            <div class="size-42 xl:size-64 relative cursor-pointer flex">
                                <img
                                    src={image.src}
                                    class="absolute m-auto transition-opacity group-hover:opacity-0 aspect-square inset-0"
                                />
                                <div class="absolute inset-0 bg-red-80 opacity-0 group-hover:opacity-100 transition-opacity duration-250" />
                                {icons[title.toLowerCase()]}
                            </div>
                            <h1 class="font-serif uppercase text-blue-100 text-4xl">{title}</h1>
                            <div class="w-2/5 h-px bg-black/80 mx-auto"/>
                            <p class="w-2/3 text-blue-100 font-sans text-sm lg:text-lg text-center">{subtitle}</p>
                        </A> 
                    }

                </For>
            </div>
        </section>
    )
}
