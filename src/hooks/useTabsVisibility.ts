import {useState, useCallback, useEffect, RefObject} from "react";
import {useContainerWidth} from "./useContainerWidth";
import {Tab} from "../ui/tabs/Tabs";

interface UseTabsVisibilityProps {
    items: Tab[];
    containerRef: RefObject<HTMLDivElement | null>;
    tabRefs: RefObject<(HTMLButtonElement | null)[]>;
    isDropdown: boolean;
}

interface UseTabsVisibilityResult {
    hiddenTabs: number[];
}

export const useTabsVisibility = ({
    items,
    containerRef,
    tabRefs,
    isDropdown,
}: UseTabsVisibilityProps): UseTabsVisibilityResult => {
    const [hiddenTabs, setHiddenTabs] = useState<number[]>([]);
    const containerWidth = useContainerWidth(containerRef);

    const updateHiddenTabs = useCallback(() => {
        if (!isDropdown || !containerWidth || !containerRef.current || !tabRefs.current) {
            setHiddenTabs([]);
            return;
        }

        // Проверяем, что все табы отрендерены
        if (tabRefs.current.length !== items.length) {
            setTimeout(updateHiddenTabs, 0);
            return;
        }

        const dropdownButtonWidth = 40; // Ширина кнопки дропдауна
        const availableWidth = containerWidth - dropdownButtonWidth;

        let totalWidth = 0;
        const hidden: number[] = [];

        tabRefs.current.forEach((tab, index) => {
            if (!tab) return;
            const tabWidth = tab.clientWidth;
            totalWidth += tabWidth;

            if (totalWidth > availableWidth) {
                hidden.push(index);
            }
        });

        // Обновляем состояние только если список скрытых вкладок изменился
        if (!arraysEqual(hidden, hiddenTabs)) {
            setHiddenTabs(hidden);
        }
    }, [isDropdown, containerWidth, tabRefs, items.length]);

    useEffect(() => {
        updateHiddenTabs();
    }, [updateHiddenTabs, items]); // Зависимость только от updateHiddenTabs и items

    return {
        hiddenTabs,
    };
};

// Утилита для сравнения массивов
function arraysEqual(a: number[], b: number[]): boolean {
    return a.length === b.length && a.every((value, index) => value === b[index]);
}

