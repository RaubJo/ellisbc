import Footer from "@/components/footer"
import Nav from "@/components/nav"
import { createEffect, createSignal, For, onMount, Show } from "solid-js"

// Server action to fetch page title
async function fetchPageTitle(url) {
    "use server"
    try {
        const response = await fetch(url)
        const html = await response.text()
        const match = html.match(/<title[^>]*>([^<]+)<\/title>/i)
        return match?.[1]?.trim() || null
    } catch {
        return null
    }
}

// External link icon component
const ExternalLinkIcon = () => (
    <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
)

// Component for a link (styled as chip)
const LinkChip = (props) => {
    const [title, setTitle] = createSignal(null)

    const fallbackText = () => {
        try {
            return new URL(props.href).hostname.replace('www.', '')
        } catch {
            return props.href
        }
    }

    onMount(async () => {
        const fetchedTitle = await fetchPageTitle(props.href)
        if (fetchedTitle) setTitle(fetchedTitle)
    })

    return (
        <a
            href={props.href}
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100/10 text-blue-100 rounded-full text-base hover:bg-blue-100/20 transition-colors"
            onClick={(e) => e.stopPropagation()}
        >
            <span class="truncate max-w-[200px]">{title() || fallbackText()}</span>
            <ExternalLinkIcon />
        </a>
    )
}

// Format date to readable string
const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

// Format duration from ISO 8601 (PT1H2M3S) to readable format
const formatDuration = (duration) => {
    if (!duration) return null
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
    if (!match) return null
    const hours = match[1] ? parseInt(match[1]) : 0
    const minutes = match[2] ? parseInt(match[2]) : 0
    const seconds = match[3] ? parseInt(match[3]) : 0

    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

// Convert URLs in text to clickable links
const linkifyText = (text) => {
    if (!text) return null
    const urlRegex = /(https?:\/\/[^\s]+)/g
    const parts = text.split(urlRegex)

    return parts.map((part) => {
        if (part.match(urlRegex)) {
            return <LinkChip href={part} />
        }
        return part
    })
}

const fetchWatchData = async () => {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000)

    try {
        const response = await fetch('/api/watch', {
            method: 'GET',
            cache: 'no-store',
            signal: controller.signal
        })

        if (!response.ok) throw new Error(`Watch API returned ${response.status}`)

        const data = await response.json()
        return {
            videos: Array.isArray(data?.videos) ? data.videos : [],
            liveStream: data?.liveStream ?? null
        }
    } catch (error) {
        console.error("Failed to load watch data", error)
        return { videos: [], liveStream: null }
    } finally {
        clearTimeout(timeout)
    }
}

