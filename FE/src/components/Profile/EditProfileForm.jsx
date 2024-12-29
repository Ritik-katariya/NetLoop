import React, { useState } from "react";
import {
  Card,
  CardBody,
  Input,
  Button,
  Textarea,
  Chip,
  Divider,
} from "@nextui-org/react";
import Header from "../Shared/Header/Header";
import { useCreateProfileMutation } from "../../redux/api/profile";

export default function ProfileDetailsForm() {
    const [createProfileMutation] = useCreateProfileMutation();
    
  const [formData, setFormData] = useState({
    overview: "",
    hobbies: [],
    interests: [],
    skills: [],
    education: [
      {
        degree: "",
        college: "",
        start_date: "",
      },
    ],
    work: [
      {
        organization: "",
        position: "",
        start_date: "",
        end_date: "",
        description: "",
      },
    ],
  });

  const [hobbyInput, setHobbyInput] = useState("");
  const [interestInput, setInterestInput] = useState("");
  const [skillInput, setSkillInput] = useState("");

  const handleAddTag = (field, value) => {
    if (value.trim()) {
      setFormData({
        ...formData,
        [field]: [...formData[field], value.trim()],
      });

      // Reset the specific input field
      if (field === "hobbies") setHobbyInput("");
      if (field === "interests") setInterestInput("");
      if (field === "skills") setSkillInput("");
    }
  };

  const handleRemoveTag = (field, index) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((_, i) => i !== index),
    });
  };

  const handleAddEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        {
          degree: "",
          college: "",
          start_date: "",
        },
      ],
    });
  };

  const handleAddWork = () => {
    setFormData({
      ...formData,
      work: [
        ...formData.work,
        {
          organization: "",
          position: "",
          start_date: "",
          end_date: "",
          description: "",
        },
      ],
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
   
  const data=await createProfileMutation(formData);
  console.log(data)
//   if(data.data.susses)console.log("Profile created", data.data.susses)
// else console.log("Profile not created")
//     console.log(formData);
    // Handle form submission here
  };

  return (
    <div>
      <div className="fixed top-0 w-full z-[20]">
        <Header />
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl mx-auto space-y-6 p-4 bg-white mt-20 rounded-lg shadow-md mb-6"
      >
        <Card>
          <CardBody className="space-y-4">
            <h2 className="text-xl font-bold">Basic Information</h2>

            <Textarea
              label="Overview"
              placeholder="Write a brief overview about yourself"
              value={formData.overview}
              onChange={(e) =>
                setFormData({ ...formData, overview: e.target.value })
              }
              className="w-full"
            />

            <div className="space-y-2">
              <p className="text-sm font-medium">Hobbies</p>
              <div className="flex flex-wrap gap-2">
                {formData.hobbies.map((hobby, index) => (
                  <Chip
                    key={index}
                    onClose={() => handleRemoveTag("hobbies", index)}
                    variant="flat"
                  >
                    {hobby}
                  </Chip>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a hobby"
                  value={hobbyInput}
                  onChange={(e) => setHobbyInput(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && handleAddTag("hobbies", hobbyInput)
                  }
                />
                <Button onClick={() => handleAddTag("hobbies", hobbyInput)}>
                  Add
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Interests</p>
              <div className="flex flex-wrap gap-2">
                {formData.interests.map((interest, index) => (
                  <Chip
                    key={index}
                    onClose={() => handleRemoveTag("interests", index)}
                    variant="flat"
                  >
                    {interest}
                  </Chip>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add an interest"
                  value={interestInput}
                  onChange={(e) => setInterestInput(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && handleAddTag("interests", interestInput)
                  }
                />
                <Button
                  onClick={() => handleAddTag("interests", interestInput)}
                >
                  Add
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Skills</p>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <Chip
                    key={index}
                    onClose={() => handleRemoveTag("skills", index)}
                    variant="flat"
                  >
                    {skill}
                  </Chip>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && handleAddTag("skills", skillInput)
                  }
                />
                <Button onClick={() => handleAddTag("skills", skillInput)}>
                  Add
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card>
        <CardBody className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Education</h2>
            <Button onClick={handleAddEducation}>Add Education</Button>
          </div>

          {formData.education.map((edu, index) => (
            <div key={index} className="space-y-4">
              {index > 0 && <Divider />}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <lable>Degree
               <Input
                //   label="Degree"
                  placeholder="Enter degree"
                  value={edu.degree}
                  onChange={(e) => {
                    const newEducation = [...formData.education];
                    newEducation[index].degree = e.target.value;
                    setFormData({ ...formData, education: newEducation });
                  }}
                />
               </lable>
                <label>College
                <Input
                //   label="College"
                  placeholder="Enter college name"
                  value={edu.college}
                  onChange={(e) => {
                    const newEducation = [...formData.education];
                    newEducation[index].college = e.target.value;
                    setFormData({ ...formData, education: newEducation });
                  }}
                />
                </label>
               <lable>
               Start Date
               <Input
                  type="date"
                //   label=""
                  value={edu.start_date}
                  onChange={(e) => {
                    const newEducation = [...formData.education];
                    newEducation[index].start_date = e.target.value;
                    setFormData({ ...formData, education: newEducation });
                  }}
                />
               </lable>
              </div>
            </div>
          ))}
        </CardBody>
      </Card>

      <Card>
        <CardBody className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Work Experience</h2>
            <Button onClick={handleAddWork}>Add Work Experience</Button>
          </div>

          {formData.work.map((work, index) => (
            <div key={index} className="space-y-4">
              {index > 0 && <Divider />}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <lable>Organization
               <Input
                //   label="Organization"
                  placeholder="Enter organization name"
                  value={work.organization}
                  onChange={(e) => {
                    const newWork = [...formData.work];
                    newWork[index].organization = e.target.value;
                    setFormData({ ...formData, work: newWork });
                  }}
                />
               </lable>
               <lable>Position
               <Input
                //   label="Position"
                  placeholder="Enter position"
                  value={work.position}
                  onChange={(e) => {
                    const newWork = [...formData.work];
                    newWork[index].position = e.target.value;
                    setFormData({ ...formData, work: newWork });
                  }}
                />
               </lable>
                <lable>Start Date
                <Input
                  type="date"
                //   label="Start Date"
                  value={work.start_date}
                  onChange={(e) => {
                    const newWork = [...formData.work];
                    newWork[index].start_date = e.target.value;
                    setFormData({ ...formData, work: newWork });
                  }}
                />
                </lable>
                <lable>End Date
                <Input
                  type="date"
                //   label="End Date"
                  value={work.end_date}
                  onChange={(e) => {
                    const newWork = [...formData.work];
                    newWork[index].end_date = e.target.value;
                    setFormData({ ...formData, work: newWork });
                  }}
                />
                </lable>
                <Textarea
                  className="col-span-2"
                  label="Description"
                  placeholder="Enter job description"
                  value={work.description}
                  onChange={(e) => {
                    const newWork = [...formData.work];
                    newWork[index].description = e.target.value;
                    setFormData({ ...formData, work: newWork });
                  }}
                />
              </div>
            </div>
          ))}
        </CardBody>
      </Card>

      <div className="flex justify-center items-center ">
        <Button color="primary" type="submit" className="rounded-lg text-white hover:scale-105 ">
          Save Details
        </Button>
      </div>

        {/* Education and Work Experience sections */}
        {/* Keep the rest of the code the same */}
      </form>
    </div>
  );
}
