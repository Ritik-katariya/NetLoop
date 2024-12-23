import React from "react";

const PostComponent = () => {
  return (
    <div className="w-full bg-white h-[400px] p-2 px-3 text-sm">
      <div className="flex justify-between items-center ">
        <div className="flex justify-between items-center gap-2">
            <div className="w-14 h-14 rounded-full bg-gray-200">
                <img src="" alt="" />
            </div>
            <div className="flex flex-col justify-center items-start">
                <span className="flex justify-between items-center"><p>Name</p>
                    <p>date</p>
                </span>
                <span>info</span>
            </div>
        </div>
        <div>...</div>
      </div>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis sapiente quaerat dignissimos. Odio quae officia labore numquam architecto nostrum nihil?
      </div>
      <div className="w-full h-3/5 bg-gray-200"> </div>
      <div className="flex justify-between items-center">
        <div className="flex justify-evenly gap-3 items-center">
            <span>#</span>
            <span>#</span>
            <span>#</span>
        </div>
        <div>
            #
        </div>
      </div>
      <div>
        <div>
            <input type="text" name="comment" id="comment" placeholder="Comment" className="w-11/12 border-b-2 border-gray-500 " />
        </div>
      </div>
    </div>
  );
};

export default PostComponent;
