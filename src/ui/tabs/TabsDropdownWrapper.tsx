import { FC, RefObject } from "react";
//types
import type {Tab} from "./Tabs";
//components
import { Dropdown } from "../../ui/select/Dropdown";
//assets
import dotsVertical from "../../assets/svg/icons/dotsVertical.svg";
//styles
import style from "./TabsDropdownWrapper.module.scss";
//libs
import clsx from "clsx";

interface TabsDropdownWrapperProps {
    hiddenTabs: {item: Tab; index: number}[];
    isOpen: boolean;
    toggleOpen: () => void;
    onSelect: (index: number) => void;
    dropdownRef: RefObject<HTMLButtonElement | null>;
}

export const TabsDropdownWrapper: FC<TabsDropdownWrapperProps> = ({
    hiddenTabs,
    isOpen,
    toggleOpen,
    onSelect,
    dropdownRef,
}) => {
    const shouldShowButton = hiddenTabs.length > 0;

    return (
        <div className={style.dropdownWrapper}>
            <button
                ref={dropdownRef}
                className={clsx(style.dropdownToggle, {
                    [style.active]: isOpen,
                })}
                onClick={toggleOpen}
                style={{
                    visibility: shouldShowButton ? "visible" : "hidden",
                }}
            >
                <img
                    src={dotsVertical}
                    alt="More tabs"
                />
            </button>

            {isOpen && shouldShowButton && (
                <div className={clsx(style.dropdownContainer, {[style.open]: isOpen})}>
                    <Dropdown isOpen={isOpen}>
                        <div className={style.dropdownItemList}>
                            {hiddenTabs.map(({item, index}) => (
                                <button
                                    key={index}
                                    className={style.dropdownItem}
                                    onClick={() => {
                                        onSelect(index);
                                        toggleOpen();
                                    }}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </Dropdown>
                </div>
            )}
        </div>
    );
};
