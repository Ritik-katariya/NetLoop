import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import ProfileInfo from "./ProfileInfo";
import ProfilePost from "./ProfilePost";
import NetworkProfilePage from "./Network/NetworkProfilePage";
import ProfilePosts from "./Posts/ProfilePosts";
import ProfileSaved from "./Saved/ProfileSaved";
import { memberInfo } from "../../utils/auth";
import { useParams } from "react-router-dom";
import { useGetMemberQuery } from "../../redux/api/member";

export default function ProfileTab() {
  const id=memberInfo()?.id||"";
  const member = useParams();
  const{data:memberdata,error:merror,isLoading:misLoading,isSuccess:misSuccess}=useGetMemberQuery(member?.id);
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
              <div className="md:flex gap-4 grid md:grid-cols-2 grid-cols-1">
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
              <div className="w-full h-96 flex justify-center items-center">
              Comming Soon....!
              </div>
              </CardBody>
            </Card>
          </Tab>

         {member?.id===id&& <Tab key="Posts" title="Posts" className="focus:text-primary ">
            <Card>
              <CardBody className="flex flex-col justify-center items-center">
              <ProfilePosts/>
              </CardBody>
            </Card>
          </Tab>}

         {member?.id===id&& <Tab key="Saved" title="Saved" className="focus:text-primary ">
            <Card>
              <CardBody>
              <ProfileSaved/>
              </CardBody>
            </Card>
          </Tab>}
        </Tabs>
      </div>
    </div>
  );
}