import { Tabs, Tab } from "@nextui-org/react";
import OpenionForm from "./Openion/OpenionForm";
import PromotionCreator from "./Promotion/FormProPage";
import FormNews from "./News/FormNews";
import Header from "../Shared/Header/Header";

export default function CreateExpo() {
  const Explore = [
    {
      title: 'News',
      key: 'News',
      content: <FormNews />,
    },
    {
      title: 'Opinion',
      key: 'Opinion',
      content: <OpenionForm />,
    },
    {
      title: 'Promotion',
      key: 'Promotion',
      content: <PromotionCreator />,
    }
  ];

  return (
    <div>
      <Header/>
      <div className="flex flex-col items-center justify-start  bg-gray-100 h-screen text-gray-800 py-4">
      <div className="bg-gradient-to-tr from-[#b2fcff] via-[#d8ebff] to-[#ffffff] w-2/4 min-h-full p-6">
      <h1 className="w-full text-center text-4xl font-mono font-semibold underline mb-4 text-teal-400">Create Explore</h1>
      <Tabs 
        aria-label="Options" 
        variant="underlined"
        classNames={{
          tabList: "w-full relative flex gap-4 overflow-x-auto no-scrollbar",
          cursor: "w-full",
          tab: "relative flex items-center justify-center p-2 text-gray-700 hover:text-primary focus:text-primary  text-xl font-semibold hover:scale-105",
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