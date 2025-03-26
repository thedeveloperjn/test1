"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Table, TableBody, TableCell, TableRow } from "../../../components/ui/table";
import { cn } from "../../../lib/utils";
import { useState } from "react";

import MoreInfoCard from "../../../components/cards/morinfo/more-info-card";

type Specification = {
  key: string;
  value: string;
} | null;

interface ProductSpecificationsProps {
  specifications: Specification[];
}

export function ProductSpecifications({
  specifications,
}: ProductSpecificationsProps) 
{
  const [activeTab, setActiveTab] = useState("specs");

  const [fileName, setFileName] = useState<string | null>(null);  

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    }
  };
  return (
    <div className="my-8">
      <h2 className="text-2xl font-federo mb-8 text-[#3a3a3a]">
        Product Specifications
      </h2>
      <Tabs
        defaultValue="specs"
        className="w-full flex flex-col sm:flex-row"
        onValueChange={setActiveTab}
      >
        <TabsList className="sm:flex-col h-auto justify-start items-start gap-2 rounded-none bg-transparent pb-2 sm:p-0 ">
          <TabsTrigger
            value="specs"
            className="flex flex-col items-start sm:min-w-44 sm:w-44 w-auto justify-start rounded-none border-b-transparent bg-transparent px-4 py-2 data-[state=active]:font-normal font-light text-left text-[#969696] data-[state=active]:border-b-secondary data-[state=active]:text-black shadow-none data-[state=active]:shadow-none sm:text-lg pl-0"
          >
            Product Specs
            {activeTab === "specs" && (
              <div className="w-14 bg-secondary h-0.5 mt-1" />
            )}
          </TabsTrigger>
          <TabsTrigger
            value="more-info"
            className="flex flex-col items-start sm:min-w-44 sm:w-44 w-auto justify-start rounded-none border-b-transparent bg-transparent px-4 py-2 data-[state=active]:font-normal font-light text-left text-[#969696] data-[state=active]:border-b-secondary data-[state=active]:text-black shadow-none  data-[state=active]:shadow-none sm:text-lg pl-0"
          >
            More Info
            {activeTab === "more-info" && (
              <div className="w-14 bg-secondary h-0.5 mt-1" />
            )}
          </TabsTrigger>
        </TabsList>
        <div className="flex-grow sm:w-3/4">
          <TabsContent value="specs" className="mt-0 sm:mt-0 sm:ml-6">
            <div className=" grid sm:grid-cols-2 gap-4">
              <Table>
                <TableBody className="border border-[#F7F7F7] p-0">
                  {specifications
                    .slice(0, Math.ceil((specifications.length + 1) / 2))
                    .map(
                      (spec, index) =>
                        spec && (
                          <TableRow
                            key={spec.key}
                            className="border-none p-0 grid grid-cols-2"
                            // className="border-b border-dashed border-[#D9D9D9]"
                          >
                            <TableCell className="col-span-1 w-full sm:text-base text-xs font-normal text-gray-400 bg-white  font-open-sans pl-5 pr-0 py-0">
                              <div
                                className={cn(
                                  " py-5 w-full h-full border-b border-dashed border-[#D9D9D9] text-wrap",
                                  {
                                    "border-transparent":
                                      Math.ceil(
                                        (specifications.length + 1) / 2
                                      ) ===
                                      index + 1,
                                  }
                                )}
                              >
                                {spec.key.charAt(0).toUpperCase() +
                                  spec.key.slice(1)}
                              </div>
                            </TableCell>
                            <TableCell className="col-span-1 w-full bg-[#FFF8F3] font-medium sm:text-base text-xs text-black font-open-sans capitalize px-0  py-0 pr-2">
                              <div
                                className={cn(
                                  " pl-4  py-3 w-full  h-full border-b border-dashed border-[#D9D9D9] capitalize line-clamp-1",
                                  {
                                    "border-transparent":
                                      Math.ceil(
                                        (specifications.length + 1) / 2
                                      ) ===
                                      index + 1,
                                  }
                                )}
                              >
                                <input type="text" className="h-10 w-[96%] bg-[#FFF8F3] focus:outline-none p-2" placeholder="Write Your Text Here ..."/>
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                    )}
                </TableBody>
              </Table>
              <Table>
                <TableBody className="border border-[#F7F7F7]">
                  {specifications
                    .slice(Math.ceil((specifications.length + 1) / 2))
                    .map(
                      (spec, index) =>
                        spec && (
                          <TableRow
                            key={spec.key}
                            className="border-none p-0 grid grid-cols-2"
                            // className="border-b border-dashed border-[#D9D9D9]"
                          >
                            <TableCell className="col-span-1 w-full sm:text-base text-xs font-normal text-gray-400 bg-white  font-open-sans pl-5 pr-0 py-0">
                              <div
                                className={cn(
                                  " py-5 w-full h-full border-b border-dashed border-[#D9D9D9] text-wrap",
                                  {
                                    "border-transparent":
                                      specifications.slice(
                                        Math.ceil(
                                          (specifications.length + 1) / 2
                                        )
                                      ).length ===
                                      index + 1,
                                  }
                                )}
                              >
                                {spec.key.charAt(0).toUpperCase() +
                                  spec.key.slice(1)}
                              </div>
                            </TableCell>
                            <TableCell className="col-span-1 w-full bg-[#FFF8F3] font-medium sm:text-base text-xs text-black font-open-sans capitalize px-0  py-0 pr-2">
                              <div
                                className={cn(
                                  " pl-2  py-3 w-full  h-full border-b border-dashed border-[#D9D9D9] capitalize line-clamp-1",
                                  {
                                    "border-transparent":
                                      specifications.slice(
                                        Math.ceil(
                                          (specifications.length + 1) / 2
                                        )
                                      ).length ===
                                      index + 1,
                                  }
                                )}
                              >
<div className="justify-center flex ">
{!fileName ? (
  <label
        htmlFor="fileInput"
        className="cursor-pointer bg-[#FFFFFF] border-[#F3238A] border text-[#F3238A] px-8 py-2 rounded-full hover:bg-[#F3238A] hover:text-[#FFFFFF]  transition  text-4 "
        >
        Attach Here
      </label>

):(
  <>
  <p className="text-gray-700 py-2">{fileName}</p>
  <button
        onClick={() => setFileName(null)}
        className=" pl-8 pr-1 py-1  transition text-gray-700"
        >
        X
      </button>
        </>
)}

      <input
        id="fileInput"
        type="file"
        className="hidden"
        onChange={handleFileChange}
        />
        </div>
                                 {/* <input type="file" className=" h-10 w-[96%]  focus:outline-none p-2" placeholder="Write Your Text Here ..."/> */}
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                    )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          <TabsContent value="more-info" className="mt-0 sm:mt-0 sm:ml-6">
            <MoreInfoCard />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
