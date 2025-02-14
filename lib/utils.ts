import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleDownloadPdf = (pathname: string, filename: string) => {
  const link = document.createElement("a");
  link.href = pathname;
  link.download = filename;
  link.click();
};
