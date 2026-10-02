import type { ComponentType } from "react";
import { Magazine } from "@/types/MagazineTypes";
import ClorindeCover from "./ClorindeCover";

type CoverProps = { magazine: Magazine; className?: string };

// One HTML cover per issue, keyed by the magazine's slug
export const covers: Record<string, ComponentType<CoverProps>> = {
  clorinde: ClorindeCover,
};
