import React from "react";
import { Card, CardBody, CardFooter, Avatar, Button } from "@nextui-org/react";
import { Tooltip } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { MdModeEditOutline } from "react-icons/md";

export default function PostView({post}) {
  // const post = {
  //   author: "John Doe",
  //   username: "@johndoe",
  //   timeAgo: "12h",
  //   content: "My First Post 🚀",
  //   likes: 2808,
  //   comments: 2804,
  //   shares: 128,
  //   image: "/api/placeholder/800/600",
  // };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
     {post?.image&& <img
           onClick={onOpen}
          src={post?.image}
          alt={`gallery-${"helo"}`}
          className="w-56 h-56 object-fill"
        />}
        {
          post?.video&&<video className="w-56 h-56" controls>
          <source src={post?.video} type="video/mp4" />
        </video>
        }
       
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="3xl"
        backdrop="opaque"
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
      >
        <ModalContent className="bg-[#ffffff97] ">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                My Post
                      </ModalHeader>
              <ModalBody>
                <div className="max-w-2xl mx-auto p-4">
                  <Card className="w-full">
                    <CardBody className="p-0">
                      {/* Header */}
                      <div className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-3">
                          <Avatar
                            src="/api/placeholder/40/40"
                            size="md"
                            className="rounded-full"
                          />
                          <div>
                            <p className="font-semibold">{post.author}</p>
                            <p className="text-small text-default-500">
                              {post.username}
                            </p>
                          </div>
                        </div>
                        <Button
                          isIconOnly
                          variant="light"
                          className="rounded-full"
                        >
                          <span className="text-xl">•••</span>
                        </Button>
                      </div>

                      {/* Post Content */}
                      <div className="px-4 py-2">
                        <p className="text-large">{post?.discription}</p>
                      </div>

                      {/* Image */}
                      <div className="w-full">
                        <img
                          src={post?.image}
                          alt="Post content"
                          className="w-full object-cover"
                        />
                      </div>

                      {/* Engagement Stats */}
                      <div className="flex justify-between items-center px-4 py-3">
                        <div className="flex gap-6">
                          <Tooltip content="Like">
                            <Button
                              variant="light"
                              className="flex items-center gap-1"
                            >
                              <span>👍</span>
                              {/* <span>{post.likes.toLocaleString()}</span> */}
                            </Button>
                          </Tooltip>

                          <Tooltip content="Comment">
                            <Button
                              variant="light"
                              className="flex items-center gap-1"
                            >
                              <span>💬</span>
                              {/* <span>{post.comments.toLocaleString()}</span> */}
                            </Button>
                          </Tooltip>

                          <Tooltip content="Share">
                            <Button
                              variant="light"
                              className="flex items-center gap-1"
                            >
                              <span>↗️</span>
                              {/* <span>{post.shares.toLocaleString()}</span> */}
                            </Button>
                          </Tooltip>
                        </div>

                        <Tooltip content="Save">
                          <Button
                            variant="light"
                            className="flex items-center gap-1"
                          >
                            <span>🔖</span>
                          </Button>
                        </Tooltip>
                      </div>

                      {/* Comment Input */}
                      <div className="px-4 py-3 border-t">
                        <div className="flex items-center gap-3">
                          <Avatar
                            src="/api/placeholder/32/32"
                            size="sm"
                            className="rounded-full"
                          />
                          <input
                            type="text"
                            placeholder="Add Comment"
                            className="w-full bg-gray-100 rounded-full px-4 py-2 text-sm"
                          />
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
