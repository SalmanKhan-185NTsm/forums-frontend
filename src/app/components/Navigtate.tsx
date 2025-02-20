"use client";
import Link from "next/link";
import UserCard from "./UserCard";
import { buttonVariants } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default function Navigate(props: any) {
  const { session } = props;
  const pathname = usePathname();
  return (
    <div className="w-[1280px] mx-auto">
      <div className="flex flex-col my-5">
        <UserCard user={session?.user} pagetype={"Home"} />
        <div className="my-2 flex gap-2">
          <Link
            className={`${
              pathname === "/posts/my-posts"
                ? buttonVariants({ variant: "default" })
                : buttonVariants({ variant: "outline" })
            }`}
            href="/posts/my-posts"
          >
            My Posts
          </Link>
          <Link
            className={`${
              pathname === "/posts/all"
                ? buttonVariants({ variant: "default" })
                : buttonVariants({ variant: "outline" })
            }`}
            href="/posts/all"
          >
            All Posts
          </Link>
          <Link
            className={`${
              pathname === "/posts/new"
                ? buttonVariants({ variant: "default" })
                : buttonVariants({ variant: "outline" })
            }`}
            href="/posts/new"
          >
            Add New Posts
          </Link>
        </div>
      </div>
    </div>
  );
}
