import { createMemo } from "solid-js";
import { useScreenSize } from "@/hooks/useScreenSize";

/**
 * A helper to provide values based on the screen size.
 *
 * @param {Object} values
 * @param {any} defaultValue
 * @param {Object} breakpoints - defaults to tailwind style breakpoints 3xs - 5xl
 */
export default function useBreakpoints(values, defaultValue, breakpoints = null) {
    const size = useScreenSize();

    const _breakpoints = createMemo(() => {
        return Object.entries(
            breakpoints ?? {
                "3xs": 256,
                "2xs": 320,
                xs: 480,
                sm: 640,
                md: 768,
                lg: 1024,
                xl: 1280,
                "2xl": 1536,
                "3xl": 1920,
                "4xl": 2560,
                "5xl": 3840,
            }
        ).sort((a, b) => a[1] - b[1]);
    });

    const value = createMemo(() => {
        const w = size.width();
        if (!w) return defaultValue;

        const bp = _breakpoints();
        for (let i = bp.length - 1; i >= 0; i--) {
            const [key, minWidth] = bp[i];
            if (w >= minWidth && values[key] !== undefined) {
                return values[key];
            }
        }

        return defaultValue;
    });

    return value;
}
