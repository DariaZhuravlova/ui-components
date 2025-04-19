import {useEffect} from "react";

/**
 * Хук для обработки нажатия горячих клавиш
 * @param keyCombo Функция, проверяющая, нажата ли нужная комбинация
 * @param callback Функция, выполняемая при совпадении
 */
export const useShortcut = (keyCombo: (event: KeyboardEvent) => boolean, callback: () => void) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (keyCombo(event)) {
                event.preventDefault();
                callback();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [keyCombo, callback]);
};
