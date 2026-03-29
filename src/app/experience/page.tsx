import { getPageMetadata } from "@/lib/metadata-seo";
import { Metadata } from "next";
import ExperienceClient from "./ExperienceClient";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("experience");
}

export default function Page() {
  return <ExperienceClient />;
}
