import {useState, useEffect, RefObject} from "react";

export const useContainerWidth = (ref: RefObject<HTMLElement | null>) => {
    const [width, setWidth] = useState<number>(0);

    useEffect(() => {
        const updateWidth = () => {
            if (ref.current) {
                const width = ref.current.getBoundingClientRect().width;
                setWidth(width);
            }
        };
        updateWidth();
        window.addEventListener("resize", updateWidth);

        return () => window.removeEventListener("resize", updateWidth);
    }, [ref]);

    return width;
};
