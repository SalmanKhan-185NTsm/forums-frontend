import { options } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import UserCard from "./components/UserCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type User =
  | {
      name?: string | null | undefined;
      email?: string | null | undefined;
      image?: string | null | undefined;
    }
  | undefined;

type Props = {
  user: User;
  pagetype: string;
};
export default async function Home() {
  const session = await getServerSession(options);
  console.log(session);
  return (
    <>
      {session ? (
        <div className="flex flex-col">
          <UserCard user={session?.user} pagetype={"Home"} />
          <div className="my-2 flex">
            <Tabs defaultValue="account" className="w-full border border-black">
              <TabsList>
                <TabsTrigger value="account">My Post</TabsTrigger>
                <TabsTrigger value="password">All Post</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                
                Make changes to your account here.
              </TabsContent>
              <TabsContent value="password">
                Change your password here.
              </TabsContent>
            </Tabs>
          </div>
        </div>
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
