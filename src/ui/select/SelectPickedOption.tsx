import { FC, useEffect, useRef } from "react";
import { OptionType } from "./Select";
import styles from "./SelectPickedOption.module.scss";

interface Props {
  isMulti: boolean;
  selected: OptionType[];
  optionsData: OptionType[];
  onRemove: (value: OptionType) => void;
}

export const SelectPickedOption: FC<Props> = ({isMulti, selected, optionsData, onRemove}) => {
    const getLabel = (val: OptionType) =>
        optionsData.find((o) => o.value === val.value)?.label || "";

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollLeft = containerRef.current.scrollWidth;
        }
    }, [selected]);

    if (isMulti) {
        return (
            <div
                className={styles.selectedTagsContainer}
                ref={containerRef}
            >
                {selected.map((val, index) => (
                    <span
                        key={`${val.label}-${index}`}
                        className={styles.selectedTag}
                    >
                        {getLabel(val)}
                        <span
                            className={styles.removeTag}
                            onClick={(e) => {
                                e.stopPropagation();
                                onRemove(val);
                            }}
                        >
                            ×
                        </span>
                    </span>
                ))}
            </div>
        );
    }

    return (
        <div className={styles.singleSelected}>
            {selected.length > 0 ? getLabel(selected[0]) : ""}
        </div>
    );
};