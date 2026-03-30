import Nav from "@/components/nav"
import Hero from "@/components/hero"
import Footer from "@/components/footer"
import BackToTop from "@/components/back_to_top"
import { query, createAsync } from "@solidjs/router"
import Highlights from "@/components/highlights"
import ServiceTimes from "@/components/service_times"

const getMission = query(async () => {
    "use server"
    return [
        {
            title: "Abide in Christ",
            content: "Dwelling in Christ’s presence and inviting others into a life-changing relationship with Him.",
            background: 'bg-blue-40',
        },
        {
            title: "Fulfill His Word",
            content: "Growing into Christ’s likeness by learning and living the Scriptures, and discipling others to do the same.",
            background: 'bg-blue-80',
        },
        {
            title: "Proclaim His glory",
            content: "Passionately praising God’s work in our lives, and proclaiming the gospel to further his kingdom.",
            background: 'bg-blue-100',
        },
    ]

})

export default function WhoWeAre() {
    const mission = createAsync(() => getMission())

    return (
    <>
        <Nav />
        <Hero angles={false} subtitle="Who We Are" />
        <section class="w-full bg-white flex flex-col pt-12 px-10 text-black pb-12">
            <h1 class="text-6xl font-serif font-bold mb-8">Who we Are</h1>
            <p class="text-xl font-sans mb-4">
                At Ellis Baptist Church, our mission is to be a soul winning, disciple making, leadership equipping, church planting church. We desire to see lives transformed by the gospel of Jesus Christ and to see every believer strengthened in their walk with Him.
            </p>
            <p class="text-xl font-sans mb-4">
                We believe that discipleship is the heartbeat of the church. It begins with intentional, one-on-one relationships and extends into every part of our life together. We believe that this will result in a church family united around the truth of God’s Word and a shared mission: reaching the world with the Gospel.
            </p>
            <p class="text-xl font-sans mb-4">
                Our goal is to cultivate true worshippers.  Our mission can be summarized with three main goals for every member and every ministry.
            </p>
            <ul class="text-xl font-sans mb-4 list-disc ml-6">
                <li>Abide in Christ</li>
                <li>Fulfill His Word</li>
                <li>Proclaim His Glory</li>
            </ul>
            <p class="text-xl font-sans mb-4">
                We strive to keep the Scriptures at the center of our church, our homes, and our individual lives. We grow and serve together so that God can use us to build His kingdom, starting here in Ellis and continuing around the world.
            </p>
            <p class="text-xl font-sans mb-4">
                Because discipleship is at the heart of what we do, we are deeply committed to the next generation. We partner with families to help parents raise up the next generation of disciples who will love and serve Christ.
            </p>
        </section>

        <section id="what-to-expect" class="w-full bg-white flex flex-col pt-12 px-10 text-black pb-12 scroll-mt-24">
            <h1 class="text-6xl font-serif font-bold mb-8">What to Expect</h1>
            <p class="text-xl font-sans mb-4">
                We know visiting a new church can be intimidating.  At EBC, our goal is to keep the main thing the main thing: focusing on worshipping God and learning His word.
            </p>

            <p class="text-xl font-sans mb-4">
                Our purpose in gathering is to worship God and study the Bible in a way that leads to a deeper, personal relationship with Him.  Whether it is through music or preaching, we strive to keep the Scriptures at the center of everything we do.
            </p>

            <p class="text-xl font-sans mb-4">
                From the moment you arrive, we want you to feel at home.  You’ll be greeted at the front doors by friendly faces who can help you find your way around. And there is always a fresh, hot cup of coffee for everyone.
            </p>

            <p class="text-xl font-sans mb-4">
                Whether you are new to church, just visiting the area, or looking for a permanent church home, we would love to meet you.  We want you to feel comfortable coming just as you are and we hope that EBC will be a place where you can meet with the Lord and be encouraged in fellowship.
            </p>
        </section>

        {/* @todo Create a services times component */}

        <Highlights />
        <Footer />
        <BackToTop />
    </>
  );
}
