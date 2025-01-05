import React from 'react';
import Select from 'react-select';

export default function AllNetwork({ setnetworkId }) {
    const network = [
        {
            id: 1,
            name: "John Doe",
            email: "john.doe@example.com",
            img: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png",
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "jane.smith@example.com",
            img: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/12.png",
        },
    ];

    const options = network.map((user) => ({
        value: user?.id,
        label: (
            <div className="flex items-center gap-2">
                <img
                    src={user?.img}
                    alt={user?.name}
                    className="w-6 h-6 rounded-full"
                />
                <div className="flex flex-col">
                    <span>{user?.name}</span>
                    <span className="text-gray-500 text-sm">{user?.email}</span>
                </div>
            </div>
        ),
    }));

    const handleChange = (selectedOption) => {
        console.log("Selected User:", selectedOption);
        
        setnetworkId(selectedOption.value);
    };

    return (
        <div className="max-w-full">
            <Select
                options={options}
                placeholder="Select a user"
                onChange={handleChange}
                isSearchable
                className='w-[300px] outline-none border-none rounded-full'
            />
        </div>
    );
}
