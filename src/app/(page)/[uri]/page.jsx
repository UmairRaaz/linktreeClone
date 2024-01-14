import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Page } from "@/models/Page";
import { User } from "@/models/User";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import {
  FaDiscord,
  FaTiktok,
  FaYoutube,
  FaWhatsapp,
  FaGithub,
  FaTelegram,
} from "react-icons/fa";
import { CiPhone, CiInstagram, CiFacebook } from "react-icons/ci";
import { FaLink } from "react-icons/fa6";
import { Event } from "@/models/Event";
export const buttonIcons = {
  email: <MdOutlineEmail size={20} />,
  mobile: <CiPhone size={20} />,
  instagram: <CiInstagram size={20} />,
  facebook: <CiFacebook size={20} />,
  discord: <FaDiscord size={20} />,
  tiktok: <FaTiktok size={20} />,
  youtube: <FaYoutube size={20} />,
  whatsapp: <FaWhatsapp size={20} />,
  github: <FaGithub size={20} />,
  telegram: <FaTelegram size={20} />,
};

function buttonLink(key,value){
  if(key === 'mobile'){
    return 'tel:'+value;
  }
  if(key === 'email'){
    return 'mailto:'+value;
  }
  return value;
}
const UserPage = async ({ params }) => {
  const uri = params.uri;
  await mongoose.connect(process.env.MONGO_URI);
  const page = await Page.findOne({ uri });
  const user = await User.find({ email: page.owner });
  const session = await getServerSession(authOptions);
  const result = await Event.create({uri: uri, page: uri , type : "view"})
  return (
    <div className="bg-blue-950 text-white min-h-screen">
      <div className="h-24" style={{ backgroundColor: page.bgColor }}></div>
      <div className="aspect-square w-36 h-36 mx-auto relative -top-16 -mb-12">
        <Image
          className="w-full h-full rounded-full object-cover"
          src={session.user.image}
          width={256}
          height={256}
          alt="avatar"
        />
      </div>

      <h2 className="text-2xl text-center mb-1">{page.displayName}</h2>
      <h3 className="text-lg text-white/75 flex gap-1 items-center justify-center">
        <FaLocationDot />
        <span>{page.location}</span>
      </h3>
      <div className="maz-w-xs mx-auto text text-center mt-2">
        <p>{page.bio}</p>
      </div>
      <div className="flex justify-center gap-2 pb-4 mt-4">
        {Object.keys(page.buttons).map((buttonKey, index) => (
          <Link
            href={buttonLink(buttonKey, page.buttons[buttonKey])}
            key={index}
            className="rounded-full border flex items-center justify-between gap-2 bg-white text-blue-950 p-2"
          >
            {buttonIcons[buttonKey]}
            {/* {page.buttons[buttonKey]} */}
          </Link>
        ))}
      </div>
      <div className="max-w-2xl grid md:grid-cols-2 gap-6 p-4 px-8 mx-auto ">
        {page.links.map((link, index) => (
          <Link
          ping={`${process.env.LOCALURL}api/click?url=${btoa(link.url)}+&page=${page.uri}`}
            key={index}
            href={link.url}
            target="_blank"
            className="bg-indigo-800 p-2 flex items-center "
          >
            <div className="bg-blue-700 aspect-square flex items-center justify-center w-12 h-12 relative -left-4">
              <FaLink size={20} />
            </div>
            <div className="flex items-center justify-center">
              <div>
                <h3>{link.title}</h3>
                <h3 className="text-white/50 text-xs mt-1">{link.subtitle}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserPage;
