import Nav from "@/components/nav"
import Hero from "@/components/hero"
import Footer from "@/components/footer"
import BackToTop from "@/components/back_to_top"
import { A, query, createAsync } from "@solidjs/router"
import { For, createSignal } from "solid-js"

const getTeam = query(async () => {
    "use server"
    const team = [
        { name: "Travis Reynolds", email: "travis@ellisbc.org", image: "https://placehold.co/600x750" },
        { name: "Sarah Reynolds", email: "sarah@ellisbc.org", image: "https://placehold.co/600x750" },
        { name: "Joseph Raub", email: "joseph@ellisbc.org", image: "https://placehold.co/600x750" },
        { name: "Abby Raub", email: "abby@ellisbc.org", image: "https://placehold.co/600x750" },
        { name: "Brian Raub", email: "brian@ellisbc.org", image: "https://placehold.co/600x750" },
        { name: "Mark Polifka", email: "mark@ellisbc.org", image: "https://placehold.co/600x750" },
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
            class="font-serif text-2xl text-blue-100 hover:text-red-100 underline-offset-4"
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
            <section class="w-full px-8 md:px-16 py-12 md:py-16 flex bg-white">
                    <div class="grid grid-cols-3 w-full gap-6 p-2 min-h-fit">
                        <For each={team()}>
                            {({ name, emailCodes, image }) => (
                                <div class="bg-white aspect-5/4 mb-8">
                                    <div class="w-full mb-4 overflow-hidden">
                                        <img src={image} alt={name} class="w-full h-full object-cover" />
                                    </div>
                                    <ObfuscatedEmailLink name={name} emailCodes={emailCodes} />
                                </div>
                            )}
                        </For>
                    </div>
            </section>
            <Footer />
            <BackToTop />
        </>
    )
}
