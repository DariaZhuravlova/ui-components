import { FC, useRef, useState, useCallback, RefObject } from "react";
//components
import {TabItem} from "./TabItem"; 
import {TabsScrollableWrapper} from "./TabsScrollableWrapper";
import {TabsArrowsWrapper} from "./TabsArrowsWrapper";
import { TabsDropdownWrapper } from "./TabsDropdownWrapper"; 
//hooks
import {useContainerWidth} from "../../hooks/useContainerWidth";
import { useTabsVisibility } from "../../hooks/useTabsVisibility";
//types
import type {Tab} from "./Tabs";
//styles
import style from "./TabsItemList.module.scss";
import clsx from "clsx";


interface TabsItemListProps {
    items: Tab[];
    selectedIndex: number;
    onSelect: (index: number) => void;
    disabled?: boolean;
    variant?: "underline" | "underlineFilled";
    size?: "32" | "36" | "40";
    overflow?: "scrollable" | "arrows" | "dropdown";
    withPadding?: boolean;
    space?: "hug" | "stretch";
}

export const TabsItemList: FC<TabsItemListProps> = ({
    items,
    selectedIndex,
    onSelect,
    disabled = false,
    variant = "underline",
    size = "36",
    overflow = "scrollable",
    withPadding = false,
    space = "hug",
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const dropdownRef: RefObject<HTMLButtonElement | null> = useRef(null);
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const isDropdown = overflow === "dropdown";

    useContainerWidth(containerRef);
    const {hiddenTabs} = useTabsVisibility({
        items,
        containerRef,
        tabRefs,
        isDropdown,
    });

    const dropdownButtonWidth = dropdownRef.current?.offsetWidth || 40;
    const tabsContainerStyle = isDropdown
        ? {maxWidth: `calc(100% - ${dropdownButtonWidth}px)`}
        : {};

    const setTabRef = useCallback(
        (index: number) => (el: HTMLButtonElement | null) => {
            tabRefs.current[index] = el;
        },
        []
    );

    const renderTabs = useCallback(
        (tabs: {item: Tab; index: number}[]) =>
            tabs.map(({item, index}) => (
                <TabItem
                    key={index}
                    label={item.label}
                    badgeCount={item.badgeCount}
                    isActive={selectedIndex === index}
                    disabled={disabled}
                    variant={variant}
                    size={size}
                    onClick={() => onSelect(index)}
                    className={style.tabButton}
                    ref={setTabRef(index)}
                />
            )),
        [selectedIndex, disabled, variant, size, onSelect, setTabRef]
    );

    const visibleItems = isDropdown
        ? items
              .map((item, index) => ({item, index}))
              .filter(({index}) => !hiddenTabs.includes(index))
        : items.map((item, index) => ({item, index}));

    const dropdownItems = isDropdown
        ? items
              .map((item, index) => ({item, index}))
              .filter(({index}) => hiddenTabs.includes(index))
        : [];

    const wrapperClasses = clsx(style.tabsHeaderWrapper, {
        [style.withPadding]: withPadding,
        [style.spaceStretch]: space === "stretch",
        [style.spaceHug]: space === "hug",
    });

    return (
        <nav className={wrapperClasses}>
            {overflow === "dropdown" ? (
                <div
                    className={style.tabsList}
                    ref={containerRef}
                >
                    <div
                        className={style.tabsContainer}
                        style={tabsContainerStyle}
                    >
                        {renderTabs(visibleItems)}
                    </div>
                    <TabsDropdownWrapper
                        hiddenTabs={dropdownItems}
                        isOpen={isDropdownOpen}
                        toggleOpen={() => setDropdownOpen((prev) => !prev)}
                        onSelect={onSelect}
                        dropdownRef={dropdownRef}
                    />
                </div>
            ) : overflow === "arrows" ? (
                <TabsArrowsWrapper scrollRef={containerRef}>
                    {renderTabs(visibleItems)}
                </TabsArrowsWrapper>
            ) : (
                <TabsScrollableWrapper
                    overflow={overflow}
                    scrollRef={containerRef}
                >
                    {renderTabs(visibleItems)}
                </TabsScrollableWrapper>
            )}
            <div className={style.underlineLine} />
        </nav>
    );
};
