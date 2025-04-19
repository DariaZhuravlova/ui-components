// react
import { FC, useState } from 'react'
// components
import { Tabs } from './Tabs'

interface TabsListProps {

}

export const TabsList: FC<TabsListProps> = ({ }) => {
  const [selectedIndexScrollable, setSelectedIndexScrollable] = useState(0);
  const [selectedIndexArrows, setSelectedIndexArrows] = useState(0);
  const [selectedIndexDropdown, setSelectedIndexDropdown] = useState(0);

  const items = [
      {label: "My details"},
      {label: "Profile"},
      {label: "Password"},
      {label: "Team", badgeCount: 3},
      {label: "Plan"},
      {label: "Billing"},
      {label: "Email"},
      {label: "Notifications"},
      {label: "Tab 9"},
      {label: "Tab 10"},
      {label: "Tab 11"},
      {label: "Tab 12"},
      {label: "Tab 13"},
      {label: "Tab 14"},
      {label: "Tab 15"},
  ];
  
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
}
