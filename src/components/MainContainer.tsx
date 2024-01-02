import { cn } from "@/utils/cn";
import React from "react";

export const MainContainer = (props: React.HTMLProps<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={cn(
        "w-full bg-slate-500 border rounded-xl flex py-4 shadow-sm",
        props.className
      )}
    />
  );
};
