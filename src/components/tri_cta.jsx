import Globe from "@/icons/globe.svg"
import Bible from "@/icons/bible.svg"
import Church from "@/icons/church.svg"
import { query, createAsync } from "@solidjs/router"
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
            title: 'Evangelism',
            subtitle: 'Aute cillum elit dolore fugiat esse'
        },
        {
            image: {
                src: '/images/sermon.png', 
                width: 300,
                height: 300,
                alt: ''
            },
            title: 'Discipleship',
            subtitle: 'Aute cillum elit dolore fugiat esse'
        },
        {
            image: {
                src: '/images/worship.png', 
                width: 300,
                height: 300,
                alt: ''
            },
            title: 'Worship',
            subtitle: 'Aute cillum elit dolore fugiat esse'
        },
    ]
}, "ctas")

const icons = {
    evangelism: <Globe class="relative size-32 lg:size-48 m-auto opacity-0 group-hover:opacity-100 transition-opacity" />,
    discipleship: <Bible class="relative size-32 lg:size-48 m-auto opacity-0 group-hover:opacity-100 transition-opacity" />,
    worship: <Church class="relative size-32 lg:size-48 m-auto opacity-0 group-hover:opacity-100 transition-opacity" />,
}

export default function TriCTA() {
    const cta = createAsync(() => getCtas())

    return(
        <section class="w-full py-12 bg-white px-10">
            <div class="flex gap-8 lg:gap-auto lg:justify-betweenw-fit mx-auto flex-col md:flex-row">

                <For each={cta()}>
                    {({title, subtitle, image}) => 
                        <div class="w-4/5 md:w-1/3 flex flex-col items-center gap-4 mx-auto">
                            <div class="group size-48 lg:size-52 relative cursor-pointer flex">
                                <img
                                    src={image.src}
                                    class="absolute m-auto transition-opacity group-hover:opacity-0"
                                />
                                <div class="absolute inset-0 F3616C] opacity-0 group-hover:opacity-100 transition-opacity" />
                                {icons[title.toLowerCase()]}
                            </div>
                            <h1 class="font-serif uppercase text-blue-100 text-4xl">{title}</h1>
                            <div class="w-2/5 h-px bg-black/80 mx-auto"/>
                            <p class="w-2/3 text-blue-100 font-sans text-sm lg:text-lg text-center">{subtitle}</p>
                        </div> 
                    }

                </For>
            </div>

        </section>
    )
}
