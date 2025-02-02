import React from "react";

export default function StoryComponent({  item }) {
 
  return (
    <div className="bg-primary w-16 rounded-full h-16 flex justify-center items-center">
      <div>
        <img src={item.img} alt={item.name} />
        hello 
      </div>
    </div>
  );
}
