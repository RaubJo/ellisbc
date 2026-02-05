import Footer from "@/components/footer"
import Nav from "@/components/nav"
import Highlights from "@/components/highlights"


import { createAsync, query } from "@solidjs/router"
import ICAL from "ical.js"
import dayjs from 'dayjs'
import Utc from 'dayjs/plugin/utc'
import Timezone from 'dayjs/plugin/timezone'
import { For } from "solid-js"

dayjs.extend(Utc)
dayjs.extend(Timezone)

const getEvents = query(async () => {
    "use server"

    const parse = (text) => {
        return text
            ?.replaceAll('&amp;', '&')
    }


    const tz = process.env.APP_TIMEZONE
    const response = await fetch(process.env.CHURCHTRAC_CALENDAR_FEED)
    const stream = await response.text()

    return (new ICAL.Component(ICAL.parse(stream)).getAllSubcomponents('vevent')).map((e) =>
        ({
            id: e.getFirstPropertyValue('uid'),
            title: parse(e.getFirstPropertyValue('summary')),
            description: parse(e.getFirstPropertyValue('description')),
            start_at: dayjs(e.getFirstPropertyValue('dtstart')).toISOString(),
            end_at: dayjs(e.getFirstPropertyValue('dtend')).toISOString(),
        })).sort((a, b) => dayjs(a.start_at).diff(dayjs(b.start_at)))
}, 'events')

export default function Events() {
    const events = createAsync(() => getEvents())

    return (
        <>
        <Nav clear={false}/>
        <div class="bg-white h-32 pointer-events-none"></div>
        <section class="bg-white w-full py-12 px-20">
            <h1 class="font-seasons text-7xl text-black font-bold mb-12 text-left">Upcoming Events</h1>

            <div class="flex flex-col gap-y-8">
                <For each={events()}>
                    {({id, title, description, start_at, end_at}) => (
                        <div class="flex text-black h-fit gap-4">
                            <div class="w-fit font-poppins text-center px-2 h-full">
                                <p class="text-red-100 font-bold uppercase text-lg">{dayjs(start_at).format('MMM')}</p>
                                <p class="text-2xl font-bold">{dayjs(start_at).format('DD')}</p>
                                <p class="text-blue-40 text-lg">{dayjs(start_at).format('ddd')}</p>
                            </div>
                            <div class="w-3/4 h-full">
                                <h1 class="text-3xl font-sans font-bold mb-4">{title}</h1>
                                <p class="mb-4 text-lg font-sans">{description}</p>
                                <p class="">{dayjs(start_at).format('MM/DD/YYYY hh:mm A')} - {dayjs(end_at).format('MM/DD/YYYY hh:mm A')}</p>
                            </div>
                        </div>
                    )}
                </For>
            </div>
        </section>
        <Highlights />
        <Footer />
        </>
    );
}
