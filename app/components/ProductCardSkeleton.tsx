import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ProductCardSkeleton() {
  return (
    <Card className=" overflow-hidden flex flex-col animate-pulse">
      <div className=" w-full aspect-video bg-gray-300"></div>
      <CardHeader>
        <CardTitle>
          <div className="w-3/4 h-6 rounded-full bg-gray-300"></div>
        </CardTitle>
        <CardDescription>
          <div className="w-1/2 h-4 rounded-full bg-gray-300"></div>
        </CardDescription>
        <CardContent className="space-y-2">
          <div className="w-full h-4 rounded-full bg-gray-300"></div>
          <div className="w-full h-4 rounded-full bg-gray-300"></div>
          <div className="w-3/4 h-4 rounded-full bg-gray-300"></div>
        </CardContent>
      </CardHeader>
      <CardFooter>
        <Button disabled size="lg" className="w-full"></Button>
      </CardFooter>
    </Card>
  );
}
