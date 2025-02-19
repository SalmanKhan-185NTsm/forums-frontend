import { options } from "../../api/auth/[...nextauth]/options";
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

export default async function MyPosts() {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/server");
  }

  return (
    <section className="w-[1280px] flex flex-row items-start gap-6">
      {[1, 2, 3, 4].map((data) => {
        return <CardWithForm />;
      })}
    </section>
  );
}

export function CardWithForm() {
  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>Title 1</CardTitle>
        <CardDescription>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet,
          distinctio cumque ducimus cum natus consequuntur repellat quod eos,
          fugit deleniti hic autem culpa incidunt dolores? Delectus, officia.
          Soluta, fugiat consectetur..
        </CardDescription>
      </CardHeader>
      <CardContent>
      <label className="text-xs">Posted By</label>
        <CardTitle>Salman</CardTitle>
        <label className="text-xs">2021-10-10</label>
      </CardContent>
      <CardFooter className="flex justify-between">
        {/* <Button variant="outline">Comment</Button> */}
        <Button>Read More</Button>
      </CardFooter>
    </Card>
  );
}
