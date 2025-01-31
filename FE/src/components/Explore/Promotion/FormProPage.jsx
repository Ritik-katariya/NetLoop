import React, { useState } from "react";
import {
  PlusIcon,
  LinkIcon,
  PaletteIcon,
  TypeIcon,
  EyeIcon,
} from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useParams } from "react-router-dom";
import { useCreatePromotionMutation } from "../../../redux/api/promotion";
import { memberInfo } from "../../../utils/auth";
import { toast,ToastContainer } from "react-toastify";
import { PromotionCard } from "./PromotionCard";

const PromotionCreator = () => {
  const memberId=memberInfo().id;
  const exploreId=useParams().id;
  const [createPromotion]=useCreatePromotionMutation();
  const [currentPromotion, setCurrentPromotion] = useState({
    backgroundColor: "#FF5733",
    textColor: "#FFFFFF",
    text: "",
    link: "",
    memberId:memberId,
    exploreId:exploreId
  });
  const [isPreview, setIsPreview] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const predefinedColors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33F6",
    "#33FFF6",
    "#F6FF33",
    "#FF3333",
    "#33FF33",
  ];

  const emojiList = [
    "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇",
    "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚",
  ];

  const handleSubmit = async() => {
    const formData = new FormData();
    Object.entries(currentPromotion).forEach(([key, value]) => {
      formData.append(key, value);
    });
    try {
      await createPromotion(formData);
      toast.success("Promotion created successfully!");
    } catch (error) {
      toast.error("Promotion creation failed. Please try again.");
    }
    setCurrentPromotion({
      backgroundColor: "#FF5733",
      textColor: "#FFFFFF",
      text: "",
      link: "",
    });
    setIsPreview(false);
  };



  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Create Promotion</h2>
        <button
          onClick={() => setIsPreview(!isPreview)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <EyeIcon size={20} />
          {isPreview ? "Edit" : "Preview"}
        </button>
      </div>

      {!isPreview ? (
        <div className="space-y-6">
          <div>
            <label className="flex items-center gap-2 mb-2 text-gray-700">
              <PaletteIcon size={20} />
              Background Color
            </label>
            <div className="flex gap-2 flex-wrap">
              {predefinedColors.map((color) => (
                <button
                  key={color}
                  onClick={() =>
                    setCurrentPromotion({ ...currentPromotion, backgroundColor: color })
                  }
                  className={`w-8 h-8 rounded-full transition-transform hover:scale-110 ${
                    currentPromotion.backgroundColor === color
                      ? "ring-2 ring-offset-2 ring-blue-500"
                      : ""
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
              <input
                type="color"
                value={currentPromotion.backgroundColor}
                onChange={(e) =>
                  setCurrentPromotion({
                    ...currentPromotion,
                    backgroundColor: e.target.value,
                  })
                }
                className="w-8 h-8"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 mb-2 text-gray-700">
              <TypeIcon size={20} />
              Text Color
            </label>
            <input
              type="color"
              value={currentPromotion.textColor}
              onChange={(e) =>
                setCurrentPromotion({
                  ...currentPromotion,
                  textColor: e.target.value,
                })
              }
              className="w-8 h-8"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 mb-2 text-gray-700">
              <TypeIcon size={20} />
              Promotion Text
            </label>
            <textarea
              value={currentPromotion.text}
              onChange={(e) =>
                setCurrentPromotion({ ...currentPromotion, text: e.target.value })
              }
              placeholder="Enter your promotion text..."
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>

          <div>
            <Button
              onPress={onOpen}
              className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Add Emoji
            </Button>
          </div>

          <div>
            <label className="flex items-center gap-2 mb-2 text-gray-700">
              <LinkIcon size={20} />
              Link (Optional)
            </label>
            <input
              type="url"
              value={currentPromotion.link}
              onChange={(e) =>
                setCurrentPromotion({ ...currentPromotion, link: e.target.value })
              }
              placeholder="https://example.com"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
          >
            <PlusIcon size={20} />
            Submit Promotion
          </button>
        </div>
      ) : (
        <PromotionCard promotion={currentPromotion} />
      )}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="md" backdrop="opaque">
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">Select Emoji</ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-8 gap-2">
                  {emojiList.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => {
                        setCurrentPromotion({
                          ...currentPromotion,
                          text: currentPromotion.text + emoji,
                        });
                        onClose();
                      }}
                      className="text-xl p-2 hover:bg-gray-200 rounded-lg"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default PromotionCreator;
