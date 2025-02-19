import React from "react";

const CopyPopup = ({ isVisible }: { isVisible: boolean }) => {
  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-12 left-1/2 -translate-x-1/2 bg-[#222222] text-white px-8 py-3 rounded-lg z-20"
    >
      Source Code Copied to Clipboard
    </div>
  );
};

export default CopyPopup;
