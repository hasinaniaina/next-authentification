import { toast } from "@/components/ui/use-toast";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function handleMessage(title: string,description: string, variant: "default" | "destructive") {
  toast({
    title: title,
    description: description,
    variant: variant
  });
}
