import React from "react";
import { useFormStatus } from "react-dom";
const SubmitButton = ({ children }) => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="bg-blue-500 disabled:bg-blue-200 text-white disabled:text-gray-200 py-2 px-4 mx-auto w-full flex gap-2 items-center justify-center"
    >
      {pending && (
        <span>Saving...</span>
      )}
      {!pending && children}
    </button>
  );
};

export default SubmitButton;
