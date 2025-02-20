import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

interface CardProps {
  data: any;
}
interface Tags {
  id: string;
  name: string;
}
export default function PostCard({ data }: CardProps) {
  const postedDate: Date = new Date(data.createdAt);
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">{data.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl">
          {data.description.length > 100
            ? `${data.description.substring(0, 100)}...`
            : data.description}
        </div>
      </CardContent>

      <CardFooter className="flex items-start flex-col">
        <label className="text-xs">Posted By</label>
        <CardTitle className="mb-2 block">
          {data?.postedByUserId?.username}
        </CardTitle>
        <label className="text-xs mb-6 block font-semibold">{`${postedDate.getDate()}-${postedDate.getMonth()}-${postedDate.getFullYear()}`}</label>
        <div className="flex flex-row flex-wrap gap-5 mb-5">
          {data.tags?.map((data: Tags, index: number) => {
            return (
              <div
                key={"posts_" + index}
                className={`${buttonVariants({
                  variant: "outline",
                })} p-10 `}
              >
                <div className="">{data.name}</div>
              </div>
            );
          })}
        </div>

        <Link
          className={buttonVariants({
            variant: "default",
          })}
          href={`/posts/view-details/${data.postId}`}
        >
          View More
        </Link>
      </CardFooter>
    </Card>
  );
}
