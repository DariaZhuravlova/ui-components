import {Input} from "./Input";
import SearchIcon from "./SearchIcon";
// import iconInputBefore from "../../assets/icons/icon-input-before.svg";

export const InputList = () => {
    return (
        <div
            // className="input-flex-container"
            style={{
                backgroundColor: "#F4F5F7",
                padding: "50px",
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                gap: "30px",
            }}
        >
            <Input
                type="email"
                label="Email"
                iconBefore={<SearchIcon />}
                iconAfter={<SearchIcon />}
                helperText="This is a hint text to help user."
                placeholder="Input..."
                tooltipText="This is a tooltip text This is a tooltip text"
                uiType="outline"
            />
            <Input
                type="password"
                label="Email"
                iconBefore={<SearchIcon />}
                iconAfter={<SearchIcon />}
                helperText="This is a hint text to help user."
                placeholder="Input..."
                // tooltipText="This is a tooltip text"
                isError
                isRequired
            />

            <Input
                type="password"
                label="disabled input"
                iconBefore={<SearchIcon />}
                iconAfter={<SearchIcon />}
                helperText="This is a hint text to help user."
                placeholder="Input..."
                tooltipText="This is a tooltip text"
                disabled
            />

            <Input
                type="password"
                label="Email"
                iconBefore={<SearchIcon />}
                iconAfter={<SearchIcon />}
                placeholder="very long input placeholder text here to test the text overflow behavior of the input component"
                tooltipText="This is a tooltip text"
                isQuiet
                helperText="This is a hint text to help user."
            />

            <Input
                type="text"
                label="Label"
                iconBefore={<SearchIcon />}
                isQuiet
                placeholder="Input..."
                uiType="outline"
                helperText="This is a hint text to help user."
            />
            <Input
                type="text"
                label="Label"
                placeholder="Input..."
                labelPosition="right"
                isShowBadge={false}
                isError
                isRequired
                helperText="This is a hint text to help user."
            />
            <Input
                type="text"
                label="Label"
                placeholder="Input..."
                labelPosition="right"
                isShowBadge={false}
                isQuiet
                helperText="This is a hint text to help user."
            />
            <Input
                type="text"
                label="Label"
                placeholder="Input..."
                labelPosition="right"
                isShowBadge={false}
                uiType="outline"
                helperText="This is a hint text to help user."
                tooltipText="This is a tooltip text"
            />
            <Input
                type="text"
                label="Label"
                placeholder="Input..."
                labelPosition="right"
                isShowBadge={false}
                uiType="outline"
                helperText="This is a hint text to help user."
                // tooltipText="This is a tooltip text"
                isQuiet
                isRequired
            />
        </div>
    );
};
