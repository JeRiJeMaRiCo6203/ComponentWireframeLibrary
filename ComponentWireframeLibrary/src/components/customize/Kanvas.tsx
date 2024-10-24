import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';

const Kanvas = ({ htmlContent }: { htmlContent: string }) => {
  return (
    <div className={`canvas bg-white w-full`}>
      {htmlContent && parse(htmlContent)} {/* Ensure the content is valid */}
    </div>
  );
};

export default Kanvas;