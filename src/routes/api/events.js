import ICAL from "ical.js"
import dayjs from "dayjs"
import isSameOrAfter from "dayjs/plugin/isSameOrAfter"

dayjs.extend(isSameOrAfter)

const parseText = (text) =>
    text
        ?.replaceAll("&amp;", "&")

const getResponseLogDetails = async (response) => {
    const headers = Object.fromEntries(response.headers.entries())
    let body = null

    try {
        body = await response.clone().text()
    } catch (error) {
        body = `[unreadable response body: ${error instanceof Error ? error.message : String(error)}]`
    }

    return {
        url: response.url,
        status: response.status,
        statusText: response.statusText,
        redirected: response.redirected,
        headers,
        body: body?.slice(0, 4000),
    }
}

const getRequestLogDetails = (url, headers) => ({
    url,
    headers,
})

const getEnv = () =>
    (typeof process !== "undefined" && process.env)
        ? process.env
        : import.meta.env

export const GET = async () => {
    try {
        const env = getEnv()
        const feedUrl = env.CHURCHTRAC_CALENDAR_FEED

        if (!feedUrl) {
            return new Response(JSON.stringify({ error: "Missing CHURCHTRAC_CALENDAR_FEED" }), {
                status: 500,
                headers: { "content-type": "application/json" },
            })
        }

        const requestHeaders = {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
            "Accept": "text/calendar,text/plain,application/xml,text/html;q=0.9,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9",
            "Referer": "https://www.churchtrac.com/",
        }

        const response = await fetch(feedUrl, {
            headers: requestHeaders,
            redirect: "follow",
            cache: "no-store",
        })

        if (!response.ok) {
            console.error("Events API calendar fetch failed", {
                request: getRequestLogDetails(feedUrl, requestHeaders),
                response: await getResponseLogDetails(response),
            })
            return new Response(JSON.stringify({ error: "Failed to fetch calendar" }), {
                status: 502,
                headers: { "content-type": "application/json" },
            })
        }

        const stream = await response.text()
        const events = (new ICAL.Component(ICAL.parse(stream)).getAllSubcomponents("vevent"))
            .map((e) => ({
                id: e.getFirstPropertyValue("uid"),
                title: parseText(e.getFirstPropertyValue("summary")),
                description: parseText(e.getFirstPropertyValue("description")),
                start_at: dayjs(e.getFirstPropertyValue("dtstart")).toISOString(),
                end_at: dayjs(e.getFirstPropertyValue("dtend")).toISOString(),
            }))
            .filter((event) => dayjs(event.end_at).isSameOrAfter(dayjs()))
            .sort((a, b) => dayjs(a.start_at).diff(dayjs(b.start_at)))

        return new Response(JSON.stringify(events), {
            headers: {
                "content-type": "application/json",
                "cache-control": "no-store",
            },
        })
    } catch (error) {
        console.error("Events API fatal error", error)

        return new Response(JSON.stringify({ error: "Failed to load events" }), {
            status: 500,
            headers: { "content-type": "application/json" },
        })
    }
}
