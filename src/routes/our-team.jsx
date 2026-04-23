import Nav from "@/components/nav"
import Hero from "@/components/hero"
import Footer from "@/components/footer"
import BackToTop from "@/components/back_to_top"
import { A, query, createAsync } from "@solidjs/router"
import { For, createSignal } from "solid-js"
import Highlights from "@/components/highlights"

const getTeam = query(async () => {
    "use server"
    const team = [
        { name: "Travis Reynolds", email: "travis@ellisbc.org", image: "/images/staff/travis.jpg" },
        { name: "Sarah Reynolds", email: "sarah@ellisbc.org", image: "/images/staff/sarah.jpg" },
        { name: "Joseph Raub", email: "joseph@ellisbc.org", image: "/images/staff/joseph.jpg" },
        { name: "Abby Raub", email: "abby@ellisbc.org", image: "/images/staff/abigail.jpg" },
        { name: "Brian Raub", email: "brian@ellisbc.org", image: "/images/staff/brian.jpg" },
        { name: "Mark Polifka", email: "mark@ellisbc.org", image: "/images/staff/mark.jpg" },
    ]

    return team.map((member) => ({
        name: member.name,
        image: member.image,
        emailCodes: Array.from(member.email, (char) => char.charCodeAt(0)),
    }))
}, "team")

function ObfuscatedEmailLink(props) {
    const [href, setHref] = createSignal("#")
    const [revealed, setRevealed] = createSignal(false)

    const decodeEmail = () =>
        String.fromCharCode(...props.emailCodes)

    const handleClick = (event) => {
        if (!revealed()) {
            event.preventDefault()
            const email = decodeEmail()
            setHref(`mailto:${email}`)
            setRevealed(true)
            window.location.href = `mailto:${email}`
        }
    }

    return (
        <A
            class="block text-left font-sans text-3xl text-blue-100 hover:text-red-100 underline-offset-4"
            href={href()}
            aria-label={`Email ${props.name}`}
            onClick={handleClick}
        >
            {props.name}
        </A>
    )
}

export default function OurTeam() {
    const team = createAsync(() => getTeam())

    return (
        <>
            <Nav />
            <Hero angles={false} subtitle="Our Team" />
            <section class="w-full px-5 sm:px-8 md:px-16 py-10 md:py-16 flex">
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-6 sm:gap-8 p-2 min-h-fit">
                    <For each={team()}>
                        {({ name, emailCodes, image }) => (
                            <div class="bg-white mb-6 sm:mb-8 flex flex-col w-full">
                                <div className="mx-auto w-4/5 sm:w-full">
                                    <div class="mb-4 overflow-hidden aspect-4/5">
                                        <img src={image} alt={name} class="w-full h-full object-cover" />
                                    </div>
                                    <ObfuscatedEmailLink name={name} emailCodes={emailCodes} />
                                </div>
                            </div>
                        )}
                    </For>
                </div>
            </section>
            <Highlights />
            <Footer />
            <BackToTop />
        </>
    )
}
