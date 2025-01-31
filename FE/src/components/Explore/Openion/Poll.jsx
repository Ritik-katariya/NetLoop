import React, { useEffect, useState } from "react";
import { Trash2, Plus, Check } from "lucide-react";
import { GiCheckMark } from "react-icons/gi";
import { Avatar } from "@nextui-org/react";
import { getTimeAgo } from "../../../utils/timeAgoCreate";
import OptionButton from "../../Profile/Posts/ThreeDot";
import { useVoteOnPollMutation } from "../../../redux/api/poll";
import { memberInfo } from "../../../utils/auth";
export default function Poll({data}) {
  const memberId=memberInfo().id;
const {question, options, createdAt, member,id,totalvotes:totalVote,votes:vote,voter} = data;
  const [votes, setVotes] = useState([]);
  const [totalVotes, settotalVotes] = useState(0);
  const [userVoted, setUserVoted] = useState(false);
  const [showResults, setShowResults] = useState(false);
const [voteOnPoll]=useVoteOnPollMutation();

useEffect(() => {
  setVotes(vote);
  settotalVotes(totalVote);
  const hasVoted = voter?.some((v) => v.id === memberId);
  if(hasVoted){
    setUserVoted(true);
    setShowResults(true);
  }
},[data]); 
console.log(voter,"voter",data)

  const handleVote = async(index) => {
    if (!userVoted) {
    try {
      const res=await voteOnPoll({id,data:{optionIndex:index,memberId}}).unwrap();
      console.log(res,"vote on poll");
    
        setVotes(res?.data?.votes);
        settotalVotes(res?.data?.totalVotes);
       
      setUserVoted(true);
      setShowResults(true);
    } catch (error) {
      console.error(error,"Vote failed");
    }

    }
  };



  const getPercentage = ( index) => {
   
    if (totalVotes === 0) return 0;
    const ans= Math.round((votes[index] / totalVotes) * 100);
    console.log(ans,"votes");
    return ans;
  };


 
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
                              {getPercentage(index) >= 0 && `${getPercentage(index)}%`}
                              {userVoted && votes[index] > 0 && <Check size={16} className="text-green-500" />}
                            </span>
                          )}

                      </div>
                      {showResults && (
                        <div
                          className="absolute inset-0 bg-blue-100 rounded-lg opacity-20"
                          style={{ width: `${getPercentage( index)}%` }}
                        />
                      )}
                    </div>
                  </button>
                )
            )}
          </div>

          {showResults && (
            <div className="mt-4 text-sm text-gray-500 text-center">
              {totalVotes} votes
            </div>
          )}
        </div>
      )}
    </div>
  );
}
