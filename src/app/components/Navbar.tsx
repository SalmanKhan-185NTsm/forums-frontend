import Link from "next/link";
import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import UserCard from "./UserCard";
import { buttonVariants } from "@/components/ui/button";

export default async function Navbar() {
  const session = await getServerSession(options);
  console.log("data in session", session);
  return (
    <>
      <div className="bg-gray-300">
        <div className="w-[1280px] mx-auto">
          <nav className=" p-4 flex">
            <div className="title w-2/12">
              <h2>Community forms</h2>
            </div>

            <ul className="w-10/12 flex justify-end gap-8 font-bold">
              <li>
                <Link href="/">Home</Link>
              </li>
              {session ? (
                <>
                  <li>
                    <Link href="/api/auth/signout">Sign Out</Link>
                  </li>
                  <li>
                    <Link href="/server">Server</Link>
                  </li>
                  <li>
                    <Link href="/client">Client</Link>
                  </li>
                  <li>
                    <Link href="/extra">Extra</Link>
                  </li>
                </>
              ) : (
                <li>
                  <Link href="/api/auth/signin">Sign In</Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
      {session && (
        <>
          <div className="w-[1280px] mx-auto">
            <div className="flex flex-col my-5">
              <UserCard user={session?.user} pagetype={"Home"} />
              <div className="my-2 flex gap-2">
                <Link
                  className={buttonVariants({ variant: "outline" })}
                  href="/posts/my-posts"
                >
                  My Posts
                </Link>
                <Link
                  className={buttonVariants({ variant: "outline" })}
                  href="/posts/all"
                >
                  All Posts
                </Link>
                <Link
                  className={buttonVariants({
                    variant: "default",
                    className: "bg-black text-white",
                  })}
                  href="/posts/new"
                >
                  Add New Posts
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
