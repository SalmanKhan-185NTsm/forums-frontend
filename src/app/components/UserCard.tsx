import Image from "next/image";

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

export default function Card({ user, pagetype }: Props) {
  const userImage = user?.image ? (
    <Image
      className="border-4 border-black dark:border-slate-500 drop-shadow-xl shadow-black rounded-full my-1"
      src={user?.image}
      width={80}
      height={80}
      alt={user?.name ?? "Profile Pic"}
      priority={true}
    />
  ) : null;

  return (
    <section className="bg-white p-2 w-[1280px] mx-auto border ">
      {/* {emailDisplay} */}
      <div className=" w-12/12 flex flex-row px-9  items-center gap-2 font-bold">
        {userImage}
        <div>
          <p>Welcome, {user?.name}</p>
          <p> {user?.email}</p>
        </div>

        {/* <p className="text-2xl text-center">{pagetype}</p> */}
      </div>
    </section>
  );
}
