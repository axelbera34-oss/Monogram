import type { Metadata } from "next";
import { CustomCategoryPage } from "@/components/CustomCategoryPage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Reader-added desk",
  description:
    "A reader-created MONOGRAM category, generated from a new article type and listed in the More section.",
};

export default function MoreCategoryRoute() {
  return <CustomCategoryPage />;
}
