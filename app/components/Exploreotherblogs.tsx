import Link from "next/link";
import { Image_url } from "../config/constants";
export default function ExploreOtherBlogs({ allblogs = [], currentSlug }) {
  return (
        <div className="space-y-4">
          {allblogs
            ?.filter((allblog) => allblog?.seoDetails?.slug !== currentSlug) // ✅ Use currentSlug instead of slug
            .slice(0, 5)
            .map((allblog) => (
              <Link
                key={allblog?.seoDetails?.slug}
                href={`/blogs/${allblog?.seoDetails?.slug}`}
                className="block group"
              >
                <div className="flex gap-3 items-center">
                  {/* Blog Image */}
                  <img
                    src={`${Image_url}${allblog?.banner?.image}`}
                    alt={allblog?.title}
                    className="w-20 h-20 object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Blog Title */}
                  <h4 className="text-[#ffffff99] text-sm font-medium group-hover:text-white transition-colors">
                    {allblog?.title}
                  </h4>
                </div>
              </Link>
            ))}
        </div>
      
  );
}
