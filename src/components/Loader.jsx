import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-200/80 z-50">
      <div className="flex gap-2">
        <div className="w-3 h-8 bg-purple-400  animate-bounce [animation-delay:0ms]"></div>
        <div className="w-3 h-8 bg-purple-500  animate-bounce [animation-delay:150ms]"></div>
        <div className="w-3 h-8 bg-purple-600  animate-bounce [animation-delay:300ms]"></div>
      </div>
    </div>
  );
};

export default Loader;
