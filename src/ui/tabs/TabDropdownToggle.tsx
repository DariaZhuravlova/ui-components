import {FC} from "react";
import clsx from "clsx";
import dotsVertical from "../../assets/svg/icons/dotsVertical.svg";
import style from "./TabsItemList.module.scss";

interface TabDropdownToggleProps {
    isOpen: boolean;
    onToggle: () => void;
}

export const TabDropdownToggle: FC<TabDropdownToggleProps> = ({isOpen, onToggle}) => {
    return (
        <div className={style.dropdownWrapper}>
            <button
                className={clsx(style.dropdownToggle, {
                    [style.active]: isOpen,
                })}
                onClick={onToggle}
            >
                <img
                    src={dotsVertical}
                    alt="More tabs"
                />
            </button>
        </div>
    );
};
