"use client";
import { Settings } from "lucide-react";
import { User } from "lucide-react";
import Link from "next/link";
import { cn } from "../../lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
/*  <Button asChild>
          <Link href="/chat">Chat</Link>
        </Button>

        <Button size="icon" asChild>
          <Link href="/settings">
            <Settings />
          </Link>
        </Button>

        <Button size="icon" asChild>
          <Link href="/user">
            <User />
          </Link>
        </Button>*/
export const Navbar = () => {
  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6"
      )}
    >
      {/* Universal link to the home page */}
      <Link href="/">
        <Avatar>
          <AvatarImage src="/logo.svg" />
          <AvatarFallback>Logo</AvatarFallback>
        </Avatar>
      </Link>
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        <Button asChild>
          <Link href="/dashboard">Dashboard</Link>
        </Button>

      
      </div>
    </div>
  );
};

export default Navbar;
