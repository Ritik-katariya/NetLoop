import React, { useState } from "react";
import { Trash2, Plus, Check } from "lucide-react";
import { GiCheckMark } from "react-icons/gi";
import { Avatar } from "@nextui-org/react";
import { getTimeAgo } from "../../../utils/timeAgoCreate";
import OptionButton from "../../Profile/Posts/ThreeDot";
export default function Poll() {
  const [question, setQuestion] = useState("jkhjk");
  const [options, setOptions] = useState(["kljl", "kjhk"]);
  const [votes, setVotes] = useState({});
  const [userVoted, setUserVoted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleAddOption = () => {
    if (options.length < 12) {
      setOptions([...options, ""]);
    }
  };

  const handleRemoveOption = (index) => {
    if (options.length > 2) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleVote = (index) => {
    if (!userVoted) {
      const newVotes = { ...votes };
      newVotes[index] = (newVotes[index] || 0) + 1;
      setVotes(newVotes);
      setUserVoted(true);
      setShowResults(true);
    }
  };

  const getTotalVotes = () => {
    return Object.values(votes).reduce((a, b) => a + b, 0);
  };

  const getPercentage = (votes, index) => {
    const totalVotes = getTotalVotes();
    if (totalVotes === 0) return 0;
    return Math.round(((votes[index] || 0) / totalVotes) * 100);
  };


  const member=[]
const createdAt=""
const id=""
  return (
    <div className="w-[550px] h-[350px] mb-4 bg-white flex flex-col justify-start items-between  space-y-1 px-3 text-sm ">
       <div className="flex items-center justify-between p-4 bg-white w-full -p-2">
      <div className="flex items-center gap-3">
        <Avatar
          src={member?.profile?.img}
          size="md"
          className="border-2 border-primary"
        />
          <div className="flex flex-col">
            <div className="flex justify-start items-center gap-4">
            <h3 className="text-base font-semibold">{member?.name}</h3>
            {member?.verified && <GiCheckMark className="text-primary" />}
            <span className="text-xs text-gray-400 ml-2">
              {getTimeAgo(new Date(createdAt))}
            </span>
            </div>
           {member?.networks?.length > 0 && (<p className="text-[10px] text-gray-500">{member?.networks[0]?.name}</p>)}
          </div>
      </div>
      <OptionButton id={id} />
    </div>
      {question && options.some((opt) => opt.trim()) && (
        <div className=" pt-4">
          <h3 className="font-semibold mb-4">{question}</h3>
          <div className="space-y-3">
            {options.map(
              (option, index) =>
                option.trim() && (
                  <button
                    key={index}
                    onClick={() => handleVote(index)}
                    disabled={userVoted}
                    className="w-full"
                  >
                    <div className="relative border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                      <div
                        className={`flex justify-between items-center relative z-10 ${
                          userVoted ? "text-gray-600" : ""
                        }`}
                      >
                        <span>{option}</span>
                        {showResults && (
                          <span className="flex items-center gap-2">
                            {getPercentage(votes, index)}%
                            {userVoted && votes[index] && (
                              <Check size={16} className="text-green-500" />
                            )}
                          </span>
                        )}
                      </div>
                      {showResults && (
                        <div
                          className="absolute inset-0 bg-blue-100 rounded-lg opacity-20"
                          style={{ width: `${getPercentage(votes, index)}%` }}
                        />
                      )}
                    </div>
                  </button>
                )
            )}
          </div>

          {showResults && (
            <div className="mt-4 text-sm text-gray-500 text-center">
              {getTotalVotes()} votes
            </div>
          )}
        </div>
      )}
    </div>
  );
}
