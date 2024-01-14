import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import UsernameForm from "@/components/forms/UsernameForm";
import { Page } from "@/models/Page";
import mongoose from "mongoose";
import PageSettingForm from "@/components/forms/PageSettingForm";
import PageButtonsForm from "@/components/forms/PageButtonsForm";
import PageLinksForm from "@/components/forms/PageLinksForm";
import deepClone from 'deep-clone'
const AccountPage = async ({ searchParams }) => {
  
  const session = await getServerSession(authOptions);
  const desiredUsername = searchParams.desiredUsername;
  if (!session) {
    return redirect("/");
  }
  mongoose.connect(process.env.MONGO_URI)
  
  let page = await Page.findOne({owner : session?.user?.email})
  const leanPage = deepClone(page.toJSON())
  leanPage._id = leanPage._id.toString()
  
  if(page){
    return (
      <>
        <PageSettingForm page={leanPage} user={session.user}/>
        <PageButtonsForm page={leanPage} user={session.user}/>
        <PageLinksForm page={leanPage} user={session.user}/>
      </>
    )
  }
  return (
    <div className="">
      <UsernameForm desiredUsername={desiredUsername}/>
    </div>
  );
};

export default AccountPage;
