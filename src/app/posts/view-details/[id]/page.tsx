"use client";

import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Comments from "../../../components/comments/Comments";
import AddComment from "@/app/components/comments/AddComments";
interface CardProps {
  data: any;
}
interface Tags {
  id: string;
  name: string;
}

export default function PostDetails(props: any) {
  const postId = props.params.id as string;
  const [postData, setPostData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/posts/new");
    },
  });

  const refreshData = () => {
    setRefresh(!refresh);
  };
  const userId = session?.user?.userId;

  const handleDelete = async () => {
    try {
      const confirm = window.confirm("Are you sure? you want to delete");
      setLoading(true);
      if (confirm) {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/delete-post-by-id`;
        const response = await axios.delete(url, {
          data: { userId: userId, postId: postId },
        });
        if (response.data.status === 200) {
          setPostData("deleted");
        }
      }
    } catch (error) {
      setError("An error occurred,unable to delete");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    async function fetchPostData() {
      try {
        if (session) {
          const userId = session?.user?.userId;
          const body = { userId: userId, postId: postId };
          const url = `${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/get-posts-details`;
          const response = await axios.post(url, body);
          setPostData(response.data.data);
        }
      } catch (error) {
        setError("An error occurred, Please try again later");
      }
    }
    fetchPostData();
  }, [postId, session, refresh]);

  if (postData === "deleted") {
    return <div>Post deleted</div>;
  }
  if (error) {
    return <code>{error}</code>;
  }

  if (!postData) {
    return <div>Loading...</div>;
  }
  const postedDate: Date = new Date(postData.createdAt);
  return (
    <div className="w-[1280px] flex flex-col">
      <h1 className="text-3xl mb-10">Post Details / View</h1>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">{postData.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl">{postData.description}</div>
        </CardContent>

        <CardFooter className="flex items-start flex-col">
          <label className="text-xs">Posted By</label>
          <CardTitle className="mb-2 block">
            {postData?.postedByUserId?.username}
          </CardTitle>
          <label className="text-xs mb-6 block font-semibold">{`${postedDate.getDate()}-${postedDate.getMonth()}-${postedDate.getFullYear()}`}</label>
          <div className="flex flex-row flex-wrap gap-5 mb-5">
            {postData.tags?.map((data: Tags, index: number) => {
              return (
                <div
                  key={index}
                  className={`${buttonVariants({
                    variant: "outline",
                  })} p-10 `}
                >
                  <div className="">{data.name}</div>
                </div>
              );
            })}
          </div>
          {postData.postedByUserId.id === userId && (
            <>
              <div className="flex flex-row gap-5">
                <Button
                  disabled={loading}
                  onClick={() => handleDelete()}
                  className="bg-red-800 text-white hover:bg-red-700"
                >
                  Delete
                </Button>
                <Link
                  href={`/edit-details/${postData.postId}`}
                  className={`${buttonVariants({
                    variant: "outline",
                  })} bg-gray-600 text-white hover:bg-gray-500`}
                >
                  Edit
                </Link>
              </div>
            </>
          )}
        </CardFooter>
      </Card>
      <div className="my-10">
        <h2 className="text-2xl mb-5">Comments</h2>
        <Comments refresh={refresh} refreshData={refreshData} postData={{ postId }} />
        <div>
          <h2>Add Comment</h2>
          <AddComment
            refreshData={refreshData}
            userSession={session}
            postData={{ postId }}
          />
        </div>
      </div>
    </div>
  );
}
