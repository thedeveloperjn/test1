import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  name: string;
  value: any;
  className?: string;
};

const DataVisual = ({ name, value, className }: Props) => {
  return (
    <div className={cn("min-w-20", className)}>
      <div className="text-sm">{name}</div>
      <div className="font-bold text-sm">{value}</div>
    </div>
  );
};

export default DataVisual;
