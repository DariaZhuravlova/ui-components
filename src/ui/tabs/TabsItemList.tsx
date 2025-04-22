import {FC, useRef, useState, useCallback} from "react";
// components
import {TabItem} from "./Tabs";
import {TabsItem} from "./TabsItem";
import {TabsScrollableWrapper} from "./TabsScrollableWrapper";
import {Dropdown} from "../../ui/select/Dropdown";
// hooks
import {useContainerWidth} from "../../hooks/useContainerWidth";
import {useTabsVisibility} from "../../hooks/useTabsVisibility";
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
    const dropdownRef = useRef<HTMLButtonElement>(null);
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const isDropdown = overflow === "dropdown";

    useContainerWidth(containerRef); //триггерит ререндер при ресайзе
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
        (tabs: {item: TabItem; index: number}[]) =>
            tabs.map(({item, index}) => (
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
            {isDropdown ? (
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
                    {dropdownItems.length > 0 && (
                        <div className={style.dropdownWrapper}>
                            <button
                                ref={dropdownRef}
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
                            <div
                                className={clsx(style.dropdownContainer, {
                                    [style.open]: isDropdownOpen,
                                })}
                            >
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
