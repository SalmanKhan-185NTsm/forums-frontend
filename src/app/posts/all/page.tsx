import { options } from "../../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import UserCard from "../../components/UserCard";
import { redirect } from "next/navigation";

export default async function ServerPage() {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/posts/all");
  }

  return (
    <section className="flex flex-col gap-6">
      <h2>all posts</h2>
    </section>
  );
}
