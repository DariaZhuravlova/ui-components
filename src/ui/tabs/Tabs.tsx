import {FC, useState} from "react";
import clsx from "clsx";
import {tabsContent} from "../../mock/tabsContent";
import {TabsItemList} from "./TabsItemList";

import style from "./Tabs.module.scss";

export interface TabItem {
    label: string;
    badgeCount?: number;
}

export interface TabsProps {
    items: TabItem[];
    selectedIndex: number;
    onSelect: (index: number) => void;
    variant?: "underline" | "underlineFilled";
    size?: "32" | "36" | "40";
    overflow?: "scrollable" | "arrows" | "dropdown";
    withPadding?: boolean;
    space?: "hug" | "stretch";
}

export const Tabs: FC<TabsProps> = ({
    items,
    selectedIndex,
    onSelect,
    variant = "underline",
    size = "36",
    overflow = "scrollable",
    withPadding = false,
}) => {
  

    return (
        <div className={clsx(style.tabs, {})}>
            <TabsItemList
                items={items}
                selectedIndex={selectedIndex}
                onSelect={onSelect}
                variant={variant}
                size={size}
                overflow={overflow}
                withPadding={withPadding}
                space="stretch"
            />
            <div style={{padding: "20px"}}>
                {tabsContent[items[selectedIndex].label] || <p>Content not found for this tab.</p>}
            </div>
        </div>
    );
};
