import Image from "next/image";

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

export default function Card({ user, pagetype }: Props) {
  //console.log(user)

  const greeting = user?.name ? (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg font-bold text-5xl text-black">
      Hello {user?.name}!
    </div>
  ) : null;

  // const emailDisplay = user?.email ? (
  //     <div className="flex flex-col items-center p-6 bg-white rounded-lg font-bold text-5xl text-black">
  //         {user?.email}
  //     </div>
  // ) : null

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
        <p>Welcome, {user?.username}</p>
        {/* <p className="text-2xl text-center">{pagetype}</p> */}
      </div>
    </section>
  );
}
