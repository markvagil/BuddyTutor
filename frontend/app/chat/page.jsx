"use client";
import React from "react";
import { Navbar } from "../_components/navbar";
import { CourseCard } from "../_components/cards";

export const Dashboard = () => {
  return (
    <main className="">
      <div className="relative h-[128px] w-full">
        <Navbar />
      </div>
      <div>
        <CourseCard />
      </div>
    </main>
  );
};

export default Dashboard;
