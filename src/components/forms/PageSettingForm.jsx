"use client";
import React, { useState } from "react";
import RadioTogglers from "../formItems/RadioTogglers";
import { IoIosColorPalette } from "react-icons/io";
import { FaImage } from "react-icons/fa6";
import Image from "next/image";
import SubmitButton from "../buttons/SubmitButton";
import { FaSave } from "react-icons/fa";
import {savePageSettings} from "../../actions/pageAction.js";
import toast from "react-hot-toast";
import SectionBox from "../layouts/SectionBox";
const PageSettingForm = ({ page, user }) => {
  const [bgColor, setbgColor] = useState(page.bgColor);
  const [bgType, setbgType] = useState(page.bgType);

  async function saveBaseSetting(formData){
    const result = await savePageSettings(formData);
    if (result) {
      toast.success("Saved!");
    }
    console.log("hey")
  }
 
  return (
    <div>
      <SectionBox>
        <form action={saveBaseSetting}>
          <div
            className="py-16 -m-4 flex justify-center items-center"
            style={{ backgroundColor: bgColor }}
          >
            <div className="flex items-center justify-center flex-col">
              <RadioTogglers
                defaultValue={page.bgType}
                options={[
                  {
                    value: "color",
                    icon: <IoIosColorPalette />,
                    label: "Color",
                  },
                ]}
                onChange={(val) => setbgType(val)}
              />

              {bgType === "color" && (
                <div className="bg-gray-200 shadow text-gray-700 p-2 mt-2">
                  <div className="mt-2 flex justify-center gap-2">
                    <span>Background color:</span>
                    <input
                      type="color"
                      onChange={(e) => setbgColor(e.target.value)}
                      name="bgColor"
                      defaultValue={page.bgColor}
                    />
                  </div>
                </div>
              )}
              {/* {bgType === "image" && (
              <div className="flex justify-center">
                <label className="bg-white shadow px-4 py-2 mt-2 cursor-pointer">
                  <input onChange={handleFileChange} type="file" name="image" className="hidden" />
                  Change Image
                </label>
              </div>
            )} */}
            </div>
          </div>
          <div className="flex justify-center -mb-12">
            <Image
              className="rounded-full relative -top-8 border-4 border-white shadow-lg shadow-black/50"
              src={user?.image}
              width={128}
              height={128}
              alt="profile"
            />
          </div>
          <div className="p-4">
            <label className="input-label" htmlFor="nameIn">
              Display Name
            </label>
            <input
              type="text"
              name="displayName"
              defaultValue={page.displayName}
              id="nameIn"
              placeholder="John Doe"
            />

            <label className="input-label" htmlFor="locationIn">
              Location
            </label>
            <input
              type="text"
              name="location"
              defaultValue={page.location}
              id="locationIn"
              placeholder="Somewhere in the world"
            />

            <label className="input-label" htmlFor="bioIn">
              Bio
            </label>
            <textarea
              name="bio"
              defaultValue={page.bio}
              id="bioIn"
              placeholder="Your bio goes here..."
            />
            <div className="max-w-[200px] mx-auto">
              <SubmitButton>
                <FaSave />
                <span>Save</span>
              </SubmitButton>
            </div>
          </div>
        </form>
      </SectionBox>
    </div>
  );
};

export default PageSettingForm;
