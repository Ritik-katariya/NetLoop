import React, { useState } from "react";
import { Input, Button, Card, CardBody } from "@nextui-org/react";
import { Plus, Trash2 } from "lucide-react";
import { useCreatePollMutation } from "../../../redux/api/poll";
import { memberInfo } from "../../../utils/auth";
import { useParams } from "react-router-dom";
import {toast, ToastContainer } from "react-toastify";
const PollForm = () => {
  const [createPollMutation, { loading }] = useCreatePollMutation();
  const [formData, setFormData] = useState({
    question: "",
    options: ["", ""],
  });
const memberId=memberInfo().id;
const exploreId=useParams().id;
  const handleQuestionChange = (e) => {
    setFormData({ ...formData, question: e.target.value });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const addOption = () => {
    if (formData.options.length < 12) {
      setFormData({
        ...formData,
        options: [...formData.options, ""],
      });
    }
  };

  const removeOption = (index) => {
    if (formData.options.length > 2) {
      const newOptions = formData.options.filter((_, i) => i !== index);
      setFormData({ ...formData, options: newOptions });
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const validOptions = formData.options.filter((opt) => opt.trim() !== "");

    if (!formData.question.trim()) {
      alert("Please enter a question");
      return;
    }

    if (validOptions.length < 2) {
      alert("Add at least two options");
      return;
    }
  try {
    await createPollMutation( {"question": formData.question, "options": validOptions,"memberId":memberId,"exploreId":exploreId});
    console.log("Poll Created:", {
      question: formData.question,
      options: validOptions,
    });
    setFormData({ question: "", options: ["", ""] });
    toast.success("Poll created successfully");
  } catch (error) {
    console.error(error); 
    toast.error("Failed to create poll");
    
  }
  };

  return (
    <div className="h-full flex items-center justify-center p-4">
      <Card className="w-full">
        <CardBody>
          <ToastContainer/>
          <h1 className="text-2xl font-bold mb-6 text-center">Create Poll</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label>
              Poll Question
              <Input
                placeholder="Enter your poll question"
                value={formData.question}
                onChange={handleQuestionChange}
                variant="bordered"
                fullWidth
              />
            </label>

            {formData.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <label>
                  {`Option ${index + 1}`}
                  <Input
                    placeholder={`Enter option ${index + 1}`}
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    variant="bordered"
                    fullWidth
                  />
                </label>

                {formData.options.length > 2 && (
                  <Button
                    isIconOnly
                    color="danger"
                    variant="light"
                    onClick={() => removeOption(index)}
                  >
                    <Trash2 size={20} />
                  </Button>
                )}
              </div>
            ))}

            {formData.options.length < 12 && (
              <Button
                color="primary"
                variant="light"
                onClick={addOption}
                startContent={<Plus size={20} />}
              >
                Add Option
              </Button>
            )}

            <Button color="primary" type="submit" fullWidth className="mt-4">
              Create Poll
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default PollForm;
