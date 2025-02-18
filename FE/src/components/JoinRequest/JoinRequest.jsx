import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { MdPersonAdd } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import { useCreateJoinRequestMutation,useGetJoinRequestsByMemberQuery } from "../../redux/api/joinrequest";
import { memberInfo } from "../../utils/auth";
import { FaClockRotateLeft } from "react-icons/fa6";
import { useSelector } from "react-redux";



const professions = ["EMPLOYED", "UNEMPLOYED", "STUDENT", "OTHER"];

export default function JoinRequest({ id }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [profession, setProfession] = useState("");
  const [document, setDocument] = useState(null);
  const [enrollmentNo, setEnrollmentNo] = useState("");
  const [createJoinRequest, { isSuccess,isLoading }] = useCreateJoinRequestMutation();
  const {data:joinRequests}=useGetJoinRequestsByMemberQuery(memberInfo().id);
const memberId=memberInfo().id;
  const handleFileChange = (e) => {
    setDocument(e.target.files[0]);
  };
const {memberData}=useSelector(state=>state.member)
  const handleSubmit = async() => {
    if (!profession || !document || !enrollmentNo.trim()) {
      toast.error("⚠️ All fields are required!");
      return;
    }

    try {
      const formData = new FormData();
    formData.append("memberId", memberId);
    formData.append("networkId", id);
    formData.append("profession", profession);
    formData.append("document", document);
    formData.append("enrollmentNo", enrollmentNo);
     await createJoinRequest({ data: formData });
    
      toast.success("✅ Request sent successfully!");
      onOpenChange(false);
     window.location.reload();
      
    } catch (error) {
      toast.error("⚠️ Failed to send request!");
      console.error("Error sending request:", error);
    }
  };
// console.log(memberData,"network")
  return (
    <>
      <ToastContainer />
      <Button
        className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-medium rounded-lg px-5 py-2 flex items-center gap-2 shadow-lg transition-transform hover:scale-105"
        onPress={onOpen}
        isDisabled={(memberData?.networks[0]?.id===id)||(joinRequests?.length>0)}
      >
         {joinRequests?.length>0?<span className="flex items-center gap-2 text-teal-100">
<FaClockRotateLeft/> Request Sent
         </span>:(!memberData?.networks[0]?.id===id?<span className="flex items-center gap-2 ">
          <MdPersonAdd className="text-xl" /> Join Network
          </span>:<span className="flex items-center gap-2 ">
           Joined
          </span>)}
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="md" backdrop="blur">
        <ModalContent className="bg-white shadow-lg rounded-lg">
          {(onClose) => (
            <>
              <ModalHeader className="text-lg font-bold text-gray-800">
                Request to Join Network
              </ModalHeader>

              <ModalBody className="space-y-4 px-5">
                {/* Profession Selection */}
                <label className="text-sm font-semibold text-gray-700">
                  Select Profession
                </label>
                <select
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="" disabled>
                    Choose your profession
                  </option>
                  {professions.map((prof) => (
                    <option key={prof} value={prof}>
                      {prof}
                    </option>
                  ))}
                </select>

                {/* Enrollment Number Input */}
                <label className="text-sm font-semibold text-gray-700">
                  Enrollment Number
                </label>
                <Input
                  placeholder="Enter your enrollment number"
                  value={enrollmentNo}
                  onChange={(e) => setEnrollmentNo(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2"
                  required
                />

                {/* Document Upload */}
                <label className="text-sm font-semibold text-gray-700">
                  Upload Document
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="border border-gray-300 rounded-md p-2 w-full cursor-pointer bg-gray-100 file:bg-teal-500 file:text-white file:rounded-md file:px-4 file:py-2 hover:file:bg-teal-600"
                  required
                />
              </ModalBody>

              <ModalFooter className="px-5 pb-5">
                <Button
                  color="danger"
                  variant="flat"
                  onPress={onClose}
                  className="text-gray-700 hover:bg-gray-200"
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={handleSubmit}
                  disabled={isLoading||isSuccess}
                  className="bg-teal-500 hover:bg-teal-600 text-white font-medium px-4 py-2 rounded-lg"
                >
                 {isLoading?"Loading..":" Submit Request"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
