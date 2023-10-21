"use client";
import React from "react";
import { Navbar } from "./_components/Navbar";
import { Assignments } from "./_components/Assignments";

export const CoursePage = () => {
  return (
    <main className="">
      <div className="relative h-[128px] w-full">
        <Navbar />
      </div>
      <div>
        <Assignments />
      </div>
    </main>
  );
};

export default CoursePage;
