"use client";

import { navdata } from "../data";
import { Button } from "../components/Button";

import { useQueryWithLoading } from "../hooks/useGlobalHook";
import { removeSession } from "../lib/session";
import { cn } from "../lib/utils";
import {
  changeAuthMobileNumber,
  changeAuthStatus,
  changeAuthToken,
} from "../store/action/auth";
import { changeLoginModalType } from "../store/action/login-modal";
import { useAuthSlice } from "../store/main-store";
import { useGetAuthStatus } from "../store/selector/auth";
import { useGetLoginModalState } from "../store/selector/login-modal";
import { useUserSlice } from "../store/slice/user";
import { CATEGORY_API } from "../utils/constants/apiEndpoints";
import { getAllCategories } from "../utils/functions/service-functions/category";
import { useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import {
  FileText,
  HelpCircle,
  LogIn,
  LogOut,
  Search,
  Shield,
  User,
  User2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Key, SetStateAction, useEffect, useState, useRef } from "react";
import { AuthDialog } from "./cards/auth/AuthDialog";
import { Input } from "../ui/input";
import { LinkButton } from "../ui/Link";
import { updateCartSummary } from "../store/action/cart";

// Import the Sidebar component
import Sidebar from "../myprofile/components/Sidebar"; // Adjust the import path as needed

export default function NavBar() {
  const { isAuthenticated } = useGetAuthStatus();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const loginModal = useGetLoginModalState();
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const authToken = useAuthSlice((state) => state.authToken);
  const queryClient = useQueryClient();
  const { isLoading, data: allCategoriesData } = useQueryWithLoading(
    [CATEGORY_API.ID],
    getAllCategories
  );
  const user = useUserSlice((state) => state);

  // State for Sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (authToken && isAuthenticated) {
      setIsLoggedIn(isAuthenticated);
    }
  }, [isAuthenticated, authToken]);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > 200) {
          setIsScrolled(true);
          if (window.scrollY > lastScrollY) {
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }
          setLastScrollY(window.scrollY);
        } else {
          setIsScrolled(false);
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  // Close sidebar on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const profileMenus = [
    {
      name: "Profile",
      href: "/profile",
      type: "function",
      action: () => {
        router.push("/myprofile?tab=Profile");
        setIsSidebarOpen(false);
      },
      icon: <User2 className="w-6 h-6" />,
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
        setIsSidebarOpen(false);
      },
    },
  ];

  function getWish() {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) return "Good Morning";
    if (currentHour >= 12 && currentHour < 17) return "Good Afternoon";
    if (currentHour >= 17 && currentHour < 21) return "Good Evening";
    return "Good Night";
  }

  const MenuItems = (
    menu: { name: string; icon: any },
    openMenu: string,
    authStatus: boolean
  ) => {
    switch (menu.name) {
      case "avatar":
        return (
          openMenu === "avatar" && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
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
                  <Link
                    href="/signup"
                    className="block py-2 hover:text-gray-600 flex items-center gap-2"
                  >
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
          "sticky top-0 z-50 flex h-[80px] items-center transition-transform duration-300",
          isVisible ? "translate-y-0" : "-translate-y-full",
          isScrolled ? "bg-black backdrop-blur-md shadow-lg" : "bg-transparent"
        )}
      >
        <div className="flex h-full items-center justify-between w-full px-4 lg:px-18">
          {/* Logo */}
          <div>
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="logo"
                width={150}
                height={50}
                className="object-cover rounded-lg cursor-pointer"
              />
            </Link>
          </div>

          {/* Mobile Menu Toggle and Profile Button */}
          <div className="lg:hidden flex items-center">
            {/* Profile Button (opens right-to-left sidebar) */}
            <button
              className="mr-4"
              onClick={() => setIsSidebarOpen(true)}
            >
              <User size={24} className="text-white" />
            </button>
            {/* Mobile Menu Toggle */}
            <button
              className="flex flex-col justify-between w-7 h-6"
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
          </div>

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
                    <Link
                      href={item.link}
                      className="relative flex items-center px-3 py-[14px] font-medium"
                    >
                      <span>{item.name}</span>
                      {item.dropdown && (
                        <motion.svg
                          className="ml-1 h-5 w-5"
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
                            <li
                              key={subIndex}
                              className="px-4 py-2 hover:text-gray-600 text-[16px] whitespace-nowrap"
                            >
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

            {/* Desktop Login Button */}
            <div className="ml-6 flex items-center gap-4">
              <Button
                variant="default"
                onClick={() => changeLoginModalType("MOBILE_INPUT")}
                className="bg-white text-black hover:bg-gray-200"
              >
                <LogIn className="w-5 h-5 mr-2" />
                Login
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="absolute top-[80px] left-0 w-full h-[100vh] bg-black text-white lg:hidden">
              <ul className="flex flex-col items-start py-4">
                {navdata.map((item, index) => (
                  <li key={index} className="w-full">
                    <div
                      className="flex items-center justify-between w-full py-2 px-4 cursor-pointer"
                      onClick={() => toggleDropdown(index)}
                    >
                      <Link
                        href={item.link}
                        className="text-2xl"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                      {item.dropdown && (
                        <motion.svg
                          className="h-6 w-6"
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
                    </div>
                    <AnimatePresence>
                      {item.dropdown && openDropdown === index && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="bg-[#202120] text-white rounded-lg m-2 mr-3 px-1 py-3 overflow-hidden"
                        >
                          {item.dropdown.map((subItem, subIndex) => (
                            <li key={subIndex} className="px-4 py-2 hover:text-gray-500">
                              <Link href={subItem.link} onClick={() => setMobileMenuOpen(false)}>
                                {subItem.title}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                ))}
                {isLoggedIn ? (
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
                ) : (
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
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Sidebar for Profile Menu */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              ref={sidebarRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed top-0 right-0 h-screen w-[300px] bg-black p-4 rounded-l-[12px] z-50 flex flex-col text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <Sidebar
                userName={user.name || "User"}
                userTitle="Member"
                userId="ID123"
                activeTab="Profile"
                setActiveTab={(tab) => {
                  const currentPath = window.location.pathname + window.location.search;
                  const currentTab = new URLSearchParams(window.location.search).get("tab") || "Profile";
                  if (tab === "Logout") {
                    router.push("/logout");
                  } else if (currentPath === `/myprofile?tab=${tab}` || currentTab === tab) {
                    // No navigation if already on the same tab
                  } else {
                    router.push(`/myprofile?tab=${encodeURIComponent(tab)}`);
                  }
                  setIsSidebarOpen(false);
                }}
              />
              <button
                className="absolute top-4 left-4 text-white"
                onClick={() => setIsSidebarOpen(false)}
              >
                Close
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <AuthDialog
          isOpen={loginModal}
          onOpenChange={() => changeLoginModalType(null)}
        />
      </nav>
    );
} 