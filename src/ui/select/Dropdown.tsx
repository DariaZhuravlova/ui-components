import { FC } from "react";
import styles from "./Dropdown.module.scss";

interface DropdownProps {
  children: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Dropdown: FC<DropdownProps> = ({ children, isOpen = true }) => {
  return isOpen ? <div className={styles.dropdown}>{children}</div> : null;
};
