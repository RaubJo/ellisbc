import { For, Show, Suspense } from "solid-js"
import { query, createAsync } from "@solidjs/router";
import useBreakpoints from "@/hooks/useBreakpoints";

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
                        <h1 class="mb-10 md:mb-12 text-3xl md:text-5xl font-serif text-center md:text-left font-bold whitespace-nowrap">Upcoming Events</h1>
                        <div class="flex flex-col sm:flex-row justify-between w-full gap-6">
                            <For each={events().slice(0, count())}>
                                {(event) => 
                                    <div class="bg-gray-30 aspect-3/4 shadow-xl relative w-3/4 mx-auto sm:w-1/2 md:w-1/3">
                                        <img src={event.image.src} width={event.image.width} height={event.image.height} alt={event.image.alt} class="inset-0 w-full h-full object-cover" />
                                        <div class="absolute w-full bg-gray-100/80 h-fit flex pl-4 bottom-0">
                                            <span class="text-2xl text-white my-4 font-serif">{event.title}</span>
                                        </div>
                                    </div>
                                }
                            </For>
                        </div>

                    </div>

                </section>
            </Show>
        </Suspense>
    )
}
