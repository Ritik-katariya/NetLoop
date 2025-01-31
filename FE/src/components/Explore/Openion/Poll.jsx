import React, { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { useVoteOnPollMutation } from "../../../redux/api/poll";
import { memberInfo } from "../../../utils/auth";
import PostUserHeader from "../../Shared/PostHeader/PostUserHeader";
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


  const handleVote = async(index) => {
    if (!userVoted) {
    try {
      const res=await voteOnPoll({id,data:{optionIndex:index,memberId}}).unwrap();

    
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
    return ans;
  };


 
  return (
    <div className="w-[550px] h-[350px] mb-4 bg-white flex flex-col justify-start items-between  space-y-1 px-3 text-sm ">
          <PostUserHeader member={member} createdAt={createdAt} id={id} />
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
