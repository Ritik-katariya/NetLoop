import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
} from "@nextui-org/react";
import netloop from "../../../images/netloop.png";
import { removeTokenFromCookie } from "../../../utils/cookeeSet";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
export default function ProfileDP({ data }) {
  function logouthandler() {
    removeTokenFromCookie();
    window.location.reload();
  }
   const { verified } = useSelector((state) => ({
     verified:state.member.verified
   }));
  
  return (
    <div className="flex items-center gap-4 ">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            src={data?.profile.img}
          />
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Profile Actions"
          variant="flat"
          className="bg-gray-100"
        >
          <DropdownItem key="profile" className="h-14 gap-2 ">
            <p className="font-semibold">
              <NavLink to={`/profile/${data?.profile.id}`}>
                {data?.name}
              </NavLink>
            </p>
          </DropdownItem>
          <DropdownItem key="settings">
            <NavLink to={`/profile/${data?.profile?.id}`}>My Profile</NavLink>
          </DropdownItem>
         <DropdownItem key="team_settings">
         {!verified?  <NavLink to={`/verify/${data?.id}`}> Verification</NavLink>:<p className="hover:text-primary">Verified</p>}
          </DropdownItem>
          {data?.verified && (
            <DropdownItem key="Add Network">
              <NavLink to={"/add-network"}>Add Network</NavLink>
            </DropdownItem>
          )}
          {data?.networks?.length>0 && (
            <DropdownItem key="Add Network">
              <NavLink to={`/create-explore/${data?.networks[0]?.id}`}>Create Explore</NavLink>
            </DropdownItem>
          )}
          <DropdownItem >
            <NavLink to={"/query-feedback"}>Query & Feedback</NavLink>
          </DropdownItem>
          <DropdownItem key="logout" color="danger" onClick={logouthandler} className="hover:text-primary">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
