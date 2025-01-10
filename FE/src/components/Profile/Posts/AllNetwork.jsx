import React, { useState } from 'react';
import Select from 'react-select';
import { useSelector } from 'react-redux';

const customSingleValue = ({ data }) => (
    <div className="flex items-center gap-2">
        <img
            src={data.logo}
            alt={data.name}
            className="w-6 h-6 rounded-full"
        />
        <span>{data.name}</span>
    </div>
);

const customOption = (props) => {
    const { data, innerRef, innerProps } = props;
    return (
        <div ref={innerRef} {...innerProps} className="flex items-center gap-2 p-2">
            <img
                src={data.logo}
                alt={data.name}
                className="w-6 h-6 rounded-full"
            />
            <span>{data.name}</span>
        </div>
    );
};

export default function AllNetwork({ network }) {
    const { memberData } = useSelector((state) => ({
        memberData: state.member.memberData,
    }));

    // const [currentNetworkId, setCurrentNetworkId] = useState(null); // Track the selected network ID

    const options = memberData?.networks?.map((network) => ({
        value: network?.id,
        label: network?.name,
        logo: network?.logo,
    })) || [];

    const handleChange = (selectedOption) => {
        // if (selectedOption?.value !== currentNetworkId) {
        //     setCurrentNetworkId(selectedOption.value); // Update the current network ID
            console.log('Selected Network:', selectedOption.value);
            network(selectedOption?.value); // Call the `network` function only if the ID has changed
        
    };

    return (
        <div className="max-w-full">
            {memberData?.networks?.length > 0 && (
                <Select
                    options={options}
                    placeholder="Select a network"
                    onChange={handleChange}
                    isSearchable
                    components={{ SingleValue: customSingleValue, Option: customOption }}
                    className="w-[300px] outline-none border-none rounded-full"
                />
            )}
        </div>
    );
}
