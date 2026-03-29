import { getPageMetadata } from "@/lib/metadata-seo";
import { Metadata } from "next";
import { PROJECTS_DATA } from "@/lib/projects-data";
import ProjectDetailClient from "./ProjectDetailClient";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = PROJECTS_DATA[id];
  
  if (!project) {
    return getPageMetadata("projects");
  }

  return getPageMetadata("projects", {
    title: `${project.title.split('_').join(' ')} | fawasam Systems`,
    description: project.concepts.philosophy,
    path: `/projects/${id}`,
    openGraph: {
      images: [project.images[0]],
    }
  });
}

export default function Page() {
  return <ProjectDetailClient />;
}
