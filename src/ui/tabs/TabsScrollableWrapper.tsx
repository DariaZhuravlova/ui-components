import {FC, ReactNode, RefObject, useState, useEffect} from "react";
import style from "./TabsScrollableWrapper.module.scss";
import arrowLeft from "../../assets/svg/icons/arrowLeft.svg";
import arrowRight from "../../assets/svg/icons/arrowRight.svg";

interface TabsScrollableWrapperProps {
    overflow: "scrollable" | "arrows" | "dropdown";
    children: ReactNode;
    scrollRef: RefObject<HTMLDivElement>;
}

export const TabsScrollableWrapper: FC<TabsScrollableWrapperProps> = ({
    overflow,
    children,
    scrollRef,
}) => {
    const isArrows = overflow === "arrows";
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);

    const scrollLeft = () => {
        scrollRef.current?.scrollBy({left: -100, behavior: "smooth"});
    };

    const scrollRight = () => {
        scrollRef.current?.scrollBy({left: 100, behavior: "smooth"});
    };

    useEffect(() => {
        const updateArrowsVisibility = () => {
            if (!scrollRef) return;

            const {scrollLeft, scrollWidth, clientWidth} = scrollRef.current;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1); // -1 для учета погрешности
        };

        updateArrowsVisibility();
        const container = scrollRef.current;
        container?.addEventListener("scroll", updateArrowsVisibility);
        window.addEventListener("resize", updateArrowsVisibility);

        return () => {
            container?.removeEventListener("scroll", updateArrowsVisibility);
            window.removeEventListener("resize", updateArrowsVisibility);
        };
    }, [scrollRef]);

    return (
        <div className={style.wrapper}>
            {isArrows && showLeftArrow && (
                <button
                    className={style.arrow}
                    onClick={scrollLeft}
                    aria-label="Scroll left"
                >
                    <img
                        src={arrowLeft}
                        alt="Arrow left"
                    />
                </button>
            )}
            <div
                ref={scrollRef}
                className={style.scrollContainer}
            >
                {children}
            </div>
            {isArrows && showRightArrow && (
                <button
                    className={style.arrow}
                    onClick={scrollRight}
                    aria-label="Scroll right"
                >
                    <img
                        src={arrowRight}
                        alt="Arrow right"
                    />
                </button>
            )}
        </div>
    );
};
