import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Chart from "@/components/Chart";
import SectionBox from "@/components/layouts/SectionBox";
import { Event } from "@/models/Event";
import { Page } from "@/models/Page";
import { isToday } from "date-fns";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { FaLink } from "react-icons/fa6";
const AnalyticsPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/");
  }
  const page = await Page.findOne({ owner: session.user.email });

  const groupedViews = await Event.aggregate(
    [
      {
        $match: {
          type: "view",
          uri: page.uri,
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              date: "$createdAt",
              format: "%Y-%m-%d", // Corrected format
            },
          },
          count: {
            $count: {},
          },
        },
      },
      { $sort: {_id: 1} }
    ],
    
  );

  const clicks = await Event.find({
    page: page.uri,
    type: "click",
  });
  return (
    <>
      <SectionBox>
        <h2 className="text-xl mb-6 text-center">Views</h2>
        <Chart
          data={groupedViews.map((o) => ({
            date: o._id,
            views: o.count,
          }))}
        />
      </SectionBox>
      <SectionBox>
        <h2 className="text-xl mb-6 text-center">Clicks</h2>
        {page.links.map((link, index) => (
          <div
            key={index}
            className="border-t md:flex gap-6 items-center border-gray-200 py-4"
          >
            <div className="text-blue-500 pl-4">
              <FaLink size={25} />
            </div>
            <div className="grow">
              <h3>{link.title || "No title"}</h3>
              <p className="text-gray-700 text-sm">
                {link.subtitle || "No description"}
              </p>
              <Link
                className="text-xs text-blue-500"
                href={link.url}
                target="_blank"
              >
                {link.url}
              </Link>
            </div>
            <div className="flex text-center gap-4">
              <div className="border rounded-md p-2">
                <div className="text-2xl">
                  {
                    clicks.filter(
                      (c) => c.uri === link.url && isToday(c.createdAt)
                    ).length
                  }
                </div>
                <div className="text-gray-400 text-xs font-bold uppercase">
                  Clicks today{" "}
                </div>
              </div>
              <div className="border rounded-md p-2">
                <div className="text-2xl">
                  {clicks.filter((c) => c.uri === link.url).length}
                </div>
                <div className="text-gray-400 text-xs font-bold uppercase">
                  Clicks total{" "}
                </div>
              </div>
            </div>
          </div>
        ))}
      </SectionBox>
    </>
  );
};

export default AnalyticsPage;
