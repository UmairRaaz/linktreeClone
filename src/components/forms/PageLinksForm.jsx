"use client";
import { useState } from "react";
import SubmitButton from "../buttons/SubmitButton";
import SectionBox from "../layouts/SectionBox";
import { FaSave, FaLink, FaPlus, FaGripLines, FaTrash } from "react-icons/fa";
import { ReactSortable } from "react-sortablejs";
import { savePageLinks } from "@/actions/pageAction";
import toast from "react-hot-toast";
const PageLinksForm = ({ page, user }) => {
  const [links, setLinks] = useState(page.links || []);
  const addNewLink = () => {
    setLinks((prev) => {
      return [
        ...prev,
        {
          key: Date.now().toString(),
          title: "",
          subtitle: "",
          icon: "",
          url: "",
        },
      ];
    });
  };
  const handleLinkChage = (keyOfLinkToChange, prop, ev) => {
    setLinks((prev) => {
      const newLinks = [...prev];
      newLinks.forEach((link) => {
        if (link.key === keyOfLinkToChange) {
          link[prop] = ev.target.value;
        }
      });
      return [...prev];
    });
  };
  let save = async () => {
    await savePageLinks(links);
    toast.success("Saved!");
  };
  const removeLink = (linkKeyToRemove) => {
    setLinks(prev => [...prev].filter(l => l.key !== linkKeyToRemove))
  }
  return (
    <SectionBox>
      <form action={save}>
        <h2 className="text-2xl font-bold mb-4">Links</h2>
        <button
          onClick={addNewLink}
          type="button"
          className="text-lg text-blue-500 flex gap-2 items-center"
        >
          <FaPlus
            size={20}
            className="bg-blue-500 aspect-square cursor-pointer text-white p-1 rounded-full"
          />
          <span>Add New</span>
        </button>
        <div>
          <ReactSortable handle=".handle" list={links} setList={setLinks}>
            {links.map((l, index) => (
              <div key={l.key} className="mt-8 md:flex items-center gap-6">
                <div className="handle">
                  <FaGripLines
                    size={20}
                    className="text-gray-700 mr-2 cursor-grab"
                  />
                </div>
                <div className="flex flex-col justify-center items-center">
                  <div>
                    <div className="bg-gray-300 p-2 rounded-full mb-4">
                      <FaLink size={20} className="text-gray-700" />
                    </div>
                  </div>
                  <button
                    onClick={()=>removeLink(l.key)}
                    type="button"
                    className="bg-gray-300 py-2 flex gap-2 items-center h-full px-3 rounded-md cursor-pointer"
                  >
                    <FaTrash size={15} />
                    <span>Remove this link</span>
                  </button>
                </div>

                <div className="grow">
                  <label htmlFor="" className="input-label">
                    Title:
                  </label>
                  <input
                    value={l.title}
                    onChange={(ev) => handleLinkChage(l.key, "title", ev)}
                    type="text"
                    placeholder="Enter title"
                  />
                  <label htmlFor="" className="input-label">
                    Subtitle:
                  </label>
                  <input
                    value={l.subtitle}
                    onChange={(ev) => handleLinkChage(l.key, "subtitle", ev)}
                    type="text"
                    placeholder="Enter subtitle"
                  />
                  <label htmlFor="" className="input-label">
                    Url:
                  </label>
                  <input
                    value={l.url}
                    onChange={(ev) => handleLinkChage(l.key, "url", ev)}
                    type="text"
                    placeholder="Enter url"
                  />
                </div>
              </div>
            ))}
          </ReactSortable>
        </div>
        <div className="border-t pt-4 mt-4">
          <div className="max-w-xs mx-auto">
            <SubmitButton>
              <FaSave size={20} />
              <span>Save</span>
            </SubmitButton>
          </div>
        </div>
      </form>
    </SectionBox>
  );
};

export default PageLinksForm;
