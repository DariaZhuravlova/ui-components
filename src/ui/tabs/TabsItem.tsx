import {FC} from "react";
import clsx from "clsx";

import style from "./TabsItem.module.scss";

interface TabsItemProps {
    label: string;
    badgeCount?: number;
    isActive: boolean;
    disabled?: boolean;
    variant?: "underline" | "underlineFilled";
    size?: "32" | "36" | "40";
    onClick: () => void;
    className?: string; // Добавляем свойство className
}

export const TabsItem: FC<TabsItemProps> = ({
    label,
    badgeCount,
    isActive,
    disabled = false,
    variant = "underline",
    size = "40",
    onClick,
    className, // Деструктурируем className
}) => {
    return (
        <button
            type="button"
            className={clsx(
                style.tabButton,
                style[`size${size}`],
                {
                    [style.active]: isActive,
                    [style.disabled]: disabled,
                    [style.underline]: variant === "underline",
                    [style.underlineFilled]: variant === "underlineFilled" && isActive,
                },
                className // Применяем переданный className
            )}
            disabled={disabled}
            onClick={onClick}
        >
            <span className={style.tabLabel}>{label}</span>
            {badgeCount !== undefined && (
                <span className={clsx(style.tabBadge, {[style.active]: isActive})}>
                    {badgeCount}
                </span>
            )}
        </button>
    );
};
