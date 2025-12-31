import Angle from "@/icons/angle.svg"

export default function Hero(props) {
    return (
        <>
        <section class="w-full relative bg-white">
            <img src="/images/hero.png" width={1916} height={1079} class="min-h-[50vh] object-cover" />
            <div class="w-px h-full to-blue-30/50 from-transparent from-75% bg-linear-to-b left-1/2 top-0 z-10 -translate-x-1/2 absolute"/>
            <div class="absolute inset-0 bg-black opacity-50"/>
            {(props.angles ?? true) && (<Angle class="absolute left-0 -bottom-px"/>)}
            {props.subtitle && (
                <div class="absolute top-1/2 left-1/2 -translate-1/2 w-fit flex flex-col">
                <span class="text-white text-3xl md:text-6xl z-20 font-serif uppercase whitespace-nowrap tracking-wide">{props.subtitle}</span>
                <div class="h-1 w-1/3 bg-red-100 mx-auto translate-y-2" />
            </div>
            )}
        </section>
        
        {/* Spacer */}
        <div class="bg-white h-12"/>
        </>
    )
}
