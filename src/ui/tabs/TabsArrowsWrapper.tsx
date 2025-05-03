import { FC, ReactNode, RefObject, useEffect, useState } from "react";
//styles
import style from "./TabsScrollableWrapper.module.scss";
//assets
import arrowLeft from "../../assets/svg/icons/arrowLeft.svg";
import arrowRight from "../../assets/svg/icons/arrowRight.svg";

interface Props {
    children: ReactNode;
    scrollRef: RefObject<HTMLDivElement | null>;
}

export const TabsArrowsWrapper: FC<Props> = ({children, scrollRef}) => {
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);

    const scrollLeft = () => scrollRef.current?.scrollBy({left: -100, behavior: "smooth"});
    const scrollRight = () => scrollRef.current?.scrollBy({left: 100, behavior: "smooth"});

    useEffect(() => {
        const update = () => {
            if (!scrollRef.current) return;
            const {scrollLeft, scrollWidth, clientWidth} = scrollRef.current;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
        };

        const el = scrollRef.current;
        update();
        el?.addEventListener("scroll", update);
        window.addEventListener("resize", update);

        return () => {
            el?.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
        };
    }, [scrollRef]);

    return (
        <div className={style.wrapper}>
            {showLeftArrow && (
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
            {showRightArrow && (
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
