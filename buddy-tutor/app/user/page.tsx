"use client";
import React from "react";
import { Navbar } from "../_components/navbar";

export const Userpage = () => {
  return (
    <main className="">
      <div className="relative h-[128px] w-full">
        <Navbar />
      </div>
      <div>
        <h1>User management Page!</h1>
      </div>
    </main>
  );
};

export default Userpage;
