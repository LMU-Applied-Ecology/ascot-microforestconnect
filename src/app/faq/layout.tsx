import { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ - Ascot Micro-Forest Connect",
  description: "Frequently asked questions about the Ascot Micro-Forest Project",
};

export default function FaqLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
