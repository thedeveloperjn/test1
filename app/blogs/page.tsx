"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Image_url } from "../config/constants";
import { fetchAllPosts } from "../utils/api"; 
import Loading from "./loading";// Import the loading component

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedData = await fetchAllPosts();
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="max-w-[1130px] mx-auto pb-20">
      <h1 className="text-white font-ibmplexmono !text-[14px] uppercase text-center tracking-[0.05rem] pt-20 pb-1 flex items-center justify-center gap-2">
        <span className="h-2 w-2 rounded-full bg-white inline-block"></span> Blogs
      </h1>

      <p className="text-[40px] md:m-0  mx-[25px] md:text-[62px] text-white font-[100] -tracking-[0.01em] text-center pb-20 font-movatif leading-[70px]">
        Insights & Inspiration: Explore <br /> Our Recent Blogs
      </p>

      {loading ? (
        <Loading /> // Show loading skeleton while fetching data
      ) : (
        <div className="flex flex-wrap justify-center md:justify-start md:gap-[25px]">
          {data.map((item, index) => (
            <Link key={item.id ?? index} href={`/blogs/${item.seoDetails.slug}`}>
              <div className="w-[360px] mb-[25px] md:mb-[0px]">
                <Image
                  src={`${Image_url}${item.banner.image}`}
                  width={360}
                  height={202}
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "202px",
                    borderRadius: "12px",
                    marginBottom: "8px",
                  }}
                  unoptimized
                  alt={item.title}
                />
                <h2 className="text-white capitalize tracking-[0.5px] font-ibmplexmono">{item.title}</h2>
                <p className="text-[#71767f] capitalize">{item.subTitle}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
