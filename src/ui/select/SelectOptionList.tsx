import {FC, useMemo} from "react";
import {OptionType} from "./Select";
import {SelectOption} from "./SelectOption";
import styles from "./SelectOptionList.module.scss";

interface Props {
    size?: "24" | "32" | "36" | "40" | "44" | "48";
    isMulti: boolean;
    optionsData: OptionType[];
    selected: OptionType[];
    isShowIcons?: boolean;
    onChange: (selected: OptionType[]) => void;
    onClose?: () => void;
    searchText?: string;
}

export const SelectOptionList: FC<Props> = ({
    size = "40",
    isMulti,
    optionsData,
    selected,
    isShowIcons,
    onChange,
    onClose,
    searchText = "",
}) => {
    const filteredOptions = useMemo(() => {
        return optionsData.filter((option) =>
            option.label.toLowerCase().includes(searchText.toLowerCase())
        );
    }, [searchText, optionsData]);

    const handleMultiSelect = (value: OptionType) => {
        const alreadySelected = selected.some((v) => v.label === value.label);
        return alreadySelected
            ? selected.filter((v) => v.label !== value.label)
            : [...selected, value];
    };

    const handleSingleSelect = (value: OptionType) => {
        return [value];
    };

    const handleSelect = (value: OptionType) => {
        const updated = isMulti ? handleMultiSelect(value) : handleSingleSelect(value);
        onChange(updated);

        if (!isMulti && onClose) {
            onClose();
        }
    };

    return (
        <>
            {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => {
                    const isSelected = selected.some((s) => s.label === option.label);

                    return (
                        <SelectOption
                            size={size}
                            key={option.label}
                            option={option}
                            isSelected={isSelected}
                            onClick={() => handleSelect(option)}
                            isShowIcons={isShowIcons}
                        />
                    );
                })
            ) : (
                <li className={styles.noResults}>No results</li>
            )}
        </>
    );
};
