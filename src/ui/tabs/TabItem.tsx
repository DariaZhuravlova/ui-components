import {forwardRef} from "react";
import clsx from "clsx";
import style from "./TabItem.module.scss";

interface TabItemProps {
    label: string;
    badgeCount?: number;
    isActive?: boolean;
    disabled?: boolean;
    variant?: "underline" | "underlineFilled";
    size?: "32" | "36" | "40";
    onClick?: () => void;
    className?: string;
}

export const TabItem = forwardRef<HTMLButtonElement, TabItemProps>(
    ({label, badgeCount, isActive, disabled, variant, size = "36", onClick, className}, ref) => {
        return (
            <button
                ref={ref}
                className={clsx(
                    style.tabButton,
                    className,
                    {
                        [style.active]: isActive,
                        [style.disabled]: disabled,
                        [style.underlineFilled]: variant === "underlineFilled" && isActive,
                    },
                    style[`size${size}`]
                )}
                onClick={onClick}
                disabled={disabled}
            >
                <span className={style.tabLabel}>{label}</span>
                {badgeCount !== undefined && badgeCount > 0 && (
                    <span className={clsx(style.tabBadge, {[style.active]: isActive})}>
                        {badgeCount}
                    </span>
                )}
            </button>
        );
    }
);

TabItem.displayName = "TabItem";
