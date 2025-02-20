import * as React from "react";
import { options } from "../../api/auth/[...nextauth]/options";
import { Session } from "next-auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import axios from "axios";
import CardWithForm from "@/app/components/Posts/Card";
interface Posts {
  id: string;
  name: string;
  description: string;
  // ... other properties
}
interface CardProps {
  data: any;
}

export default async function MyPost() {
  const session: (Session & { user: { userId: string } }) | null =
    await getServerSession(options);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/server");
  }

  const userId = session?.user?.userId;
  const body = { userId:userId };
  const url = `${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/get-posts-by-user-id`;
  const response = await axios.post(url,body);
  const postData = response.data.data;
  return (
    <section className="w-[1280px] flex flex-col  items-start gap-6">
      {postData.length === 0 && <h2>You have No Posts</h2>}
      {postData.map((data: CardProps) => {
        return <CardWithForm data={data} />;
      })}
    </section>
  );
}
