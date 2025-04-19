import {SVGProps} from "react";

const SearchIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props} 
    >
        <path
            d="M13 13L10.6667 10.6667M12.3333 6.66667C12.3333 9.79628 9.79628 12.3333 6.66667 12.3333C3.53705 12.3333 1 9.79628 1 6.66667C1 3.53705 3.53705 1 6.66667 1C9.79628 1 12.3333 3.53705 12.3333 6.66667Z"
            stroke="currentColor" 
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export default SearchIcon;
