import { options } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import UserCard from "./components/UserCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { buttonVariants } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(options);
  console.log(session);
  if (session) {
    redirect("/posts/all");
  }

  return (
    <>
      {session ? (
        <></>
      ) : (
        <>
          <div className="min-h-56 flex flex-col items-center justify-center ">
            <h1 className="text-5xl mb-5">Welcome To Community Forms</h1>
            <Link
              className="bg-black text-white p-5 my-2"
              href="/api/auth/signin"
            >
              {" "}
              Sign-in{" "}
            </Link>
          </div>
        </>
      )}
    </>
  );
}
