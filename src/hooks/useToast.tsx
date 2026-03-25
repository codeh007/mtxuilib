"use client";

import { useToast as useToastUI } from "../ui/use-toast";

export const useToast = () => {
  const { toast } = useToastUI();
  return { toast };
};
