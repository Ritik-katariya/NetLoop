import React from "react";
import Select from "react-select";
import { useSelector } from "react-redux";

// Custom selected value display
const CustomSingleValue = ({ data }) => (
  <div className="flex items-center gap-2">
    <img src={data.logo} alt={data.name} className="w-6 h-6 rounded-full" />
    <span>{data.name}</span>
  </div>
);

// Custom dropdown option display
const CustomOption = ({ data, innerRef, innerProps }) => (
  <div
    ref={innerRef}
    {...innerProps}
    className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100 rounded-md transition-all"
  >
    <img src={data.logo} alt={data.name} className="w-6 h-6 rounded-full" />
    <span>{data.name}</span>
  </div>
);

export default function AllNetwork({ network }) {
  const { memberData } = useSelector((state) => ({
    memberData: state.member.memberData,
  }));

  // Generate options for the select dropdown
  const options =
    memberData?.networks?.map((network) => ({
      value: network?.id,
      label: network?.name,
      logo: network?.logo,
    })) || [];

  // Handle selection change
  const handleChange = (selectedOption) => {
    if (selectedOption?.value) {
      console.log("Selected Network:", selectedOption.value);
      network(selectedOption.value);
    }
  };

  return (
    <div className="max-w-full">
      {options.length > 0 ? (
        <Select
          options={options}
          placeholder="Select a network"
          onChange={handleChange}
          isSearchable
          components={{ SingleValue: CustomSingleValue, Option: CustomOption }}
          className="w-[300px] border border-gray-300 rounded-md shadow-sm"
        />
      ) : (
        <p className="text-gray-500 text-sm">No networks available.</p>
      )}
    </div>
  );
}
