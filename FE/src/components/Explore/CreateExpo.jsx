import {Tabs, Tab} from "@heroui/tabs";
import OpenionForm from "./Openion/OpenionForm";
import PromotionCreator from "./Promotion/FormProPage";
import FormNews from "./News/FormNews";
export default function CreateExpo() {
const Explore=[
    {
        title: 'News',
        key: 'News',
        content: <FormNews/>,
    },
    {
        title: 'Openion',
        key: 'Openion',
        content: <OpenionForm/>,
    },
    {
        title: 'Promotion',
        key: 'Promotion',
        content: <PromotionCreator/>,
    },
    
]

  return (
    <div className="flex flex-wrap gap-4">
     
        <Tabs aria-label="Tabs variants" variant={"bordered"}>
          {
            Explore.map((tab) => (
              <Tab label={tab.title} key={tab.key}>
                {tab.content}
              </Tab>
            ))
          }
         
        </Tabs>
      
    </div>
  );
}
