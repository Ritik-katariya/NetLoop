import React, { useState } from 'react';
import { Trash2, Plus, Check } from 'lucide-react';

const WhatsAppPoll = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [votes, setVotes] = useState({});
  const [userVoted, setUserVoted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleAddOption = () => {
    if (options.length < 12) {
      setOptions([...options, '']);
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
    return Math.round((votes[index] || 0) / totalVotes * 100);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Poll Creation Section */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Ask a question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <div className="space-y-3">
          {options.map((option, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {options.length > 2 && (
                <button
                  onClick={() => handleRemoveOption(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>
          ))}
        </div>

        {options.length < 12 && (
          <button
            onClick={handleAddOption}
            className="mt-3 flex items-center gap-2 text-blue-500 hover:text-blue-600"
          >
            <Plus size={20} />
            <span>Add option</span>
          </button>
        )}
      </div>

      {/* Poll Display Section */}
      {question && options.some(opt => opt.trim()) && (
        <div className="border-t pt-4">
          <h3 className="font-semibold mb-4">{question}</h3>
          <div className="space-y-3">
            {options.map((option, index) => (
              option.trim() && (
                <button
                  key={index}
                  onClick={() => handleVote(index)}
                  disabled={userVoted}
                  className="w-full"
                >
                  <div className="relative border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                    <div className={`flex justify-between items-center relative z-10 ${userVoted ? 'text-gray-600' : ''}`}>
                      <span>{option}</span>
                      {showResults && (
                        <span className="flex items-center gap-2">
                          {getPercentage(votes, index)}%
                          {userVoted && votes[index] && <Check size={16} className="text-green-500" />}
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
            ))}
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
};

export default WhatsAppPoll;