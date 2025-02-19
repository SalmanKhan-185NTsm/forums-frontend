"use client";
import { useSession } from "next-auth/react";
import AddNewPostForm from "../../components/Posts/AddNewPostForm";
import { redirect } from "next/navigation";

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

export default function NewPost() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/posts/new");
    },
  });

  console.log(session);
  return (
    <div className="w-[1280px] flex flex-col">
      <h1 className="text-3xl">Create New Post</h1>
      <AddNewPostForm userSession={session} />
    </div>
  );
}
