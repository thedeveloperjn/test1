import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

export function ProductListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <Card key={i} className="flex flex-col h-full animate-pulse">
          <CardHeader>
            <div className="aspect-square bg-gray-200 rounded-md mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          </CardHeader>
          <CardContent>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </CardContent>
          <CardFooter className="mt-auto flex justify-between items-center">
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded w-1/3"></div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
