import { MagnifyingGlassIcon, BellIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${isScrolled && "bg-[#141414]"}`}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <img
          src="https://rb.gy/3ksax"
          width={100}
          height={100}
          className="cursor-pointer object-contain"
          alt="Netflix Logo"
        />
        <ul className="hidden md:flex space-x-4">
          <li className="headerLink">Home</li>
          <li className="headerLink">TV Shows</li>
          <li className="headerLink">Movies</li>
          <li className="headerLink">New & Popular</li>
          <li className="headerLink">My List</li>
        </ul>
      </div>

      <div className="flex items-center space-x-4 text-sm font-light">
        <MagnifyingGlassIcon className="hidden sm:inline w-6" />
        <p className="hidden lg:inline">Kids</p>
        <BellIcon className="w-6" />
        <Link href="/account">
          <img
            src="https://rb.gy/0so4x"
            className="cursor-pointer rounded"
            alt="User Image"
          />
        </Link>
      </div>
    </header>
  );
}
