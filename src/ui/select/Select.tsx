//react
import {
  FC,
  useState,
  useRef,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
//hooks
import { useClickOutside } from "../../hooks/useClickOutside";
//components
import { Dropdown } from "./Dropdown";
import { SelectOptionList } from "./SelectOptionList";
import { SelectPickedOption } from "./SelectPickedOption";
import { Input } from "../inputs/Input";
//assets
import arrowDown from "../../assets/svg/icons/arrowDown.svg";
import clear from "../../assets/svg/icons/clear.svg";
//styles
import styles from "./Select.module.scss";
//libs
import clsx from "clsx";

export interface OptionType {
  label: string;
  icon?: ReactNode;
  [key: string]: any;
}

interface SelectProps {
  label: string;
  placeholder?: string;
  helperText?: string;
  isMultiSelect?: boolean;
  optionsData: OptionType[];
  selected: OptionType[];
  setSelected: Dispatch<SetStateAction<OptionType[]>>;
  isSearchable?: boolean;
  isClearable?: boolean;
  isError?: boolean;
  isQuiet?: boolean;
  uiType?: "fill" | "outline";
  size?: "24" | "32" | "36" | "40" | "44" | "48";
  disabled?: boolean;
  isRequired?: boolean;
  isShowTooltip?: boolean;
  tooltipText?: string;
  iconBefore?: ReactNode;
  iconAfter?: ReactNode;
  isShowIcons?: boolean;
}

export const Select: FC<SelectProps> = ({
  label,
  placeholder,
  helperText,
  isMultiSelect = false,
  optionsData,
  selected,
  setSelected,
  isSearchable = false,
  isClearable = false,
  isError = false,
  uiType,
  isQuiet = false,
  size = "40",
  disabled = false,
  tooltipText,
  iconBefore,
  isShowIcons = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectRef = useRef<HTMLDivElement>(null);

  const [searchText, setSearchText] = useState<string>("");

  useClickOutside(selectRef, () => {
    setIsOpen(false);
  });

  const handleFocus = () => {
    if (!disabled) {
      setIsOpen(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (
      e.key === "Backspace" &&
      !searchText &&
      !isMultiSelect &&
      selected.length > 0
    ) {
      setSelected([]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    if (!isOpen) setIsOpen(true);
  };

  const handleClearAll = () => {
    setSelected([]);
    setSearchText("");
  };

  const handleRemove = (value: OptionType) => {
    const updated = selected.filter((v) => v.label !== value.label);
    setSelected(updated);
  };

  const handleMultiChange = (newValues: OptionType[]) => {
      setSelected(newValues);
      if (!isMultiSelect && newValues.length > 0) {
          setSearchText(newValues[0].label); 
      } else {
          setSearchText(""); 
      }
  };


  const iconAfterClickHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled) {
      setIsOpen((prev) => !prev);
    }
  };

  const iconAfterNode = (
      <div
          onClick={iconAfterClickHandler}
          className={styles.rightIcons}
      >
          {(searchText.length > 0 || selected.length > 0) && isClearable && (
              <img
                  src={clear}
                  alt="clear"
                  onClick={handleClearAll}
                  className={clsx(styles.clearIcon)}
              />
          )}
          <img
              src={arrowDown}
              alt="arrow"
              className={clsx(styles.arrowIcon)}
          />
      </div>
  );

  return (
      <div
          ref={selectRef}
          className={clsx(styles.selectContainer)}
      >
          <div className={styles.inputWrapper}>
              <Input
                  type="text"
                  placeholder={selected.length === 0 ? placeholder : ""}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onKeyDown={handleKeyDown}
                  isQuiet={isQuiet}
                  size={size}
                  iconBefore={iconBefore}
                  iconAfter={iconAfterNode}
                  label={label}
                  uiType={uiType}
                  isError={isError}
                  disabled={disabled}
                  helperText={helperText}
                  tooltipText={tooltipText}
                  value={searchText}
                  readOnly={!isSearchable}
              >
                  {isMultiSelect && (
                      <div className={styles.selectPickedWrapper}>
                          <SelectPickedOption
                              isMulti={isMultiSelect}
                              selected={selected}
                              optionsData={optionsData}
                              onRemove={handleRemove}
                          />
                      </div>
                  )}
              </Input>
          </div>
          {isOpen && (
              <div className={styles.dropdownWrapper}>
                  <Dropdown
                      isOpen={isOpen}
                      onClose={() => setIsOpen(false)}
                  >
                      <SelectOptionList
                          size={size}
                          isMulti={isMultiSelect}
                          optionsData={optionsData}
                          selected={selected}
                          onChange={handleMultiChange}
                          isShowIcons={isShowIcons}
                          searchText={searchText}
                          onClose={() => setIsOpen(false)}
                      />
                  </Dropdown>
              </div>
          )}
      </div>
  );
};
