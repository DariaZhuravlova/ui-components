import {FC} from "react";
import {OptionType} from "./Select";
import styles from "./SelectOption.module.scss";
import clsx from "clsx";
import checkmark from "../../assets/svg/icons/checkmark.svg";

interface SelectOptionProps {
    size?: "24" | "32" | "36" | "40" | "44" | "48";
    option: OptionType;
    isSelected: boolean;
    isShowIcons?: boolean;
    onClick: () => void;
}

export const SelectOption: FC<SelectOptionProps> = ({
    option,
    size = "40",
    isSelected,
    isShowIcons = true,
    onClick,
}) => (
    <li
        className={clsx(styles.optionItem, styles[`size${size}`], {[styles.selected]: isSelected})}
        onClick={onClick}
    >
        <span className={styles.optionLabel}>
            {isShowIcons && (
                <span className={clsx(styles.icon, {[styles.emptyIcon]: !option.icon})}>
                    {option.icon}
                </span>
            )}
            <span className={styles.labelText}>{option.label}</span>
        </span>
        {isSelected && (
            <span className={styles.checkmark}>
                <img
                    src={checkmark}
                    alt="checkmark"
                />
            </span>
        )}
    </li>
);
