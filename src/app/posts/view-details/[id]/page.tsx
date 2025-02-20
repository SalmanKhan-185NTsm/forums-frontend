"use client";
import { useSession } from "next-auth/react";
import AddNewPostForm from "../../../components/Posts/AddNewPostForm";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

type User =
  | {
      name?: string | null | undefined;
      email?: string | null | undefined;
      image?: string | null | undefined;
      username?: string | null | undefined;
      userId?: string | null | undefined;
    }
  | undefined;

type Props = {
  user: User;
  pagetype: string;
};

interface CardProps {
  data: any;
}
interface Tags {
  id: string;
  name: string;
}
// TODO
// API fetch the post details
// delete functionality
// edit functionality
// comment functionality
// user check for operations

export default function PostDetails() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/posts/new");
    },
  });

  console.log(session);
  return (
    <div className="w-[1280px] flex flex-col">
      <h1 className="text-3xl mb-10">Post Details / View</h1>
      <CardDetails
        data={{
          postId: "bc00de08-d3ba-4bfe-b45a-4d2fd78e6e4e",
          title: "Top Gear",
          description: "this is very nice show",
          tags: [
            {
              id: "ideab33db07170a",
              name: "racing ",
            },
            {
              id: "ide0d5077fe005a",
              name: "awesomeness",
            },
            {
              id: "id4b381482bc568",
              name: "humor",
            },
          ],
          createdAt: "2025-02-20T07:13:57.557Z",
          postedByUserId: {
            id: "bcc7879b-26f1-49e2-8120-82d73bac9a11",
            username: "SalmanKhan-185NTsm",
            email: "salmankhans185@gmail.com",
          },
        }}
      />
    </div>
  );
}

function CardDetails({ data }: CardProps) {
  const postedDate: Date = new Date(data.createdAt);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">{data.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl">{data.description}</div>
      </CardContent>

      <CardFooter className="flex items-start flex-col">
        <label className="text-xs">Posted By</label>
        <CardTitle className="mb-2 block">
          {data?.postedByUserId?.username}
        </CardTitle>
        <label className="text-xs mb-6 block font-semibold">{`${postedDate.getDate()}-${postedDate.getMonth()}-${postedDate.getFullYear()}`}</label>
        <div className="flex flex-row flex-wrap gap-5 mb-5">
          {data.tags?.map((data: Tags, index: number) => {
            return (
              <div
                className={`${buttonVariants({
                  variant: "outline",
                })} p-10 `}
              >
                <div className="">{data.name}</div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-row gap-5">
          <Button className="bg-red-800 text-white hover:bg-red-700">
            Delete
          </Button>
          <Link
            href={`/edit-details/${data.postId}`}
            className={`${buttonVariants({
              variant: "outline",
            })} bg-gray-600 text-white hover:bg-gray-500`}
          >
            Edit
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
