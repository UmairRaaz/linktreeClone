'use server'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Page } from "@/models/Page";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export async function savePageSettings(formData) {
    mongoose.connect(process.env.MONGO_URI)
    const session = await getServerSession(authOptions)
    console.log(formData)
    if(session){
        const dataKeys = ['displayName', 'location', 'bio', 'bgType', 'bgColor']
        const dataToUpdate = {};
        for(const key of dataKeys){
            if(formData.has(key)){
                dataToUpdate[key] = formData.get(key);
            }
        }
        await Page.updateOne({owner : session?.user?.email}, dataToUpdate);
        return true
    }
    return false
}

export async function savePageButtons (formData){
    mongoose.connect(process.env.MONGO_URI)
    const session = await getServerSession(authOptions)
    const buttonValues = {}
    if(session){
        formData.forEach((value, key) => {
            buttonValues[key] = value;
        })
        const dataToUpdate = {buttons: buttonValues};
        await Page.updateOne(
            {owner:session?.user?.email},
            dataToUpdate
        )
        return true
    }
    return false
}

export async function savePageLinks(links){
    mongoose.connect(process.env.MONGO_URI)
    const session = await getServerSession(authOptions)
    if (session){
        await Page.updateOne(
            {owner: session?.user?.email},
            {links}
        )
    }
    else{
        return
    }
}
