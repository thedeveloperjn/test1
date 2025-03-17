"use client";

import { useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";
import { X, Phone, Mail, Video, Menu, LucideMenu, Send } from "lucide-react";
import Link from "next/link";
import { useAuthSlice } from "../../store/main-store";
import { changeLoginModalType } from "../../store/action/login-modal";
import { Category } from "../../interfaces/categories/caegory";
import { useRouter } from "next/navigation";

// const navigationLinks = [
//   {
//     name: "SAREES",
//     link: "/products?category=saree&sort=NEW_ARRIVALS&collection=saree",
//   },
//   { name: "DHOTI", link: "" },
// ];

const navigationLinksStatic = [
  
  { name: "BLOGS", link: "blog" },
  // { name: "ABOUT US", link: "" },
  { name: "CONTACT US", link: "contact" },
];

export function SidebarDrawer({ categories }: { categories: Category[] }) {
  const [open, setOpen] = useState(false);
  const authToken = useAuthSlice((state) => state.authToken);
  const router = useRouter();
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <LucideMenu color="black" />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[80%] bg-gradient-to-b from-[#FFF0E3] via-white to-white duration-75 overflow-y-scroll [&>button]:hidden "
      >
        <SheetHeader className="flex flex-row border-b relative justify-between items-center h-10 space-y-0">
          <SheetTitle className="text-primary font-normal text-left text-sm h-full">
            Welcome To GiftingSaga
          </SheetTitle>

          <div
            className="h-full hover:cursor-pointer text-sm"
            onClick={() => setOpen(false)}
          >
            <X className="h-5 w-full  text-sm" />
          </div>
        </SheetHeader>
        <div className="mt-4">
          {/* Navigation Links */}
          <nav className="space-y-6">
            {categories.map((category, idx) => (
              <Link
                key={category._id}
                href={`/${category.slug}/new_arrivals/${category.slug}`}
                className="block text-sm font-normal hover:text-[#F3238A] text-black"
                onClick={() => setOpen(false)}
              >
                {category.name}
              </Link>
            ))}
            {navigationLinksStatic.map((link, idx) => (
              <Link
                key={link.name}
                href={`/${link.link.toLowerCase().replace(/\s+/g, "-")}`}
                className="block text-sm font-normal hover:text-[#F3238A] text-black"
                onClick={() => setOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Login/Register Button */}
          {!authToken && (
            <Button
              onClick={() => changeLoginModalType("MOBILE_INPUT")}
              className="w-full bg-[#C5A880] hover:bg-[#B39770] text-white rounded-full py-2 mt-6 text-xs"
            >
              LOGIN / REGISTER
            </Button>
          )}

          {/* Virtual Shopping Section */}
          <div className="mt-8 text-center bg-[#FFF8F1] p-2 py-6 rounded-lg">
            <h3 className="text-[#C5A880] text-lg mb-4 font-federo">
              VIRTUAL SHOPPING ?
            </h3>
            <p className="text-xs mb-4 text-[#5B5B5B] leading-loose">
              Explore our collection through a video call — book your virtual
              shopping slot today!
            </p>
            <Link
              href={"/virtual-shopping"}
              // variant="outline"
              className="border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 w-full border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000] hover:text-white rounded-full text-xs py-3"
            >
              <Video className="h-4 w-4" />
              BOOK A SLOT
            </Link>
          </div>

          {/* Support Section */}
          <div className="mt-8 text-center bg-[#FFF8F1] p-2 py-6 rounded-lg">
            <h3 className="text-[#C5A880] text-lg mb-4 font-federo">
              NEED SUPPORT ?
            </h3>
            <p className="text-xs mb-4 text-[#5B5B5B] leading-loose">
              Can't find the answers you Are looking for ? Please get in touch
              with us / Contact us.
            </p>

            {/* Contact Details */}

            <div className="space-y-4">
              <div className="flex items-center justify-start gap-2 text-[#8B0000]">
                <div className="flex justify-center items-center bg-white h-10 w-10 rounded-full border border-secondary text-[#F3238A] p-3">
                  <Phone className="h-full w-full fill-secondary stroke-none" />
                </div>

                <div className="text-start">
                  <span className="text-xs text-[#F3238A]">Contact Us</span>
                  <a
                    href="tel:+917771825000"
                    className="block text-xs hover:text-[#8B0000] text-[#5B5B5B] font-light"
                  >
                    +917771825000
                  </a>
                </div>
              </div>

              <div className="flex items-center justify-start gap-2 text-[#8B0000]">
                <div className="flex justify-center items-center bg-white h-10 w-10 rounded-full border border-secondary text-[#F3238A] p-3">
                  <Send className="h-full w-full" />
                </div>

                <div className="text-start">
                  <span className="text-xs text-[#F3238A]">Email</span>
                  <a
                    href="mailto:contact@giftingsaga.com"
                    className="block text-xs hover:text-[#8B0000] text-[#5B5B5B] font-light"
                  >
                   contact@giftingsaga.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
