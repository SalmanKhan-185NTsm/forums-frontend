"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import EditPostForm from "../../components/Posts/EditPostForm";

export default function PostDetails() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/");
    },
  });
  console.log(session);
  return (
    <div className="w-[1280px] flex flex-col">
      <h1 className="text-3xl mb-5">Edit Details</h1>
      <EditPostForm userSession={session} />
    </div>
  );
}
