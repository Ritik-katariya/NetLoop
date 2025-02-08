import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import { removeTokenFromCookie } from "../../../utils/cookeeSet";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProfileDP({ data }) {
  function logouthandler() {
    removeTokenFromCookie();
    window.location.reload();
  }

  const { verified } = useSelector((state) => ({
    verified: state.member?.verified?.verified,
  }));

  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-all duration-200 hover:scale-105 shadow-md"
            src={data?.profile?.img}
          />
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Profile Actions"
          variant="flat"
          className="bg-white shadow-lg border border-gray-200 rounded-lg p-2 w-52"
        >
          {/* Profile Section */}
          <DropdownItem key="profile" className="h-14 gap-2 text-gray-800">
            <p className="font-semibold text-base">
              <NavLink to={`/profile/${data?.profile?.id}`} className="hover:text-primary transition-all duration-200">
                {data?.name}
              </NavLink>
             <span className="text-[12px] text-gray-500 block">
             {data?.email}
             </span>
            </p>
          </DropdownItem>

          {/* My Profile */}
          <DropdownItem key="settings">
            <NavLink to={`/profile/${data?.profile?.id}`} className="text-gray-700 hover:text-primary transition-all duration-200">
              My Profile
            </NavLink>
          </DropdownItem>

          {/* Verification */}
          <DropdownItem key="team_settings">
            {!verified ? (
              <NavLink to={`/verify/${data?.id}`} className="text-gray-700 hover:text-primary transition-all duration-200">
                Verification
              </NavLink>
            ) : (
              <p className="text-green-600 font-medium">Verified ✅</p>
            )}
          </DropdownItem>

          {/* Add Network (Only if verified) */}
          {data?.verified && (
            <DropdownItem key="add_network">
              <NavLink to={"/add-network"} className="text-gray-700 hover:text-primary transition-all duration-200">
                Add Network
              </NavLink>
            </DropdownItem>
          )}

          {/* Create Explore (Only if user has networks) */}
          {data?.networks?.length > 0 && (
            <DropdownItem key="create_explore">
              <NavLink to={`/create-explore/${data?.networks[0]?.explore?.id}`} className="text-gray-700 hover:text-primary transition-all duration-200">
                Create Explore
              </NavLink>
            </DropdownItem>
          )}

          {/* Query & Feedback */}
          <DropdownItem key="query_feedback">
            <NavLink to={"/query-feedback"} className="text-gray-700 hover:text-primary transition-all duration-200">
              Query & Feedback
            </NavLink>
          </DropdownItem>

          {/* Logout */}
          <DropdownItem
            key="logout"
            color="danger"
            onClick={logouthandler}
            className="hover:text-red-600 transition-all duration-200 font-semibold"
          >
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
