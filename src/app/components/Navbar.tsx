import Link from "next/link";
import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import Navigate from "./Navigtate";

export default async function Navbar() {
  const session = await getServerSession(options);

  return (
    <>
      <div className="bg-gray-300">
        <div className="w-[1280px] mx-auto">
          <nav className=" p-4 flex">
            <div className="title w-2/12">
              <h2 className="font-semibold">Community forums</h2>
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
          <Navigate session={session} />
        </>
      )}
    </>
  );
}
