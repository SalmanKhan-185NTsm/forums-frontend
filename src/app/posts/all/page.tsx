import { options } from "../../api/auth/[...nextauth]/options";
import { Session } from "next-auth";
import { getServerSession } from "next-auth/next";
import UserCard from "../../components/UserCard";
import { redirect } from "next/navigation";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
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

export default async function AllPosts() {
  const session: (Session & { user: { userId: string } }) | null =
    await getServerSession(options);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/server");
  }

  const userId = session?.user?.userId;
  const body = { userId };
  const url = `${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/fetch-posts`;
  const response = await axios.get(url);
  console.log(response.data.data);
  const postData = response.data.data;

  return (
    <section className="w-[1280px] flex flex-col  items-start gap-6">
      {postData.map((data: CardProps) => {
        return <CardWithForm data={data} />;
      })}
    </section>
  );
}

export function CardWithForm({ data }: CardProps) {
  console.log("data is", data);
  const postedDate: Date = new Date(data.createdAt);
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">{data.title}</CardTitle>
        <CardDescription>{data.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <label className="text-xs">Posted By</label>
        <CardTitle>Salman</CardTitle>
        <label className="text-xs">{`${postedDate.getDate()}-${postedDate.getMonth()}-${postedDate.getFullYear()}`}</label>
      </CardContent>
      <CardFooter className="flex justify-between">
        {/* <Button variant="outline">Comment</Button> */}
        <Button>Read More</Button>
      </CardFooter>
    </Card>
  );
}
