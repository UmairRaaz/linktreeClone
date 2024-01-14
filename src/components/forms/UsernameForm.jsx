"use client";
import grabUsername from "@/actions/grabUsername";
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import UsernameFormResult from "../formResults/UsernameFormResult";
import { redirect } from "next/navigation";
import SubmitButton from "../buttons/SubmitButton";

const UsernameForm = ({ desiredUsername }) => {
  const [taken, setTaken] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setisLoading(true);
    const result = await grabUsername(formData);
    setisLoading(false);
    setTaken(result === false);
    if (result) {
      redirect("/account?created=" + formData.get("username"));
    }
  };
  return (
    <>
      <h1 className="text-4xl font-bold text-center mb-2 bg-red-700">
        Grab your username
      </h1>
      <p className="text-gray-500 text-center mb-6">Choose your username</p>

      <form action={handleSubmit}>
        <div className="max-w-xs mx-auto">
          <input
            className="block p-2 mx-auto border w-full mb-2 text-center"
            name="username"
            defaultValue={desiredUsername}
            type="text"
            placeholder="username"
          />
          {taken && <UsernameFormResult />}
          <SubmitButton>
            <span>Claim your username</span>
            <FaArrowRight size={20} />
          </SubmitButton>
        </div>
      </form>
    </>
  );
};

export default UsernameForm;
