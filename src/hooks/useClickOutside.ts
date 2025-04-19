import {RefObject, useEffect} from "react";

export const useClickOutside = (
    ref: RefObject<HTMLDivElement | null>,
    clickHandler: () => void
) => {
    const handleClickOutside = (event: Event) => {
        if (ref?.current && !ref?.current.contains(event.target as Node)) clickHandler();
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);

        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, []);
};
