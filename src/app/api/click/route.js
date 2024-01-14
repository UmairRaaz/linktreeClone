import { Event } from "@/models/Event";
import mongoose from "mongoose";

export async function POST(req){
    mongoose.connect(process.env.MONGO_URI)
    const url = new URL(req.url)
    const page = url.searchParams.get("page")
    const clickedUrl = atob(url.searchParams.get("url"))
    await Event.create({type: "click", uri : clickedUrl, page })
    return Response.json(true)
}