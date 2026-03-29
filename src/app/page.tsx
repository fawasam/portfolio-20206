import { getPageMetadata } from "@/lib/metadata-seo";
import { Metadata } from "next";
import HomeClient from "./HomeClient";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("home");
}

export default function Page() {
  return <HomeClient />;
}
