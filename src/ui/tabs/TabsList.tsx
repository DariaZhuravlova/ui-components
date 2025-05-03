import {FC, useState} from "react";
import {Tabs} from "./Tabs";
import {tabsContent} from "../../mock/tabsContent";

interface TabsListProps {}

export const TabsList: FC<TabsListProps> = ({}) => {
    const [selectedIndexScrollable, setSelectedIndexScrollable] = useState(0);
    const [selectedIndexArrows, setSelectedIndexArrows] = useState(0);
    const [selectedIndexDropdown, setSelectedIndexDropdown] = useState(0);

    const items = Object.keys(tabsContent).map((label) => ({label}));

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "50px",
                fontFamily: "Inter, sans-serif",
            }}
        >
            <h2 style={{color: "green"}}>Scrollable Tabs</h2>
            <Tabs
                variant="underlineFilled"
                size="40"
                withPadding
                selectedIndex={selectedIndexScrollable}
                onSelect={setSelectedIndexScrollable}
                items={items}
            />
            <h2 style={{color: "green"}}>Arrows Tabs</h2>
            <Tabs
                variant="underline"
                overflow="arrows"
                size="40"
                withPadding
                items={items}
                selectedIndex={selectedIndexArrows}
                onSelect={setSelectedIndexArrows}
            />
            <h2 style={{color: "green"}}>Dropdown Tabs</h2>
            <Tabs
                variant="underlineFilled"
                overflow="dropdown"
                size="40"
                withPadding
                items={items}
                selectedIndex={selectedIndexDropdown}
                onSelect={setSelectedIndexDropdown}
            />
        </div>
    );
};
