"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LayoutProps {
  orderhistory: React.ReactNode;
  profilecomp: React.ReactNode;
}

export default function ProfileTabs({
  orderhistory,
  profilecomp,
}: LayoutProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const slug = searchParams.get("slug");
  const [activeTab, setActiveTab] = useState(slug || "order-history");

  useEffect(() => {
    if (slug) setActiveTab(slug);
  }, [slug]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    router.replace(`/profile?slug=${value}`);
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={handleTabChange}
      className="container mx-auto flex flex-col justify-center items-center pt-10 gap-10 "
    >
      <TabsList className="max-w-md bg-transparent shadow-md h-auto rounded-full p-0 ">
        <TabsTrigger
          value="order-history"
          className="w-80 font-federo data-[state=active]:bg-secondary bg-secondary/10 border border-secondary/10 text-black rounded-l-full  font-light lg:text-lg text-lg hover:text-black hover:bg-secondary/40 shadow-none data-[state=active]:shadow-none data-[state=active]:text-white h-12"
        >
          Order History
        </TabsTrigger>
        <TabsTrigger
          value="profile"
          className="w-80 font-federo data-[state=active]:bg-secondary bg-secondary/10 border border-secondary/10 text-black rounded-r-full font-light lg:text-lg text-lg hover:text-black hover:bg-secondary/40 shadow-none data-[state=active]:shadow-none data-[state=active]:text-white h-12"
        >
          Profile
        </TabsTrigger>
      </TabsList>
      <TabsContent value="order-history" className="w-full">
        {orderhistory}
      </TabsContent>
      <TabsContent value="profile" className="w-full">
        {profilecomp}
      </TabsContent>
    </Tabs>
  );
}
