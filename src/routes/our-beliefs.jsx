import Nav from "@/components/nav"
import Hero from "@/components/hero"
import Footer from "@/components/footer"
import BackToTop from "@/components/back_to_top"
import { createAsync, query } from "@solidjs/router"

const getBeliefs = query(async () => {
    "use server"
    return [
        {
            title: "Scripture",
            content: "<b>We believe</b> all Scripture was given by inspiration of God (2 Timothy 3:16) and God has promised to preserve every jot and tittle of what He inspired. (Matthew 5:18) We hold to the Authorized Version (King James Bible) as the inerrant standard for English speaking people and believe we find within it the certainty of the words of truth. (Proverbs 22:20-21)",
        },
        {
            title: "Trinity",
            content: "<b>We believe</b> In one true God who is manifest in three eternal Persons: Father, Son, and Holy Spirit (1 John 5:7, Matthew 3:16-17 and 28:19).",
        },
        {
            title: "Holy Spirit",
            content: "<b>We believe</b> The Holy Spirit is fully God and the current, earthly manifestation of God through his indwelling of the believer in the Lord Jesus Christ (1 Corinthians 3:16, John 16:7). We believe that he seals the believer and baptizes (immerses) them into the Body of Christ at the moment of salvation (1 Corinthians 12:13) with the goal of teaching God’s Word and conforming the believer to the very image of Christ (Ephesians 1:3-14, 1 Corinthians 2:9-16, 2 Corinthians 3:17-18). We believe all spiritual blessings are received at the time of salvation (Ephesians 1:3) and that the Spirit gives gifts to every believer as he wills so the believer might effectively communicate the love of Christ (1 Corinthians 12-13, Ephesians 4:11-16).",
        },
        {
            title: "Satan",
            content: "<b>We believe</b> Satan is a real, historical being, a fallen cherub who was lifted up in pride and rebelled against God, leading an army of angelic beings with him (Isaiah 14:12-17). His defeat was sealed by the work of Christ on the cross (Hebrews 2:14). His final destiny is the lake of fire (Revelation 20:10).",
        },
        {
            title: "Adam and Eve",
            content: "<b>We believe</b> The Genesis account of creation is historical, not allegorical or figurative. We believe Adam was a historical person, created by the direct act of God and in his image (Genesis 1-2). Adam chose to sin against God through the free will God gave him and reaped the wages of death. As the originator of the human race, Adam passed his sinful nature to all mankind (Romans 5:12). All men are sinners by birth and become sinners in experience (Romans 3) for which the wages are death (Romans 6:23).",
        },
        {
            title: "Salvation",
            content: "<b>We believe</b> Salvation is by God’s grace alone on the basis of the finished work of Jesus Christ on the cross and in his resurrection, appropriated by the faith of anyone who will recognize that their sin separates them from God, turn from their sin to God by personally believing in their heart that Jesus is risen, and confess with their mouth that Jesus Christ is Lord (Ephesians 2:8-9, Romans 10:9-10, 13). We believe the act of salvation is just as definite and decisive as physical birth (John 3:1-7). We believe this salvation cannot be reversed or lost and that believers are kept by the power of God (John 10:28-29, 1 John 2:25, 1 John 5:11-13, Romans 8:35-39, 1 Peter 1:5).",
        },
        {
            title: "The Church",
            content: "<b>We believe</b> The local assembly of believers (local church) is God’s instrument in this age. While all genuine, born-again believers in Christ share an organic, family relationship, the overwhelming number of references of the word “church” in the Bible apply to a local, visible assembly of believers (Acts 14:23, Ephesians 1:22-23, 4:11-16, 1 Timothy 3:1-13). At the Second Coming of Christ, all genuine believers from the time of Christ’s ascension will be united together as the Body of Christ (1 Thessalonians 4:13-18, Revelation 19:7-8, 21:2). Until then, it is the responsibility of each local church to continue in evangelism, discipleship, and missions both independently and interdependently (Matthew 28:18-20). <br /> <b>We believe</b> Each local assembly should be as self-governing, self-supporting, and self-propagating as possible, practicing the ordinances of baptism and the Lord’s Supper and operating under the leadership of those who hold the office of pastor (also known as “bishop” or “elder”) and assisted by those who hold the office of deacon (Matthew 28:18-20, 1 Corinthians 11:23-34, 1 Timothy 3:1-13, 1 Peter 5:1-4, Hebrews 13:17). We believe every member of the local church has the responsibility to minister the Word of God and support the ministry through prayer, holy living, tithes, and offerings  (1 Corinthians 16:2, Malachi 3:10, Acts 2:41-47, 4:34-37, 13:1-4, 2 Corinthians 8:7).",
        },
        {
            title: "The Return of Christ",
            content: "<b>We believe</b> In the literal, physical return of Jesus Christ to the earth in power and great glory to judge the world and reign (Acts 1:11, 2 Thessalonians 1:7-10). We believe that shortly before Christ’s Second Coming, all genuine believers will be raptured out to meet the Lord in the air (1 Thessalonians 4:13-18, 1 Corinthians 15:51-52) followed by a seven-year period of tribulation on earth during which time God will judge his people Israel and all without Christ (1 Thessalonians 1:10, 5:1-11, Matthew 24). That period of tribulation will be ended by Christ’s personal return to rule for one thousand years (Revelation 20:1-6, Matthew 25:31-46).",
        },
        {
            title: "Judgment",
            content: "<b>We believe</b> We believe all men will spend eternity either with Christ or eternally separated from him. We believe the lost who die wait in a literal Hell for the day of final judgment after which they will be punished in a literal lake of fire (Revelation 20:11-15). We believe those who have accepted Christ as Savior will experience a bodily resurrection to everlasting life (1 Thessalonians 4:13-18, 1 Corinthians 15:51-58).",
        },

    ]
})


export default function OurBeliefs() {
    const beliefs = createAsync(() => getBeliefs())

    return (
    <>
        <Nav />
        <Hero angles={false} subtitle="What we Believe" />
        <section class="w-full bg-white flex pt-12 justify-end">
            <div class="w-5/6 md:w-3/4 bg-[#E9EAEC] pl-4 md:pl-8 pt-4 md:pt-8 flex flex-col gap-10 pr-10">

                <For each={beliefs()}>
                    {({title, content}, idx) => (
                        <div class="relative last:mb-10">
                            <span class="font-poppins absolute -left-14 md:-left-24 text-blue-30 text-4xl font-bold mt-2">{idx()+1}.</span>
                            <h1 class="text-black font-serif text-4xl md:text-5xl mb-4 tracking-wide">{title}</h1>
                            <p class="text-black/75 leading-relaxed text-base md:text-lg" innerHTML={content} />
                        </div>
                    )}
                </For>
            </div>
        </section>
        <Footer />
        <BackToTop />
    </>
  );
}
