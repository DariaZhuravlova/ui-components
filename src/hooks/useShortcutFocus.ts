import {useRef} from "react";
import {useShortcut} from "./useShortcut";

/**
 * Хук для фокусировки на инпуте по нажатию Cmd+K / Ctrl+K
 * @returns ref для привязки к инпуту
 */
export const useShortcutFocus = () => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    useShortcut(
        (event) => {
            const isMac = navigator.userAgent.toLowerCase().includes("mac");
            const isWindows = navigator.userAgent.toLowerCase().includes("win");

            return (
                (isMac && event.metaKey && event.key.toLowerCase() === "k") ||
                (isWindows && event.ctrlKey && event.key.toLowerCase() === "k")
            );
        },
        () => inputRef.current?.focus()
    );

    return inputRef;
};
