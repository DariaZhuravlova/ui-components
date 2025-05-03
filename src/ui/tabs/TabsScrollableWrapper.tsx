// TabsScrollableWrapper.tsx
import {FC, ReactNode, RefObject} from "react";
import style from "./TabsScrollableWrapper.module.scss";

interface Props {
    children: ReactNode;
    scrollRef: RefObject<HTMLDivElement | null>;
    overflow: "scrollable" | "arrows" | "dropdown";
}

export const TabsScrollableWrapper: FC<Props> = ({children, scrollRef}) => {
    return (
        <div className={style.wrapper}>
            <div
                ref={scrollRef}
                className={style.scrollContainer}
            >
                {children}
            </div>
        </div>
    );
};
