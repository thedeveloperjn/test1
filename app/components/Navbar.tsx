"use client";
import { navdata } from "../data";
import { Button } from "../components/Button";
import { useQueryWithLoading } from "../hooks/useGlobalHook";
import { Product } from "../interfaces/product/product";
import { removeSession } from "../lib/session";
import { cn } from "../lib/utils";
import { useGetProductBySearch } from "../services/search/search";
import { useGetAllWishlist } from "../services/wishlist/wishlist";
import {
  changeAuthMobileNumber,
  changeAuthStatus,
  changeAuthToken,
} from "../store/action/auth";
import { changeLoginModalType } from "../store/action/login-modal";
import { useAuthSlice, useCartSlice } from "../store/main-store";
import { useGetAuthStatus } from "../store/selector/auth";
import { useGetLoginModalState } from "../store/selector/login-modal";
import { useUserSlice } from "../store/slice/user";
import { CATEGORY_API } from "../utils/constants/apiEndpoints";
import { getAllCategories } from "../utils/functions/service-functions/category";
import { useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import {
  FileText,
  Heart,
  HelpCircle,
  LogIn,
  LogOut,
  Search,
  Shield,
  ShoppingBag,
  User,
  User2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Key, SetStateAction, useEffect, useState } from "react";
import { AuthDialog } from "./cards/auth/AuthDialog";
import { Input } from "../ui/input";
import { LinkButton } from "../ui/Link";

import { SubNav } from "./topNavigation/sub-nav";
import { updateCartSummary } from "../store/action/cart";

export default function NavBar() {
  const { isAuthenticated } = useGetAuthStatus();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState("");
  const {
    isproductBySearchError,
    productBySearchData,
    productBySearchRefetch,
    isproductBySearchLoading,
  } = useGetProductBySearch({ search: searchInput, page: 1, limit: 12 });
  const loginModal = useGetLoginModalState();
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
 
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartDetails = useCartSlice((state) => state.cartDetails);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const router = useRouter();
  const authToken = useAuthSlice((state) => state.authToken);
  const { wishlistData, isWishlistLoading } = useGetAllWishlist();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const { isLoading, data: allCategoriesData } = useQueryWithLoading(
    [CATEGORY_API.ID],
    getAllCategories
  );
  const user = useUserSlice((state) => state);

  useEffect(() => {
    cartDetails && cartDetails?.cart && setCartCount(cartDetails?.cart?.length);
  }, [cartDetails?.cart]);

  useEffect(() => {
    wishlistData &&
      wishlistData?.length > 0 &&
      setWishlistCount(wishlistData?.length);
  }, [wishlistData, isWishlistLoading]);

  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };
  useEffect(() => {
    if (authToken && isAuthenticated) setIsLoggedIn(isAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);
      return () => window.removeEventListener("scroll", controlNavbar);
    }
  }, [lastScrollY]);

  const profileMenus = [
    {
      name: "Profile",
      href: "/profile",
      type: "function",
      action: () => router.push("/profile"),
      icon: <User2 className="w-6 h-6" />,
    },
    {
      name: "Wishlists",
      href: "/wishlist",
      type: "function",
      action: () => {
        authToken
          ? router.push("/wishlist")
          : changeLoginModalType("MOBILE_INPUT");
      },
      icon: <Heart className="w-6 h-6" />,
    },
    {
      name: "Logout",
      href: "/logout",
      type: "function",
      icon: <LogOut className="w-6 h-6" />,
      action: () => {
        updateCartSummary({ percentage: 0, paymentMode: "cod" });
        changeAuthStatus(false);
        changeAuthToken(null);
        changeAuthMobileNumber(null);
        removeSession();
        queryClient.invalidateQueries({ queryKey: ["_getAllWishlist"] });
      },
    },
  ];

  useEffect(() => {
    searchInput.trim() && productBySearchRefetch();
  }, [searchInput]);

  function getWish() {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) return "Good Morning";
    if (currentHour >= 12 && currentHour < 17) return "Good Afternoon";
    if (currentHour >= 17 && currentHour < 21) return "Good Evening";
    return "Good Night";
  }

  const onSearchChange = (e: { target: { value: SetStateAction<string> } }) => {
    setSearchInput(e.target.value);
  };

  const MenuItems = (
    menu: { name: string; icon: any },
    openMenu: string,
    authStatus: boolean
  ) => {
    switch (menu.name) {
      case "search":
        return (
          openMenu === "search" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute right-0 -mt-[4] w-64 bg-white p-4 rounded-lg shadow-lg text-black z-10"
            >
              <Input
                onChange={onSearchChange}
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="Search products..."
              />
              <div className="max-h-48 overflow-y-scroll mt-2">
                {productBySearchData?.map(
                  (cartItem: unknown, idx: Key | null | undefined) => (
                    <SearchProductOne
                      key={idx}
                      product={cartItem as unknown as Product}
                    />
                  )
                )}
              </div>
            </motion.div>
          )
        );
      case "avatar":
        return (
          openMenu === "avatar" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute right-0 mt-[2px] w-64 bg-white p-4 rounded-lg shadow-lg text-black z-10"
            >
              {authStatus && authToken ? (
                <>
                  <div className="pb-2 border-b">
                    <p className="text-lg">
                      {getWish()}! <span className="font-semibold">{user.name}</span>
                    </p>
                  </div>
                  {profileMenus.map((item, idx) => (
                    <div
                      key={idx}
                      className="py-2 hover:text-gray-600 cursor-pointer flex items-center gap-2"
                      onClick={item.action}
                    >
                      {item.icon}
                      {item.name}
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <p className="pb-2">Greetings! Welcome to our store!</p>
                  <div
                    className="py-2 hover:text-gray-600 cursor-pointer flex items-center gap-2"
                    onClick={() => changeLoginModalType("MOBILE_INPUT")}
                  >
                    <LogIn className="w-6 h-6" />
                    Login
                  </div>
                  <Link href="/signup" className="block py-2 hover:text-gray-600 flex items-center gap-2">
                    <User className="w-6 h-6" />
                    Signup
                  </Link>
                </>
              )}
            </motion.div>
          )
        );
      default:
        return null;
    }
  };

  if (isLoading) return null;

  if (allCategoriesData && allCategoriesData?.length >= 2)
    return (
      <nav
        className={cn(
          "border-b border-[#ffffff21] bg-black sticky top-0 z-40 flex h-[80px] items-center transition-transform duration-300",
          isVisible ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="flex h-full items-center justify-between w-full px-4 lg:px-18">
          {/* Logo */}
          <div>
          <Link href="/">
            <h2 className="font-[700] text-2xl text-white">ROLBOL</h2>
          </Link>
        </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden flex flex-col justify-between w-7 h-6"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <motion.div
              animate={mobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="bg-white h-[2px] w-7 rounded transition-all"
            />
            <motion.div
              animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="bg-white h-[2px] w-7 rounded transition-all"
            />
            <motion.div
              animate={mobileMenuOpen ? { rotate: -45, y: -14 } : { rotate: 0, y: 0 }}
              className="bg-white h-[2px] w-7 rounded transition-all"
            />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex h-full items-center justify-between">
          <nav role="navigation" className="h-full">
            <ul className="group flex h-full items-center justify-center gap-4 text-white *:text-[16px]">
              {navdata.map((item, index) => (
                <li
                  key={index}
                  className="relative group"
                  onMouseEnter={() => setOpenDropdown(index)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link href={item.link} className="relative flex items-center px-3 py-[14px] font-medium">
                    <span>{item.name}</span>
                    {item.dropdown && (
                      <motion.svg
                        className="ml-1 h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        animate={{ rotate: openDropdown === index ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.24 4.38a.75.75 0 01-1.08 0L5.23 8.27a.75.75 0 01.02-1.06z"
                          clipRule="evenodd"
                        />
                      </motion.svg>
                    )}
                  </Link>
                  <AnimatePresence>
                    {item.dropdown && openDropdown === index && (
                      <motion.ul
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="absolute left-0 min-w-[200px] px-3 py-5 bg-white font-[500] text-black shadow-xl overflow-hidden rounded-lg"
                      >
                        {item.dropdown.map((subItem, subIndex) => (
                          <li key={subIndex} className="px-4 py-2 hover:text-gray-600 text-[16px] whitespace-nowrap">
                            <Link href={subItem.link}>{subItem.title}</Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>
          </nav>

            {/* Desktop Icons */}
            <div className="ml-6 flex items-center gap-4">
              {[
                { name: "search", icon: Search },
                {
                  name: "wishlist",
                  icon: Heart,
                  function: () =>
                    authToken
                      ? router.push("/wishlist")
                      : changeLoginModalType("MOBILE_INPUT"),
                },
                { name: "cart", icon: ShoppingBag, function: () => router.push("/checkout") },
                { name: "avatar", icon: User },
              ].map((Icon, index) => (
                <div
                  key={index}
                  className="relative group"
                  onMouseLeave={() => setOpenMenu(null)}
                  onMouseEnter={() => setOpenMenu(Icon.name)}
                  onClick={Icon.function && Icon.function}
                >
                  <Icon.icon
                    className="text-white hover:text-gray-300"
                    size={24}
                    strokeWidth={1.5}
                  />
                  {Icon.icon === ShoppingBag && cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                  {Icon.icon === Heart && wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                  {!Icon.function && openMenu && MenuItems(Icon, openMenu, isLoggedIn)}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="absolute top-[80px] left-0 w-full h-[100vh] bg-black text-white lg:hidden">
              <ul className="flex flex-col items-start py-4">
          
                <li className="w-full py-2 px-4">
                  <div className="flex items-center gap-2">
                    <Search size={24} />
                    <Input
                      onChange={onSearchChange}
                      type="text"
                      className="bg-transparent border-b text-white"
                      placeholder="Search..."
                    />
                  </div>
                </li>
                <li className="w-full py-2 px-4">
                  <Link
                    href="/wishlist"
                    className="text-2xl flex items-center gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Heart size={24} /> Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
                  </Link>
                </li>
                <li className="w-full py-2 px-4">
                  <Link
                    href="/checkout"
                    className="text-2xl flex items-center gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <ShoppingBag size={24} /> Cart {cartCount > 0 && `(${cartCount})`}
                  </Link>
                </li>
                {isLoggedIn ? (
                  profileMenus.map((item, idx) => (
                    <li key={idx} className="w-full py-2 px-4">
                      <div
                        className="text-2xl flex items-center gap-2 cursor-pointer"
                        onClick={() => {
                          item.action();
                          setMobileMenuOpen(false);
                        }}
                      >
                        {item.icon} {item.name}
                      </div>
                    </li>
                  ))
                ) : (
                  <>
                    <li className="w-full py-2 px-4">
                      <div
                        className="text-2xl flex items-center gap-2 cursor-pointer"
                        onClick={() => {
                          changeLoginModalType("MOBILE_INPUT");
                          setMobileMenuOpen(false);
                        }}
                      >
                        <LogIn size={24} /> Login
                      </div>
                    </li>
                    <li className="w-full py-2 px-4">
                      <Link
                        href="/signup"
                        className="text-2xl flex items-center gap-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <User size={24} /> Signup
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>
        <AuthDialog
          isOpen={loginModal}
          onOpenChange={() => changeLoginModalType(null)}
        />
      </nav>
    );
}