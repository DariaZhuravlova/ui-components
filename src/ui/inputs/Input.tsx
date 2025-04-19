import clsx from "clsx";
import styles from "./Input.module.scss";
import {ReactNode, FC, memo} from "react";
import {Tooltip} from "../tooltips/Tooltip";
import {getOSBadge} from "../../helpers/getOSBadge";
import {useShortcutFocus} from "../../hooks/useShortcutFocus";

interface InputProps {
    children?: React.ReactNode;
    label?: string;
    helperText?: string;
    iconBefore?: ReactNode;
    iconAfter?: ReactNode;
    isShowBadge?: boolean;
    size?: "24" | "32" | "36" | "40" | "44" | "48";
    uiType?: "fill" | "outline";
    labelPosition?: "top" | "right";
    placeholder?: string;
    tooltipText?: string;
    type: React.InputHTMLAttributes<HTMLInputElement>["type"];
    isError?: boolean;
    disabled?: boolean;
    isQuiet?: boolean;
    isRequired?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    onKeyDown?: (e: React.KeyboardEvent) => void;
    onClick?: (e: React.MouseEvent) => void;
    value?: string;
    readOnly?: boolean;
}

export const Input: FC<InputProps> = memo(
    ({
        children,
        label,
        helperText,
        iconBefore,
        iconAfter,
        isShowBadge = false,
        size = "40",
        uiType = "fill",
        labelPosition = "top",
        placeholder,
        tooltipText,
        type = "email",
        isError = false,
        disabled = false,
        isQuiet = false,
        isRequired = false,
        ...rest
    }) => {
        const osBadge = getOSBadge();
        const inputRef = useShortcutFocus();

        return (
            <div
                className={clsx(styles.inputWrapper, {
                    // labelPosition
                    [styles.labelTop]: labelPosition === "top",
                    [styles.labelRight]: labelPosition === "right",
                    // isError
                    [styles.error]: isError,
                    // disabled
                    [styles.disabled]: disabled,
                    // isShowBadge
                    [styles.hideFocus]: labelPosition === "right" && !isShowBadge,
                })}
            >
                <div className={styles.inputBox}>
                    {label && (
                        <div className={styles.labelContainer}>
                            <span className={styles.label}>{label}</span>
                            {isRequired && <span className={styles.required}>*</span>}
                            {tooltipText && <Tooltip text={tooltipText} />}
                        </div>
                    )}

                    <div
                        className={clsx(styles.inputContainer, {
                            // isQuiet
                            [styles.quiet]: isQuiet,
                            // uiType
                            [styles.fill]: uiType === "fill",
                            [styles.outline]: uiType === "outline",
                            // size
                            [styles.size24]: size === "24",
                            [styles.size32]: size === "32",
                            [styles.size36]: size === "36",
                            [styles.size40]: size === "40",
                            [styles.size44]: size === "44",
                            [styles.size48]: size === "48",
                        })}
                    >
                        {iconBefore && <span className={styles.icon}>{iconBefore}</span>}
                        {/* <input
                            ref={inputRef}
                            type={type}
                            className={clsx(styles.input, {})}
                            placeholder={placeholder}
                        /> */}
                        {children}
                        <input
                            {...rest}
                            ref={isShowBadge ? inputRef : undefined}
                            type={type}
                            className={clsx(styles.input, {})}
                            placeholder={placeholder}
                            // disabled={!isShowBadge || disabled}
                        />

                        {iconAfter && <span className={styles.icon}>{iconAfter}</span>}
                        {osBadge && isShowBadge && <span className={styles.badge}>{osBadge}</span>}
                    </div>
                </div>

                {helperText && <div className={styles.helperText}>{helperText}</div>}
            </div>
        );
    }
);
