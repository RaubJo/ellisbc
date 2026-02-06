import Footer from "@/components/footer"
import Nav from "@/components/nav"
import Highlights from "@/components/highlights"

import { createAsync, query } from "@solidjs/router"
import dayjs from 'dayjs'
import Utc from 'dayjs/plugin/utc'
import Timezone from 'dayjs/plugin/timezone'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import { For, Show } from "solid-js"
import { getRequestEvent } from "solid-js/web"

dayjs.extend(Utc)
dayjs.extend(Timezone)
dayjs.extend(isSameOrAfter)

const getEvents = query(async () => {
    const url = (() => {
        if (typeof window !== "undefined") return "/api/events"
        const event = getRequestEvent()
        const base =
            event?.request?.url
                ? new URL(event.request.url).origin
                : import.meta.env.SERVER_BASE_URL ??
                  import.meta.env.VITE_BASE_URL ??
                  "http://localhost"
        try {
            return new URL("/api/events", base).toString()
        } catch {
            return "http://localhost/api/events"
        }
    })()
    const response = await fetch(url, { cache: "no-store" })
    if (!response.ok) return []
    return response.json()
}, "events")

export default function Events() {
    const events = createAsync(() => getEvents())

    return (
        <>
        <Nav clear={false}/>
        <div class="bg-white h-32 pointer-events-none"></div>
        <section class="bg-white w-full py-10 sm:py-12 px-5 sm:px-8 md:px-12 lg:px-20">
            <h1 class="font-seasons text-4xl sm:text-5xl lg:text-7xl text-black font-bold mb-8 sm:mb-12 text-left">Upcoming Events</h1>

            <div class="flex flex-col gap-y-8">
                <For each={events() ?? []}>
                    {({id, title, description, start_at, end_at}, index) => {
                        const monthKey = dayjs(start_at).format("YYYY-MM")
                        const previous = () => events()?.[index() - 1]
                        const previousMonthKey = () =>
                            previous()
                                ? dayjs(previous().start_at).format("YYYY-MM")
                                : null

                        return (
                            <>
                                <Show when={index() === 0 || monthKey !== previousMonthKey()}>
                                    <div class="pt-6">
                                        <h2 class="text-3xl sm:text-4xl font-seasons font-bold text-blue-100">
                                            {dayjs(start_at).format("MMMM YYYY")}
                                        </h2>
                                        <div class="mt-3 h-px w-full bg-black/20" />
                                    </div>
                                </Show>
                                <div class="grid grid-cols-[max-content] items-start justify-items-start gap-x-4 gap-y-2 text-black h-fit">
                                    <div class="w-fit font-poppins text-left px-2 self-start row-start-1 col-start-1 justify-self-start">
                                        <p class="text-red-100 font-bold uppercase text-base sm:text-lg">{dayjs(start_at).format('MMM')}</p>
                                        <p class="text-xl sm:text-2xl font-bold">{dayjs(start_at).format('DD')}</p>
                                        <p class="text-blue-40 text-base sm:text-lg">{dayjs(start_at).format('ddd')}</p>
                                    </div>
                                    <div class="flex flex-col min-w-0 self-start text-left row-start-1 col-start-2">
                                        {(() => {
                                            const sameDay = dayjs(start_at).isSame(dayjs(end_at), "day")
                                            const dateFormat = "MM/DD/YYYY"
                                            const timeFormat = "hh:mm"
                                            const meridiem = "A"
                                            const startDate = dayjs(start_at).format(dateFormat)
                                            const endDate = dayjs(end_at).format(dateFormat)
                                            const startTime = dayjs(start_at).format(timeFormat)
                                            const endTime = dayjs(end_at).format(timeFormat)
                                            const startMeridiem = dayjs(start_at).format(meridiem)
                                            const endMeridiem = dayjs(end_at).format(meridiem)

                                            return (
                                                <>
                                                    <h1 class="text-2xl sm:text-3xl font-sans font-bold leading-tight">
                                                        {title}
                                                    </h1>
                                                    <p class="text-sm sm:text-base">
                                                        <span class="whitespace-nowrap">
                                                            {sameDay ? startTime : `${startDate} ${startTime}`}
                                                            {"\u00A0"}
                                                            {startMeridiem}
                                                        </span>
                                                        <wbr /> - <wbr />
                                                        <span class="whitespace-nowrap">
                                                            {sameDay ? endTime : `${endDate} ${endTime}`}
                                                            {"\u00A0"}
                                                            {endMeridiem}
                                                        </span>
                                                    </p>
                                                </>
                                            )
                                        })()}
                                    </div>
                                    <Show when={description}>
                                        <p class="text-base sm:text-lg font-sans col-start-2 row-start-2 min-w-0 text-left">{description}</p>
                                    </Show>
                                </div>
                            </>
                        )
                    }}
                </For>
            </div>
        </section>
        <Highlights />
        <Footer />
        </>
    );
}
