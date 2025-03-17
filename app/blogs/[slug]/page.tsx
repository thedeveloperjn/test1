// app/blogs/[slug]/page.tsx
import { BASE_URL, PROJECT_ID, Image_url } from "../../config/constants";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { fetchAllPosts } from "../../utils/api";

import BlogBanner from "../../components/BlogBanner";
import ExploreOtherBlogs from "../../components/Exploreotherblogs";

interface BlogPost {
  title: string;
  banner: string;
  description: string;
  multipleDescriptions: {
    description: string;
    singleImage?: { image: string };
    youtube?: string;
    multipleImages?: string[];
    button?: { hyperLink: string; title: string };
  }[];
  seoDetails: {
    tags: string[];
  };
}

type PageParams = {
  slug: string;
};

async function fetchBlogData(slug: string): Promise<BlogPost | null> {
  const response = await fetch(
    `${BASE_URL}/website/post/get-post-by-slug/${PROJECT_ID}?slug=${slug}`,
    { next: { revalidate: 3600 } }
  );
  if (!response.ok) throw new Error("Failed to fetch blog");
  const result = await response.json();
  return result.data || null;
}

// Use a generic type to satisfy PageProps
export default async function BlogDetail({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const resolvedParams = await params;

  const [blog, allblogs] = await Promise.all([
    fetchBlogData(resolvedParams.slug),
    fetchAllPosts(),
  ]);

  if (!blog) {
    return <div className="text-white text-center py-20">Blog not found</div>;
  }

  const convertToEmbedUrl = (url: string) => {
    let videoId = "";
    if (url.includes("youtu.be")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    } else if (url.includes("youtube.com/watch")) {
      videoId = url.split("v=")[1]?.split("&")[0];
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-[1130px] mx-auto pb-20 mt-[20px] px-4">
        <h1 className="text-[#ffffff66] font-ibmplexmono !text-[14px] uppercase text-center tracking-[0.05rem] pt-20 pb-1 flex items-center justify-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#ffffff66] inline-block"></span>{" "}
          Blog
        </h1>
        <h3 className="text-[35px] md:text-[62px] text-white font-[100] -tracking-[0.01em] text-center pb-8 lg:pb-15 font-movatif leading-[50px] lg:leading-[70px]">
          {blog.title}
        </h3>
        <div className="flex flex-col lg:flex-row gap-[25px]">
          <div className="w-[100%] lg:w-[70%]">
            <BlogBanner banner={blog.banner} title={blog.title} />
            <div
              className="text-[#ffffff99] text-[16px] font-lighter text-justify tracking-[0.6px] leading-7 mt-6"
              dangerouslySetInnerHTML={{ __html: blog.description }}
            />
            <div className="description-block mt-10">
              {blog.multipleDescriptions?.map((item, index) => (
                <div key={index} className="single-description mb-8">
                  <div
                    className="text-[#ffffff99] text-[14px] md:text-[16px] font-lighter text-justify tracking-[0.6px] font-ibmplexmono"
                    dangerouslySetInnerHTML={{
                      __html: item.description
                        .replace(/(.*?):/g, "<strong>$1</strong>:")
                        .replace(/\n/g, "<br>"),
                    }}
                  />
                 {item.singleImage?.image && (
                  <div className="single-image-container mt-4">
                     <img
                  src={`${Image_url}${item.singleImage.image}`}
                  alt="Blog Image"
                  className="rounded-lg w-full"
                />
                  </div>
                )}
                  {item.youtube && (
                    <div className="youtube-container mt-6">
                      <iframe
                        width="100%"
                        height="433"
                        src={convertToEmbedUrl(item.youtube)}
                        title="YouTube video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                    </div>
                  )}
                  {item.multipleImages &&
                    item.multipleImages.length > 0 && (
                      <div
                        className={`gallery-container grid gap-4 mt-6 ${
                          item.multipleImages.length === 1
                            ? "grid-cols-1"
                            : item.multipleImages.length === 2
                            ? "grid-cols-2"
                            : item.multipleImages.length === 3
                            ? "grid-cols-3 grid-rows-2"
                            : item.multipleImages.length === 4
                            ? "grid-cols-2 grid-rows-2"
                            : "grid-cols-3 grid-rows-2"
                        }`}
                      >
                        {item.multipleImages.map((image, idx) => (
                          <div
                            key={idx}
                            className={`gallery-item overflow-hidden rounded-xl relative group ${
                              item.multipleImages.length === 3 && idx === 0
                                ? "col-span-2 row-span-2"
                                : item.multipleImages.length > 4 && idx === 0
                                ? "col-span-2 row-span-2"
                                : ""
                            }`}
                          >
                            <a
                              href={`${Image_url}${image}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <div className="relative w-full h-full min-h-[200px]">
                              <img
                      src={`${Image_url}${image}`}
                      alt="Blog Gallery"
                      className="w-full h-full object-cover rounded-xl transition-transform duration-300 ease-in-out group-hover:scale-105"
                    />
                                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                              </div>
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  {item.button?.hyperLink && item.button?.title && (
                    <div className="button mt-6">
                      <Link
                        href={item.button.hyperLink}
                        className="bg-white text-black py-2 px-6 rounded-lg inline-block"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.button.title}
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="w-[100%] lg:w-[30%] sticky self-start top-[90px]">
            <div className="bg-[#1a1a1a] p-5 mb-[25px] rounded-lg pb-6">
              <h3 className="text-lg text-[#ffffff99] mb-4 border-b border-[#ffffff33] pb-2">
                Explore Other Blogs
              </h3>
              <ExploreOtherBlogs
                allblogs={allblogs}
                currentSlug={resolvedParams.slug}
              />
            </div>
            <div className="bg-[#1a1a1a] p-5 rounded-lg pb-6">
              <h3 className="text-lg text-[#ffffff99] mb-4 border-b border-[#ffffff33] pb-2">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {blog.seoDetails.tags?.map((tag, index) => (
                  <Link
                    key={index}
                    href="#"
                    className="text-[#ffffff99] hover:text-white hover:bg-black cursor-context-menu bg-[#333] px-2 py-1 rounded-md"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}