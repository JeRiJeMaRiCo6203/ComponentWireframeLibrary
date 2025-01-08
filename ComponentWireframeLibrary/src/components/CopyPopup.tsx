import React from "react";

interface CopyPopupProps {
  isVisible: boolean;
}

const CopyPopup = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded shadow-lg z-50">
      Source Code Copied to Clipboard
    </div>
  );
};

export default CopyPopup;
