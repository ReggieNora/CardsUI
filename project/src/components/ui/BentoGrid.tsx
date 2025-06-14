"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  IconBoxAlignRightFilled,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { cn } from "../../lib/utils";

export function BentoGrid({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4", className)}>{children}</div>
  );
}

const BentoGridItem = React.memo(function BentoGridItem({
  title,
  description,
  header,
  className,
  icon,
  onClick,
  style,
}: {
  title: string;
  description: React.ReactNode;
  header: React.ReactNode;
  className?: string;
  icon: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={cn("rounded-2xl bg-white/5 dark:bg-black/5 backdrop-blur-sm border border-white/10 shadow-lg p-6 flex flex-col gap-4 transition-all hover:scale-[1.03] hover:shadow-2xl hover:bg-white/10 hover:border-white/20", className)}
      onClick={onClick}
      style={style}
    >
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="text-lg font-semibold text-white/90">{title}</h3>
      </div>
      <div className="flex-1">{header}</div>
      <div className="text-white/70 text-sm">{description}</div>
    </div>
  );
});

BentoGridItem.displayName = "BentoGridItem";

export { BentoGridItem };