import React, { useState } from "react";

const ReadMore = ({ text,length=20 }) => {
  const words = text.split(" ");
  const [isExpanded, setIsExpanded] = useState(false);

  // Show truncated text if more than 20 words
  const truncatedText = words.length > length ? words.slice(0, length).join(" ") + "..." : text;

  return (
    <p className="text-gray-700 text-sm leading-relaxed">
      {isExpanded ? text : truncatedText}{" "}
      {words.length > 10 && (
        <span
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-500 cursor-pointer font-semibold hover:underline"
        >
          {isExpanded ? "Less" : "More"}
        </span>
      )}
    </p>
  );
};

export default ReadMore;
