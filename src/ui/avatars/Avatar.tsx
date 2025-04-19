import {FC} from "react";
import {getInitials} from "../../helpers/getInitials";
import styles from "./Avatar.module.scss";
import clsx from "clsx";

interface AvatarProps {
    imageUrl?: string;
    firstName?: string;
    lastName?: string;
    isOnlineIndicator?: boolean;
    disableFocus?: boolean;
    tabIndex?: number;
    size?: "16" | "24" | "28" | "32" | "36" | "40" | "44" | "48" | "56";
    className?: string;
}

export const Avatar: FC<AvatarProps> = ({
    className,
    imageUrl,
    firstName,
    lastName,
    size = "40",
    isOnlineIndicator = true,
    tabIndex = 0,
    disableFocus = false,
}) => {
    return (
        <div
            className={clsx(styles.avatarWrapper, className, styles[`size${size}`], {
                [styles.noFocus]: disableFocus,
            })}
            tabIndex={tabIndex}
        >
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt={`${firstName} ${lastName}`}
                    className={styles.avatar}
                />
            ) : (
                <div className={styles.avatarPlaceholder}>{getInitials(firstName, lastName)}</div>
            )}
            {isOnlineIndicator && <span className={styles.indicator}></span>}
        </div>
    );
};
