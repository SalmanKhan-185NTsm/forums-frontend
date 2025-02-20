"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Comment {
  id: string;
  createdAt: string;
  content: string;
  commentedByUserId:
    | {
        id: string;
        username: string;
        email?: string;
      }
    | any;
}

interface Props {
  postData:
    | {
        postId: string;
      }
    | any;
  refresh: boolean;
  refreshData: any;
}
export default function Comments({ postData, refresh, refreshData }: Props) {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/");
    },
  });

  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/get-comments-for-post`,
          {
            postId: postData.postId,
          }
        );
        setComments(response.data.data);
      } catch (error) {
        console.error("Failed to fetch comments", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [refresh,postData.postId]);

  if (loading) {
    return <div>Loading comments...</div>;
  }
  const commentDate = (date: string) => {
    const createdDate = new Date(date);
    return `${createdDate.getDate()}-${createdDate.getMonth()}-${createdDate.getFullYear()} ${createdDate.getHours()}:${createdDate.getMinutes()} `;
  };
  const userId = session?.user?.userId;

  const handleDelete = async (commentId: string) => {
    try {
      const confirm = window.confirm("Are you sure? you want to delete");
      setLoading(true);
      if (confirm) {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/delete-comment`;
        const response = await axios.delete(url, {
          data: { userId: userId, commentId: commentId },
        });
        refreshData();
      }
    } catch (error) {
      setError("An error occurred,unable to delete");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {comments.map((comment, index) => (
        <Card key={"comments"+index} className="mb-8">
          <CardContent className="px-4 py-5 border m-5 rounded">
            {comment.content}
          </CardContent>
          <CardFooter className="flex justify-between px-5 py-1 mb-3">
            <CardDescription className="flex flex-col">
              <div className="font-bold">
                User: {comment.commentedByUserId.username}
              </div>
              <div className="font-semibold">
                Commented On: {commentDate(comment.createdAt)}
              </div>
            </CardDescription>
            {comment.commentedByUserId.id === userId && (
              <div>
                <Button
                  disabled={loading}
                  onClick={() => handleDelete(comment.id)}
                  className="bg-red-800 text-white hover:bg-red-700"
                >
                  Delete
                </Button>
              </div>
            )}
          </CardFooter>
        </Card>
      ))}
    </>
  );
}
