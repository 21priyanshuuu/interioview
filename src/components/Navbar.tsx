"use client";
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";  // Import usePathname
import { 
  IconUserCircle, 
  IconLogout, 
  IconMenu2, 
  IconX 
} from "@tabler/icons-react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const pathname = usePathname(); // Get current path

  // Kinde authentication client-side
  const { isAuthenticated, user, isLoading, error } = useKindeBrowserClient();

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { title: "Home", href: "/" },
    ...(isAuthenticated
      ? [
          { title: "Design Studio", href: "http://127.0.0.1:5500/build/index.html#" },
          { title: "Furniture Shop", href: "/cart" },
        ]
      : []),
    { title: "Blog", href: "/blog" },
    { title: "Contact", href: "/contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
          scrolling ? "bg-white shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center px-6 h-16">
          {/* Logo */}
          <div className="text-2xl font-bold text-gray-900">Room Decor</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex flex-1 justify-center items-center gap-6">
            {links.map((link, index) => (
              <motion.div key={index} whileHover={{ scale: 1.1 }}>
                <Link
                  href={link.href}
                  className={`relative text-gray-700 hover:text-blue-500 transition ${
                    pathname === link.href ? "font-semibold text-blue-600" : ""
                  }`}
                >
                  {link.title}
                  {pathname === link.href && (
                    <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-[2px] bg-blue-600 rounded-full"></span>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {isLoading ? (
              <p>Loading...</p>
            ) : !isAuthenticated ? (
              <>
                <LoginLink className="text-gray-700 hover:text-blue-500">
                  Sign in
                </LoginLink>
                <RegisterLink className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                  Sign up
                </RegisterLink>
              </>
            ) : (
              <div className="relative">
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="text-gray-700">
                  <IconUserCircle className="h-8 w-8" />
                </button>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg py-2 w-40"
                  >
                    <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Profile
                    </Link>
                    <Link href="/api/auth/logout" className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100">
                      <IconLogout className="inline-block mr-2" /> Log out
                    </Link>
                  </motion.div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-gray-700" onClick={() => setOpen(!open)}>
            {open ? <IconX className="h-8 w-8" /> : <IconMenu2 className="h-8 w-8" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-full left-0 w-full bg-white flex flex-col items-start p-4 shadow-lg"
          >
            {links.map((link, index) => (
              <motion.div key={index} whileHover={{ scale: 1.1 }} className="w-full py-2">
                <Link
                  href={link.href}
                  className={`block text-gray-700 hover:text-blue-500 ${
                    pathname === link.href ? "font-semibold text-blue-600" : ""
                  }`}
                >
                  {link.title}
                </Link>
              </motion.div>
            ))}
            <div className="mt-4 w-full">
              {isLoading ? (
                <p>Loading...</p>
              ) : !isAuthenticated ? (
                <>
                  <LoginLink className="block text-gray-700 hover:text-blue-500">
                    Sign in
                  </LoginLink>
                  <RegisterLink className="block text-gray-700 hover:text-blue-500">
                    Sign up
                  </RegisterLink>
                </>
              ) : (
                <Link href="/api/auth/logout" className="block text-red-500 hover:bg-gray-100 px-4 py-2">
                  <IconLogout className="inline-block mr-2" /> Log out
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Spacer to prevent content from being hidden under the navbar */}
      <div className="h-16" />
    </>
  );
}
