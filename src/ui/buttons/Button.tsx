import clsx from "clsx";
import styles from "./Button.module.scss";
import { ReactNode, FC, memo } from "react";

interface ButtonProps {
    onClick?: () => void;
    children: ReactNode;
    type?: "submit" | "button";
    disabled?: boolean;
    isLoading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    shape?: "rectangle" | "rounded" | "pill";
    size?: "32" | "36" | "40" | "44" | "48" | "56";
    uiType?: "fill" | "outline" | "ghost" | "text";
    uiColor?: "accent" | "primary" | "secondary" | "success" | "danger" | "warning";
}

export const Button: FC<ButtonProps> = memo(({
  onClick,
  children,
  type = "button",
  disabled = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  shape = "rounded",
  size = "40",
  uiType = "fill",
  uiColor = "accent",
}) => {
  return (
    <button
      className={clsx(styles.button, {
        // isLoading
        [styles.loading]: isLoading,
        // shape
        [styles.shapeRectangle]: shape === "rectangle",
        [styles.shapeRounded]: shape === "rounded",
        [styles.shapePill]: shape === "pill",
        // size
        [styles.size32]: size === "32",
        [styles.size36]: size === "36",
        [styles.size40]: size === "40",
        [styles.size44]: size === "44",
        [styles.size48]: size === "48",
        [styles.size56]: size === "56",
        // button style
        [styles.fillAccent]: uiColor === "accent" && uiType === "fill",
        [styles.fillPrimary]: uiColor === "primary" && uiType === "fill",
        [styles.fillSecondary]: uiColor === "secondary" && uiType === "fill",
        [styles.fillSuccess]: uiColor === "success" && uiType === "fill",
        [styles.fillDanger]: uiColor === "danger" && uiType === "fill",
        [styles.fillWarning]: uiColor === "warning" && uiType === "fill",
        [styles.outlineAccent]: uiColor === "accent" && uiType === "outline",
        [styles.outlinePrimary]: uiColor === "primary" && uiType === "outline",
        [styles.outlineSecondary]: uiColor === "secondary" && uiType === "outline",
        [styles.outlineSuccess]: uiColor === "success" && uiType === "outline",
        [styles.outlineDanger]: uiColor === "danger" && uiType === "outline",
        [styles.outlineWarning]: uiColor === "warning" && uiType === "outline",
        [styles.ghostAccent]: uiColor === "accent" && uiType === "ghost",
        [styles.ghostPrimary]: uiColor === "primary" && uiType === "ghost",
        [styles.ghostSecondary]: uiColor === "secondary" && uiType === "ghost",
        [styles.ghostSuccess]: uiColor === "success" && uiType === "ghost",
        [styles.ghostDanger]: uiColor === "danger" && uiType === "ghost",
        [styles.ghostWarning]: uiColor === "warning" && uiType === "ghost",
        [styles.textAccent]: uiColor === "accent" && uiType === "text",
        [styles.textPrimary]: uiColor === "primary" && uiType === "text",
        [styles.textSecondary]: uiColor === "secondary" && uiType === "text",
        [styles.textSuccess]: uiColor === "success" && uiType === "text",
        [styles.textDanger]: uiColor === "danger" && uiType === "text",
        [styles.textWarning]: uiColor === "warning" && uiType === "text",
      })}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {isLoading && (
        <span className={styles.loadingIcon}>
          <span className={styles.dot}></span>
          <span className={clsx(styles.dot, styles.dotFade)}></span>
        </span>
      )}

      {leftIcon && !isLoading && (
        <span className={styles.icon}>{leftIcon}</span>
      )}

      <span className={styles.text}>{children}</span>

      {rightIcon && !isLoading && (
        <span className={styles.icon}>{rightIcon}</span>
      )}
    </button>
  );
});
