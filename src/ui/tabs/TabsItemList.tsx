import { FC, useEffect, useRef, useState, useCallback, useLayoutEffect } from "react";
// components
import {TabItem} from "./Tabs";
import {TabsItem} from "./TabsItem";
import {TabsScrollableWrapper} from "./TabsScrollableWrapper";
import { Dropdown } from "../../ui/select/Dropdown";
// hooks
import { useContainerResize } from "../../hooks/useContainerResize";
// assets
import dotsVertical from "../../assets/svg/icons/dotsVertical.svg";
// styles
import style from "./TabsItemList.module.scss";
import clsx from "clsx";

interface TabsItemListProps {
    items: TabItem[];
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
    const [hiddenTabs, setHiddenTabs] = useState<number[]>([]);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const resizeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const retryCountRef = useRef(0); // Для подсчета попыток пересчета

    const isDropdown = overflow === "dropdown";

    const updateHiddenTabs = useCallback(() => {
        if (!containerRef.current || !isDropdown) return;

        const container = containerRef.current;
        const children = Array.from(
            container.querySelectorAll("._tabButton_1mmsw_1")
        ) as HTMLElement[];

        if (!children.length) {
            console.log("No tabs found in container");
            return;
        }

        // Если найдено меньше вкладок, чем ожидается, повторяем попытку
        if (children.length !== items.length) {
            console.log(`Mismatch: Found ${children.length} tabs, expected ${items.length}`);
            if (retryCountRef.current < 5) {
                // Ограничиваем количество попыток
                retryCountRef.current += 1;
                requestAnimationFrame(() => updateHiddenTabs());
            }
            return;
        }

        const containerWidth = container.clientWidth;
        const dropdownButtonWidth = 40;
        const availableWidth = containerWidth - dropdownButtonWidth;

        let totalWidth = 0;
        const hidden: number[] = [];

        children.forEach((child, index) => {
            const childWidth = child.clientWidth;
            const nextTotalWidth = totalWidth + childWidth;

            if (totalWidth >= availableWidth || nextTotalWidth > availableWidth) {
                hidden.push(index);
            }

            totalWidth = nextTotalWidth;
        });

        console.log(
            "Container width:",
            containerWidth,
            "Available width:",
            availableWidth,
            "Total width:",
            totalWidth,
            "Number of tabs:",
            children.length,
            "Hidden tabs:",
            hidden
        );

        setHiddenTabs((prevHiddenTabs) => {
            if (containerWidth === 0 || totalWidth === 0) {
                return prevHiddenTabs;
            }
            return hidden;
        });

        setIsReady(true);
        retryCountRef.current = 0; // Сбрасываем счетчик попыток
    }, [isDropdown, items.length]);

    useContainerResize(containerRef, () => {
        if (resizeTimeoutRef.current) {
            clearTimeout(resizeTimeoutRef.current);
        }
        resizeTimeoutRef.current = setTimeout(() => {
            updateHiddenTabs();
        }, 100);
    });

    useLayoutEffect(() => {
        setIsReady(false);
        requestAnimationFrame(() => {
            updateHiddenTabs();
        });

        return () => {
            if (resizeTimeoutRef.current) {
                clearTimeout(resizeTimeoutRef.current);
            }
        };
    }, [items, selectedIndex, updateHiddenTabs]);

    const renderTabs = useCallback(
        (tabs: {item: TabItem; index: number}[]) => {
            return tabs.map(({item, index}) => (
                <TabsItem
                    key={index}
                    label={item.label}
                    badgeCount={item.badgeCount}
                    isActive={selectedIndex === index}
                    disabled={disabled}
                    variant={variant}
                    size={size}
                    onClick={() => onSelect(index)}
                    className={style.tabButton}
                />
            ));
        },
        [selectedIndex, disabled, variant, size, onSelect]
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

    useEffect(() => {
        console.log("Dropdown items:", dropdownItems);
    }, [dropdownItems]);

    const wrapperClasses = clsx(style.tabsHeaderWrapper, {
        [style.withPadding]: withPadding,
        [style.spaceStretch]: space === "stretch",
        [style.spaceHug]: space === "hug",
    });

    const tabsContainerStyle = isDropdown ? {maxWidth: `calc(100% - 40px)`} : {};

    return (
        <nav className={wrapperClasses}>
            {isDropdown ? (
                <div
                    className={style.tabsList}
                    ref={containerRef}
                >
                    {isReady ? (
                        <>
                            <div
                                className={style.tabsContainer}
                                style={tabsContainerStyle}
                            >
                                {renderTabs(visibleItems)}
                            </div>
                            {dropdownItems.length > 0 && (
                                <div className={style.dropdownWrapper}>
                                    <button
                                        className={clsx(style.dropdownToggle, {
                                            [style.active]: isDropdownOpen,
                                        })}
                                        onClick={() => setDropdownOpen(!isDropdownOpen)}
                                    >
                                        <img
                                            src={dotsVertical}
                                            alt="More tabs"
                                        />
                                    </button>
                                    <div className={style.dropdownContainer}>
                                        <Dropdown isOpen={isDropdownOpen}>
                                            <div className={style.dropdownItemList}>
                                                {dropdownItems.map(({item, index}) => (
                                                    <button
                                                        key={index}
                                                        className={style.dropdownItem}
                                                        onClick={() => {
                                                            onSelect(index);
                                                            setDropdownOpen(false);
                                                        }}
                                                    >
                                                        {item.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </Dropdown>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div
                            className={style.tabsContainer}
                            style={{...tabsContainerStyle, visibility: "hidden"}}
                        >
                            {renderTabs(items.map((item, index) => ({item, index})))}
                        </div>
                    )}
                </div>
            ) : (
                <TabsScrollableWrapper
                    overflow={overflow}
                    scrollRef={containerRef as React.RefObject<HTMLDivElement>}
                >
                    {renderTabs(visibleItems)}
                </TabsScrollableWrapper>
            )}
            <div className={style.underlineLine} />
        </nav>
    );
};
