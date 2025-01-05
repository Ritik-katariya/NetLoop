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
import {Link, NavLink}  from "react-router-dom"
export default function ProfileDP({ data }) {

  function logouthandler() {
    removeTokenFromCookie();
    window.location.reload();
  }


  return (
    <div className="flex items-center gap-4 ">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            src={netloop}
          />
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Profile Actions"
          variant="flat"
          className="bg-gray-100"
        >
          <DropdownItem key="profile" className="h-14 gap-2 ">
            <p className="font-semibold"><NavLink to={`/profile/${data?.profile.id}`}>{data?.name}</NavLink></p>
          </DropdownItem>
          <DropdownItem key="settings"><NavLink to={`/profile/${data?.profile.id}`}>My Profile</NavLink></DropdownItem>
          <DropdownItem key="team_settings"><NavLink to={`/verify/${data?.id}`}> Verification</NavLink></DropdownItem>
          <DropdownItem key="analytics">Analytics</DropdownItem>
          <DropdownItem key="system">System</DropdownItem>
          <DropdownItem key="configurations">Configurations</DropdownItem>
          <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
          <DropdownItem
            key="logout"
            color="danger"
            onClick={logouthandler}
          >
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
