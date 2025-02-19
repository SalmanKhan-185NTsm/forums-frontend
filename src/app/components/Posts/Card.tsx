import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CardProps {
  data: any;
}
export default function CardWithForm({ data }: CardProps) {
  console.log("data is", data);
  const postedDate: Date = new Date(data.createdAt);
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">{data.title}</CardTitle>
        <CardDescription>{data.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <label className="text-xs">Posted By</label>
        <CardTitle>Salman</CardTitle>
        <label className="text-xs">{`${postedDate.getDate()}-${postedDate.getMonth()}-${postedDate.getFullYear()}`}</label>
      </CardContent>
      <CardFooter className="flex justify-between">
        {/* <Button variant="outline">Comment</Button> */}
        <Button>View Detailed</Button>
      </CardFooter>
    </Card>
  );
}
