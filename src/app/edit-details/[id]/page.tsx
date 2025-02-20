"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import EditPostForm from "../../components/Posts/EditPostForm";
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
import axios from "axios";
import { useEffect, useState } from "react";
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
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/posts/new");
    },
  });

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
  }, [postId, session]);
  if (postData === "deleted") {
    return <div>Post deleted</div>;
  }
  if (error) {
    return <code>{error}</code>;
  }

  if (!postData) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-[1280px] flex flex-col">
      <h1 className="text-3xl mb-5">Edit Details</h1>
      <EditPostForm userSession={session} postData={postData} />
    </div>
  );
}
