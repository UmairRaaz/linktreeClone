"use client";
import React, { useState } from "react";
import SectionBox from "../layouts/SectionBox";
import { ReactSortable } from "react-sortablejs";
import { MdOutlineEmail } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import {
  FaDiscord,
  FaTiktok,
  FaYoutube,
  FaWhatsapp,
  FaGithub,
  FaTelegram,
  FaSave,
  FaTrash,
  FaGripLines,
} from "react-icons/fa";
import { CiPhone, CiInstagram, CiFacebook } from "react-icons/ci";
import SubmitButton from "../buttons/SubmitButton";
import { savePageButtons } from "@/actions/pageAction";
import toast from "react-hot-toast";

export const allButtons = [
  {
    key: "email",
    label: "e-mail",
    icon: <MdOutlineEmail size={20} />,
    placeholder: "test@email.com",
  },
  {
    key: "mobile",
    label: "mobile",
    icon: <CiPhone size={20} />,
    placeholder: "+92 123 123 123",
  },
  {
    key: "instagram",
    label: "instagram",
    icon: <CiInstagram size={20} />,
    placeholder: "https://www.instagram.com/...",
  },
  {
    key: "facebook",
    label: "facebook",
    icon: <CiFacebook size={20} />,
    placeholder: "https://www.facebook.com/...",
  },
  {
    key: "discord",
    label: "discord",
    icon: <FaDiscord size={20} />,
    placeholder: "https://www.discord.com/...",
  },
  {
    key: "tiktok",
    label: "tiktok",
    icon: <FaTiktok size={20} />,
    placeholder: "https://www.tiktok.com/...",
  },
  {
    key: "youtube",
    label: "youtube",
    icon: <FaYoutube size={20} />,
    placeholder: "https://www.youtube.com/...",
  },
  {
    key: "whatsapp",
    label: "whatsapp",
    icon: <FaWhatsapp size={20} />,
    placeholder: "https://www.whatsapp.com/...",
  },
  {
    key: "github",
    label: "github",
    icon: <FaGithub size={20} />,
    placeholder: "https://www.github.com/...",
  },
  {
    key: "telegram",
    label: "telegram",
    icon: <FaTelegram size={20} />,
    placeholder: "https://www.telegram.com/...",
  },
];
const PageButtonsForm = ({ page, user }) => {
  const pageSavedButtonsKeys = Object.keys(page.buttons);
  const pageSavedButtonsInfo = pageSavedButtonsKeys.map((k) =>
    allButtons.find((b) => b.key === k)
  );
  const [activeButtons, setactiveButtons] = useState(pageSavedButtonsInfo);
  const addButtonToProfile = (button) => {
    setactiveButtons((prevButtons) => {
      return [...prevButtons, button];
    });
  };
  const availableButtons = allButtons.filter(
    (b1) => !activeButtons.find((b2) => b1.key === b2.key)
  );
  const upperCase = (str) => {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
  };
  const saveButtons = async (formData) => {
    await savePageButtons(formData);
    toast.success("Success Saved!");
  };
  let removeButton = ({ key: keyToRemove }) => {
    setactiveButtons((prevButtons) => {
      return prevButtons.filter((button) => button.key !== keyToRemove);
    });
  };
  return (
    <SectionBox>
      <form action={saveButtons}>
        <h1 className="text-2xl font-bold mb-4">Buttons</h1>
        <ReactSortable
          handle=".handle"
          list={activeButtons}
          setList={setactiveButtons}
        >
          {activeButtons.map((b, index) => (
            <div key={index} className="md:flex items-center mb-4">
              <div className="w-48 flex h-full p-2 text-gray-700 gap-2 items-center handle">
                <FaGripLines
                  size={20}
                  className="cursor-pointer text-gray-400"
                />
                {b.icon}
                <span>{upperCase(b.label)}:</span>
              </div>
              <div className="grow flex">
                <input
                  type="text"
                  defaultValue={page.buttons[b.key]}
                  style={{ marginBottom: "0" }}
                  name={b.key}
                  placeholder={b.placeholder}
                />
                <button
                  onClick={() => removeButton(b)}
                  type="submit"
                  className="py-3 cursor-pointer px-4 bg-gray-300"
                >
                  <FaTrash size={15} />
                </button>
              </div>
            </div>
          ))}
        </ReactSortable>
        <div className="flex flex-wrap gap-2 mt-4 border-y py-4">
          {availableButtons.map((b, index) => (
            <button
              type="button"
              onClick={() => addButtonToProfile(b)}
              key={index}
              className="flex gap-2 p-2 bg-gray-200 items-center"
            >
              {b.icon}
              <span>{upperCase(b.label)}</span>
              <FaPlus size={15} />
            </button>
          ))}
        </div>
        <div className="max-w-xs mx-auto mt-8">
          <SubmitButton>
            <FaSave size={15} />
            <span>Save</span>
          </SubmitButton>
        </div>
      </form>
    </SectionBox>
  );
};

export default PageButtonsForm;
