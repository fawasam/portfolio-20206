import { getPageMetadata } from "@/lib/metadata-seo";
import { Metadata } from "next";
import AboutClient from "./AboutClient";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("about");
}

export default function Page() {
  return <AboutClient />;
}
