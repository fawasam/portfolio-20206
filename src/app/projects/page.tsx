import { getPageMetadata } from "@/lib/metadata-seo";
import { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("projects");
}

export default function Page() {
  return <ProjectsClient />;
}
