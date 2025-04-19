import clsx from "clsx";
import { FC, useRef, ChangeEvent } from "react";
import styles from "./VerificationInput.module.scss";

interface VerificationInputProps {
  size?: "64" | "80" | "96";
  amountInputs?: number;
  maxInputLength?: number;
  placeholder?: string;
  helperText?: string;
  label?: string;
}

const VerificationInput: FC<VerificationInputProps> = ({
  size = "64",
  amountInputs = 6,
  maxInputLength = 1,
  placeholder = "0",
  helperText,
  label,
}) => {
  const inputsRef = useRef<Array<HTMLInputElement | null>>(
    Array.from({ length: amountInputs })
  );

  const onValueChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");

    if (inputsRef.current[index]) {
      inputsRef.current[index].value = value;
    }

    if (
      inputsRef.current[index]?.value.length === 1 &&
      index < inputsRef.current.length - 1
    ) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && inputsRef.current[index] && index > 0) {
      inputsRef.current[index].value = "";
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <>
      <div className={clsx(styles.verificationInputWrapper)}>
        {label && <div className={clsx(styles.label)}>{label}</div>}
        <div
          className={clsx(styles.inputContainer, {
            [styles.size64]: size === "64",
            [styles.size80]: size === "80",
            [styles.size96]: size === "96",
          })}
        >
          {inputsRef.current.map((element, index) => {
            console.log(element?.value);

            return (
              <input
                key={index}
                onChange={(e) => onValueChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={(el) => {
                  inputsRef.current[index] = el;
                }}
                maxLength={maxInputLength}
                placeholder={placeholder}
                className={clsx(styles.singleVerificationInput, {
                  [styles.filled]:
                    (inputsRef.current[index] &&
                      inputsRef.current[index].value.length) ||
                    0 > 0,
                })}
                type="text"
              />
            );
          })}
        </div>
        {helperText && (
          <div className={clsx(styles.helperText)}>{helperText}</div>
        )}
      </div>
    </>
  );
};

export default VerificationInput;
