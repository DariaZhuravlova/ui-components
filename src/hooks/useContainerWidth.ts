import {useState, useEffect, RefObject} from "react";

export const useContainerWidth = (ref: RefObject<HTMLElement | null>) => {
    const [width, setWidth] = useState<number>(0);

    useEffect(() => {
        const updateWidth = () => {
            if (ref.current) {
                setWidth(ref.current.clientWidth);
            }
        };

        updateWidth(); // Инициализируем сразу

        const handleResize = () => {
            // Используем requestAnimationFrame для оптимизации производительности
            requestAnimationFrame(updateWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [ref]);

    return width;
};
