import { useState } from "react";
import { Select } from "./Select";
import { optionsData } from "./optionsData";
//assets
import user from "../../assets/svg/icons/user.svg";
import search from "../../assets/svg/icons/search.svg";

export const SelectList = () => {
  const [selected1, setSelected1] = useState<typeof optionsData>([]);
  const [selected2, setSelected2] = useState<typeof optionsData>([]);
  const [selected3, setSelected3] = useState<typeof optionsData>([]);
  const [selected4, setSelected4] = useState<typeof optionsData>([]);
  const [selected5, setSelected5] = useState<typeof optionsData>([]);

  console.log(selected2);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "50px",
        backgroundColor: "#F4F5F7",
        padding: "50px",
      }}
    >
      <Select
        label="Choose a color"
        isClearable
        size="36"
        placeholder="Select..."
        optionsData={optionsData}
        isSearchable
        selected={selected1}
        setSelected={setSelected1}
        helperText="This is a hint text to help user."
        tooltipText="This is a tooltip"
        isShowTooltip
        isShowIcons={true}
        iconBefore={<img src={user} alt="user" />}
      />

      <Select
        label="Multiple colors"
        isClearable
        isSearchable
        isMultiSelect
        size="40"
        isQuiet
        placeholder="Pick some..."
        optionsData={optionsData}
        selected={selected2}
        setSelected={setSelected2}
        helperText="Helper text"
        isShowIcons={true}
        iconBefore={<img src={search} alt="user" />}
      />
      <Select
        label="With error"
        isClearable
        isSearchable
        isError
        helperText="Something went wrong"
        uiType="outline"
        size="48"
        placeholder="Placeholder..."
        optionsData={optionsData}
        selected={selected3}
        setSelected={setSelected3}
      />

      <Select
        label="not searchable"
        isClearable
        size="36"
        placeholder="Select..."
        optionsData={optionsData}
        selected={selected4}
        setSelected={setSelected4}
        helperText="This is a hint text to help user."
        tooltipText="This is a tooltip"
        isShowTooltip
        uiType={"outline"}
        iconBefore={<img src={user} alt="user" />}
      />
      <Select
        label="disabled"
        isClearable
        size="36"
        placeholder="Select..."
        optionsData={optionsData}
        selected={selected5}
        setSelected={setSelected5}
        helperText="This is a hint text to help user."
        tooltipText="This is a tooltip"
        isShowTooltip
        iconBefore={<img src={user} alt="user" />}
        isQuiet
        disabled={true}
      />
    </div>
  );
};
