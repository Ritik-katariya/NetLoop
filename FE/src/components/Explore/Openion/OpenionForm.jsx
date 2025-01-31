import { Tabs, Tab } from "@nextui-org/react";
import PollForm from "./PollForm";
import RatingCreateForm from "./RaitingCreateForm";

export default function CreateExpo() {
  const Explore = [
    {
      title: 'Create Poll',
      key: 'Poll',
      content:<PollForm/>,
    },
    {
      title: 'Create Rating',
      key: 'Rating',
      content: <RatingCreateForm/>
    }
    
  ];

  return (
    <div>
    
      <div className="flex flex-col items-center justify-start  h-full text-gray-800 py-4">
      <div className="w-full h-full ">
      <h1 className="w-full text-center text-2xl font-mono   mb-4 text-blue-400">Create Openion</h1>
      <Tabs 
        aria-label="Options" 
        variant="underlined"
        classNames={{
          tabList: "w-full relative flex gap-4 overflow-x-auto no-scrollbar",
          cursor: "w-full",
          tab: "relative flex items-center justify-center p-2 text-gray-700 hover:text-blue-400  focus:text-blue-400  text-md font-semibold hover:scale-105",
          tabPanel: "relative flex-1 p-4 "
          


          
        }}
      >
        {Explore.map((tab) => (
          <Tab key={tab.key} title={tab.title} >
            {tab.content}
          </Tab>
        ))}
      </Tabs>
      </div>
    </div>
    </div>
  );
}