import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Button,
    useDisclosure,
  } from "@nextui-org/react";
import { IoNotifications } from "react-icons/io5";

  
  export default function NotificationPage() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
  
    return (
      <>
        <IoNotifications className='text-2xl' onClick={onOpen}/>
        <Drawer isOpen={isOpen} onOpenChange={onOpenChange} className="bg-[#ffffffa8] min-h-svh" backdrop="blur">
          <DrawerContent>
            {(onClose) => (
              <>
                <DrawerHeader className="flex flex-col gap-1">Notification</DrawerHeader>
                <DrawerBody>
               
                </DrawerBody>
               
              </>
            )}
          </DrawerContent>
        </Drawer>
      </>
    );
  }
  