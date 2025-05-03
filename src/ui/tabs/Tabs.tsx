import {FC} from "react";
import {TabsItemList} from "./TabsItemList"; 
import {tabsContent} from "../../mock/tabsContent";

export interface Tab {
    label: string;
    badgeCount?: number;
}

interface TabsProps {
    items: Tab[];
    selectedIndex: number;
    onSelect: (index: number) => void;
    overflow?: "scrollable" | "arrows" | "dropdown";
    variant?: "underline" | "underlineFilled";
    size?: "32" | "36" | "40";
    withPadding?: boolean;
    space?: "hug" | "stretch";
}

export const Tabs: FC<TabsProps> = ({
    items,
    selectedIndex,
    onSelect,
    overflow = "scrollable",
    variant = "underline",
    size = "36",
    withPadding = false,
    space = "hug",
}) => {
    const selectedTabLabel = items[selectedIndex]?.label;
    const selectedTabContent = selectedTabLabel ? tabsContent[selectedTabLabel] : null;

    return (
        <>
            <TabsItemList
                items={items}
                selectedIndex={selectedIndex}
                onSelect={onSelect}
                overflow={overflow}
                variant={variant}
                size={size}
                withPadding={withPadding}
                space={space}
            />
            <div>{selectedTabContent}</div>
        </>
    );
};
