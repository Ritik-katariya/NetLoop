import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import ProfileInfo from "./ProfileInfo";
import ProfilePost from "./ProfilePost";
import NetworkProfilePage from "./Network/NetworkProfilePage";
import ProfilePosts from "./Posts/ProfilePosts";
import ProfileSaved from "./Saved/ProfileSaved";

export default function ProfileTab() {
  return (
    <div className="w-full max-w-full overflow-hidden ">
      <div className="w-full">
        <Tabs 
          aria-label="Options" 
          variant="underlined"
          classNames={{
            tabList: "w-full relative flex gap-4 overflow-x-auto no-scrollbar",
            cursor: "w-full",
            
          }}
        >
          <Tab key="Profile" title="Profile" className="focus:text-primary ">
            <Card>
              <CardBody >
              <div className="md:flex gap-4">
              <ProfileInfo/>
              <ProfilePost/>
              </div>
              </CardBody>
            </Card>
          </Tab>

          <Tab key="Network" title="Network" className="focus:text-primary ">
            <Card>
              <CardBody>
                <NetworkProfilePage/>
              </CardBody>
            </Card>
          </Tab>

          <Tab key="Cluster" title="Cluster" className="focus:text-primary ">
            <Card>
              <CardBody>
               Comming Soon....!
              </CardBody>
            </Card>
          </Tab>

          <Tab key="Posts" title="Posts" className="focus:text-primary ">
            <Card>
              <CardBody className="flex flex-col justify-center items-center">
              <ProfilePosts/>
              </CardBody>
            </Card>
          </Tab>

          <Tab key="Saved" title="Saved" className="focus:text-primary ">
            <Card>
              <CardBody>
              <ProfileSaved/>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}