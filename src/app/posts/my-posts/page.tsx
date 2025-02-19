import { options } from "../../api/auth/[...nextauth]/options";
import { Session } from "next-auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import * as React from "react";
import CardWithForm from "../all/page";
import axios from "axios";
interface Posts {
  id: string;
  name: string;
  description: string;
  // ... other properties
}
interface CardProps {
  data: any;
}

export default async function MyPosts() {
  const session: (Session & { user: { userId: string } }) | null =
    await getServerSession(options);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/server");
  }

  const userId = session?.user?.userId;
  const body = { userId };
  const url = `${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/get-posts-by-user-id`;
  const response = await axios.post(url, body);
  console.log(response.data.data);
  const postData = response.data.data;

  return (
    <section className="w-[1280px] flex flex-col items-start gap-6">
      {postData.map((data: CardProps) => {
        return <CardWithForm data={data} />;
      })}
    </section>
  );
}
