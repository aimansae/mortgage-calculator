import React from "react";
type ButtonProps = {
  resetForm: () => void;
};
const ClearButton = ({ resetForm }: ButtonProps) => {
  return (
    <div className="mb-2">
      <button className="underline" onClick={resetForm}>
        Clear All
      </button>
    </div>
  );
};

export default ClearButton;
