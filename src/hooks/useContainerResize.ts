import {useEffect} from "react";

export const useContainerResize = (
    ref: React.RefObject<HTMLElement | null>,
    callback: () => void
) => {
    useEffect(() => {
        if (!ref.current) return;

        const observer = new ResizeObserver(() => {
            requestAnimationFrame(callback); // <<< Ждём полный рендер
        });

        observer.observe(ref.current);

        return () => observer.disconnect();
    }, [ref, callback]);
};