export default function Watch() {
    const [videos, setVideos] = createSignal(null)
    const [liveStream, setLiveStream] = createSignal(null)
    const [active, setActive] = createSignal(null)
    const [isLive, setIsLive] = createSignal(true)
    const [sidebarScrolled, setSidebarScrolled] = createSignal(false)
    const [shouldAutoplay, setShouldAutoplay] = createSignal(false)
    const [descriptionExpanded, setDescriptionExpanded] = createSignal(false)

    onMount(async () => {
        const data = await fetchWatchData()
        setVideos(data.videos)
        setLiveStream(data.liveStream)
    })

    // Set initial active video to live stream when it loads
    createEffect(() => {
        if (liveStream() && !active()) {
            setActive(liveStream())
            setIsLive(true)
        } else if (videos() && videos().length > 0 && !active() && !liveStream()) {
            setActive(videos()[0])
            setIsLive(false)
        }
    })

    const selectLiveStream = () => {
        setActive(liveStream())
        setIsLive(true)
        setShouldAutoplay(true)
    }

    // Get video ID based on whether it's a live stream or regular video
    const getVideoId = () => {
        if (isLive()) {
            return active()?.id?.videoId
        }
        return active()?.contentDetails?.videoId
    }

    const VideoSkeleton = () => (
        <div class="animate-pulse">
            <div class="aspect-video w-full bg-gray-300" />
            <div class="h-8 bg-gray-300 rounded mt-6 w-3/4" />
            <div class="h-4 bg-gray-200 rounded mt-4 w-full" />
            <div class="h-4 bg-gray-200 rounded mt-2 w-5/6" />
        </div>
    )

    const SidebarSkeleton = () => (
        <div class="animate-pulse flex flex-col gap-6">
            <For each={[1, 2, 3, 4]}>
                {() => (
                    <div>
                        <div class="aspect-video w-full bg-gray-300" />
                        <div class="h-6 bg-gray-300 rounded mt-2 w-3/4" />
                        <div class="h-4 bg-gray-200 rounded mt-1 w-full" />
                    </div>
                )}
            </For>
        </div>
    )

    return (
        <>
        <Nav clear={false}/>
        <div class="bg-white h-32 pointer-events-none"></div>
        <section class="bg-white w-full text-blue-100 flex flex-col lg:flex-row lg:max-h-screen">
            <div class="w-full lg:w-2/3 p-6 lg:p-10">
                <Show
                    when={active()}
                    fallback={
                        videos() === null
                            ? <VideoSkeleton />
                            : <p class="font-sans text-lg text-gray-500">No videos are available right now.</p>
                    }
                >
                    <div key={active()?.id}>
                        <div class="aspect-video w-full">
                            <iframe
                                src={`https://www.youtube.com/embed/${getVideoId()}?rel=0${shouldAutoplay() ? '&autoplay=1' : ''}`}
                                title={active()?.snippet?.title}
                                class="w-full h-full border-0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen
                            />
                        </div>
                        <div class="mt-6 border-b border-gray-200 pb-4">
                            <h1 class="font-serif font-bold text-3xl lg:text-4xl">{active()?.snippet?.title}</h1>
                            <p class="font-sans text-gray-500 mt-2">
                                {formatDate(active()?.snippet?.publishedAt)}
                                <Show when={active()?.duration}>
                                    <span class="mx-2">•</span>
                                    {formatDuration(active()?.duration)}
                                </Show>
                            </p>
                        </div>
                        <div class="mt-4">
                            <div class={`font-sans text-lg whitespace-pre-line overflow-hidden transition-all ${descriptionExpanded() ? '' : 'max-h-32'}`}>
                                {linkifyText(active()?.snippet?.description)}
                            </div>
                            <Show when={active()?.snippet?.description?.length > 200}>
                                <button
                                    class="mt-2 text-blue-100 font-medium hover:underline cursor-pointer"
                                    onClick={() => setDescriptionExpanded(!descriptionExpanded())}
                                >
                                    {descriptionExpanded() ? 'Show less' : 'Show more'}
                                </button>
                            </Show>
                        </div>
                    </div>
                </Show>
            </div>
            <div class="w-full lg:w-1/3 bg-[#E9EAEC] flex flex-col lg:max-h-screen pt-6 lg:pt-10">
                <div class={`px-6 pb-4 bg-[#E9EAEC] sticky top-0 z-10 transition-shadow [clip-path:inset(0_0_-10px_0)] ${sidebarScrolled() ? 'shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]' : ''}`}>
                    <button
                        class="bg-blue-100 uppercase text-white w-full px-6 py-3 cursor-pointer hover:bg-blue-100/80 transition-colors select-none"
                        onClick={selectLiveStream}
                        disabled={!liveStream()}
                    >
                        {liveStream() ? "Watch Live" : videos() === null ? "Loading..." : "No Live Stream"}
                    </button>
                </div>
                <div class="flex-col flex gap-6 overflow-y-scroll px-6 pb-6 pt-8" onScroll={(e) => setSidebarScrolled(e.target.scrollTop > 0)}>
                    <Show when={videos()} fallback={<SidebarSkeleton />}>
                        <For each={videos()?.filter(v => v.contentDetails?.videoId !== liveStream()?.id?.videoId && v.snippet?.title !== "Ellis Baptist Church Live Stream")}>
                            {(video) => {
                                const image = video.snippet.thumbnails.medium
                                const isActive = () => !isLive() && active()?.contentDetails?.videoId === video.contentDetails?.videoId

                                return (
                                    <div
                                        key={video.id}
                                        class={`cursor-pointer transition-all ${isActive() ? 'ring-2 ring-blue-100 rounded-xs p-2 -m-2 bg-white/50' : 'hover:opacity-80'}`}
                                        onClick={() => {
                                            setActive(video)
                                            setIsLive(false)
                                            setShouldAutoplay(true)
                                            window.scrollTo({ top: 0, behavior: 'smooth' })
                                        }}
                                    >
                                        <div class="relative">
                                            <img src={image.url} width={image.width} height={image.height} class="w-full rounded-xs" />
                                            <Show when={video.duration}>
                                                <span class="absolute bottom-2 right-2 bg-black/80 text-white text-sm px-1.5 py-0.5 rounded">
                                                    {formatDuration(video.duration)}
                                                </span>
                                            </Show>
                                        </div>
                                        <p class="font-serif font-bold text-2xl mt-2">{video.snippet.title}</p>
                                        <p class="font-sans text-sm text-gray-500 mt-1">{formatDate(video.snippet.publishedAt)}</p>
                                        <p class="font-sans text-lg mt-1 line-clamp-2">{video.snippet.description}</p>
                                    </div>
                                )
                            }}
                        </For>
                    </Show>
                </div>
            </div>
        </section>
        <Footer />
        </>
    );
}
