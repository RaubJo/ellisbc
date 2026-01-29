import { For, Show, Suspense } from "solid-js"
import { A, query, createAsync } from "@solidjs/router";
import useBreakpoints from "@/hooks/useBreakpoints";
import Chevron from "@/icons/chevron.svg"

const getEvents = query(async () => {
    "use server"
    const placeholder = 'https://placehold.co/300x400/transparent/grey'
    return [
        {
            image: {
                src: placeholder, 
                width: 300,
                height: 400,
                alt: 'Placeholder image'
            },
            title: 'Christmas Eve',
            start_at: (new Date())

        },
        {
            image: {
                src: placeholder,
                width: 300,
                height: 400,
                alt: 'Placeholder image'
            },
            title: 'Christmas',
            start_at: (new Date())
        },
        {
            image: {
                src: placeholder,
                width: 300,
                height: 400,
                alt: 'Placeholder image'
            },
            title: 'New Year\'s',
            start_at: (new Date())
        },
    ]
}, "events")

export default function Events() {
    const events = createAsync(() => getEvents())
    const count = useBreakpoints({sm: 2, md: 3}, 1)

    return (
        <Suspense>
            <Show when={events()?.length > 0}>
                <section class="w-full bg-gray-100 py-12 flex">
                    <div class="container max-w-5xl mx-auto px-10" >
                        <h1 class="mb-10 md:mb-12 text-3xl md:text-5xl font-serif text-center sm:text-left font-bold whitespace-nowrap tracking-wide">Upcoming Events</h1>
                        <div class="flex flex-col sm:flex-row justify-between w-full gap-6 mb-8">
                            <For each={events().slice(0, count())}>
                                {(event) => 
                                    <div class="bg-gray-30 aspect-3/4 shadow-xl relative w-full mx-auto sm:w-1/2 md:w-1/3 hover:-translate-y-8 transition-all cursor-pointer duration-250">
                                        <img src={event.image.src} width={event.image.width} height={event.image.height} alt={event.image.alt} class="inset-0 w-full h-full object-cover" />
                                        <div class="absolute w-full bg-gray-100/80 h-fit flex pl-4 bottom-0">
                                            <span class="text-2xl text-white my-4 font-serif">{event.title}</span>
                                        </div>
                                    </div>
                                }
                            </For>
                        </div>

                        <div class="w-full flex justify-end">
                            <A href="events" class="font-serif font-bold text-3xl mr-0 ml-auto inline-flex items-center h-fit group hover:bg-gray-40/50 pl-2 py-1 transition-all">More Events <Chevron class="fill-white size-8 my-auto mt-1"/></A>
                        </div>
                    </div>


                </section>
            </Show>
        </Suspense>
    )
}
