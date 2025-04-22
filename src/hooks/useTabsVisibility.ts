import {useState, useCallback, useEffect, RefObject} from "react";
import {useContainerWidth} from "./useContainerWidth";
import {TabItem} from "../ui/tabs/Tabs";

interface UseTabsVisibilityProps {
    items: TabItem[];
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
            requestAnimationFrame(() => updateHiddenTabs());
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

        setHiddenTabs(hidden);
    }, [isDropdown, containerWidth, containerRef, tabRefs, items.length]);

    useEffect(() => {
        updateHiddenTabs();
    }, [updateHiddenTabs, items]);

    return {
        hiddenTabs,
    };
};
