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
import { buttonVariants } from "../../components/ui/button";

export const Course = () => {
  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6"
      )}
    ></div>
  );
};

export default Course;
