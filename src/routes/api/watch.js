const channelId = "UCC-6R8UcZrj5tNfIP8UbtSw"
const uploadsPlaylistId = channelId.replace("UC", "UU")
const youtubeApiBase = "https://www.googleapis.com/youtube/v3"

const getEnv = () =>
    (typeof process !== "undefined" && process.env)
        ? process.env
        : import.meta.env

const getApiKey = (env) =>
    env.YOUTUBE_API_KEY || env.GOOGLE_API_KEY || env.YOUTUBE_DATA_API_KEY || null

function withTimeout(promise, ms, label) {
    let timer
    const timeout = new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms)
    })

    return Promise.race([promise, timeout]).finally(() => clearTimeout(timer))
}

async function fetchYouTube(endpoint, params, apiKey) {
    const url = new URL(`${youtubeApiBase}/${endpoint}`)
    url.searchParams.set("key", apiKey)

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            url.searchParams.set(key, String(value))
        }
    })

    const response = await withTimeout(
        fetch(url.toString(), {
            method: "GET",
            headers: {
                "accept": "application/json"
            },
            cache: "no-store"
        }),
        8000,
        `YouTube ${endpoint}`
    )

    if (!response.ok) {
        const body = await response.text().catch(() => "")
        throw new Error(`YouTube ${endpoint} failed: ${response.status} ${body.slice(0, 160)}`)
    }

    return response.json()
}

async function getVideos(apiKey) {
    try {
        const playlistResponse = await fetchYouTube("playlistItems", {
            part: "snippet,contentDetails",
            playlistId: uploadsPlaylistId,
            maxResults: 50
        }, apiKey)

        const items = playlistResponse.items ?? []
        if (items.length === 0) return []

        const videoIds = [...new Set(items
            .map((item) => item?.contentDetails?.videoId)
            .filter(Boolean))]

        if (videoIds.length === 0) return []

        const detailsResponse = await fetchYouTube("videos", {
            part: "contentDetails",
            id: videoIds.join(",")
        }, apiKey)

        const durationMap = {}
        ;(detailsResponse.items ?? []).forEach((video) => {
            durationMap[video.id] = video?.contentDetails?.duration ?? null
        })

        return items.map((item) => ({
            ...item,
            duration: durationMap[item?.contentDetails?.videoId] ?? null
        }))
    } catch (error) {
        console.error("Failed to load YouTube videos", error)
        return []
    }
}

async function getLiveStream(apiKey) {
    try {
        const response = await fetchYouTube("search", {
            part: "snippet",
            channelId,
            eventType: "live",
            type: "video",
            maxResults: 1
        }, apiKey)

        return response.items?.[0] ?? null
    } catch (error) {
        console.error("Failed to load YouTube livestream", error)
        return null
    }
}

export const GET = async () => {
    const env = getEnv()
    const apiKey = getApiKey(env)

    if (!apiKey) {
        console.error("Watch API missing YouTube API key (expected YOUTUBE_API_KEY)")
        return new Response(JSON.stringify({ videos: [], liveStream: null }), {
            headers: {
                "content-type": "application/json",
                "cache-control": "no-store"
            }
        })
    }

    try {
        const [videos, liveStream] = await withTimeout(
            Promise.all([getVideos(apiKey), getLiveStream(apiKey)]),
            9000,
            "Watch API"
        )

        return new Response(JSON.stringify({ videos, liveStream }), {
            headers: {
                "content-type": "application/json",
                "cache-control": "no-store"
            }
        })
    } catch (error) {
        console.error("Watch API fatal error", error)
        return new Response(JSON.stringify({ videos: [], liveStream: null }), {
            headers: {
                "content-type": "application/json",
                "cache-control": "no-store"
            }
        })
    }
}
