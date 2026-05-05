import { createSignal, onMount, onCleanup } from "solid-js";

export function useScreenSize() {
    const [width, setWidth] = createSignal(null);
    const [height, setHeight] = createSignal(null);
    const [density, setDensity] = createSignal(null);
    const [landscape, setLandscape] = createSignal(null);

    const update = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
        setDensity(window.devicePixelRatio);
        setLandscape(
            window.screen.orientation?.type?.includes("landscape") ?? window.innerWidth > window.innerHeight
        );
    };

    onMount(() => {
        update();
        window.addEventListener("resize", update);
        onCleanup(() => window.removeEventListener("resize", update));
    });


    return { width, height, density, landscape };
}
