import { Metadata, Viewport } from "next";

// Types for better type safety
interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string | string[];
  path: string;
  noindex?: boolean;
  nofollow?: boolean;
  viewport?: string;
  robots?: {
    index?: boolean;
    follow?: boolean;
    nocache?: boolean;
    googleBot?: string;
  };
  searchKeywords?: string;
  openGraph?: {
    title?: string;
    description?: string;
    images?:
      | Array<{
          url: string;
          width?: number;
          height?: number;
          alt?: string;
        }>
      | string[];
    type?: "website" | "article";
    locale?: string;
    siteName?: string;
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
  };
  twitter?: {
    card?: "summary" | "summary_large_image" | "app" | "player";
    site?: string;
    creator?: string;
    title?: string;
    description?: string;
    images?: string[];
  };
  structuredData?: Record<string, any>;
  alternates?: {
    canonical?: string;
    languages?: Record<string, string>;
  };
  verification?: {
    google?: string;
    yandex?: string;
    bing?: string;
  };
}

// Default configuration
const defaultConfig = {
  siteName: "fawasam",
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://fawasam.com",
  title: "fawasam — Design & Systems // Software Architect",
  description:
    "Portfolio of fawasam. Architecting high-concurrency systems, premium digital experiences, and visionary technical infrastructure.",
  keywords:
    "fawasam, Software Engineer, Backend Architect, Systems Design, Next.js Expert, Node.js, AWS, DevOps, CI/CD, Digital Experience, Portfolio",
  defaultImage: "/icon.jpg",
  twitterHandle: "@fawasam",
  locale: "en_US",
  themeColor: "#050505",
  viewport:
    "width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot:
      "index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1",
  },
  searchKeywords:
    "fawasam, software engineering, systems architect, next.js portfolio, web development, cloud solutions, full stack",
  verification: {
    google: "",
    bing: "",
    yandex: "",
  },
};

// Utility function to validate URL
const isValidUrl = (urlString: string): boolean => {
  try {
    new URL(urlString);
    return true;
  } catch (error) {
    return false;
  }
};

// Utility function to safely construct image URL
const constructImageUrl = (image: string, baseUrl: string): string | null => {
  if (!image || image.trim() === "") return null;

  const trimmedImage = image.trim();

  // If it's already a full URL
  if (
    trimmedImage.startsWith("http://") ||
    trimmedImage.startsWith("https://")
  ) {
    return isValidUrl(trimmedImage) ? trimmedImage : null;
  }

  // If it's a relative path
  if (trimmedImage.startsWith("/")) {
    const fullUrl = `${baseUrl}${trimmedImage}`;
    return isValidUrl(fullUrl) ? fullUrl : null;
  }

  // If it doesn't start with /, add it
  const fullUrl = `${baseUrl}/${trimmedImage}`;
  return isValidUrl(fullUrl) ? fullUrl : null;
};

// Utility function to generate structured data
const generateStructuredData = (
  type: string,
  data: Record<string, any>
): string => {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  };

  return JSON.stringify(baseSchema);
};

// Default structured data for organization
const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: "fawasam",
  url: defaultConfig.siteUrl,
  image: `${defaultConfig.siteUrl}/assets/fawasam_portrait.jpg`,
  description: defaultConfig.description,
  jobTitle: "Software Architect",
  sameAs: [
    "https://github.com/fawasam",
    "https://linkedin.com/in/fawasam",
  ],
});

// Breadcrumb schema generator
const getBreadcrumbSchema = (
  path: string,
  breadcrumbs?: Array<{ name: string; url: string }>
) => {
  if (!breadcrumbs || breadcrumbs.length === 0) {
    // Auto-generate breadcrumbs from path
    const pathParts = path.split("/").filter(Boolean);
    breadcrumbs = pathParts.map((part, index) => ({
      name: part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, " "),
      url: `${defaultConfig.siteUrl}/${pathParts
        .slice(0, index + 1)
        .join("/")}`,
    }));
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: defaultConfig.siteUrl,
      },
      ...breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: crumb.name,
        item: crumb.url,
      })),
    ],
  };
};

// FAQ Schema generator
const getFAQSchema = (faqs: Array<{ question: string; answer: string }>) => {
  if (!faqs || faqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
};

// Project Schema generator
const getProductSchema = (project: {
  name: string;
  description: string;
  image?: string;
  url?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: project.name,
  description: project.description,
  image: project.image || `${defaultConfig.siteUrl}/icon.jpg`,
  url: project.url || defaultConfig.siteUrl,
  applicationCategory: "WebApplication",
  operatingSystem: "Cloud/Web",
  author: {
    "@type": "Person",
    name: "fawasam"
  }
});

// Main metadata generation function
export const generateMetadata = async (
  config: SEOConfig
): Promise<Metadata> => {
  const {
    title,
    description,
    keywords,
    path,
    noindex = false,
    nofollow = false,
    viewport,
    robots,
    searchKeywords,
    openGraph,
    twitter,
    alternates,
    verification,
  } = config;

  // Prepare final values
  const finalTitle = title || defaultConfig.title;
  const finalDescription = description || defaultConfig.description;
  const finalUrl = path?.startsWith("http")
    ? path
    : `${defaultConfig.siteUrl}${path}`;

  // Process keywords
  let finalKeywords: string | string[];
  if (typeof keywords === "string") {
    finalKeywords = keywords;
  } else if (Array.isArray(keywords) && keywords.length > 0) {
    finalKeywords = keywords.join(", ");
  } else {
    finalKeywords = defaultConfig.keywords;
  }

  // Process OpenGraph images with validation
  const ogImages = openGraph?.images || [defaultConfig.defaultImage];
  const processedOGImages = ogImages
    .filter((image) => {
      // Filter out empty, null, or undefined images
      if (!image) return false;
      if (typeof image === "string") {
        return image.trim() !== "";
      }
      return image.url && image.url.trim() !== "";
    })
    .map((image) => {
      if (typeof image === "string") {
        const imageUrl = constructImageUrl(image, defaultConfig.siteUrl);

        if (!imageUrl) {
          console.warn(`Invalid image URL: ${image}`);
          return null;
        }

        return {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: finalTitle,
        };
      }

      // Handle object format
      const imageUrl = constructImageUrl(image.url, defaultConfig.siteUrl);

      if (!imageUrl) {
        console.warn(`Invalid image URL: ${image.url}`);
        return null;
      }

      return {
        ...image,
        url: imageUrl,
        width: image.width || 1200,
        height: image.height || 630,
        alt: image.alt || finalTitle,
      };
    })
    .filter((image): image is NonNullable<typeof image> => image !== null);

  // If no valid images, use default
  const defaultImageUrl = constructImageUrl(
    defaultConfig.defaultImage,
    defaultConfig.siteUrl
  );
  const finalOGImages =
    processedOGImages.length > 0
      ? processedOGImages
      : defaultImageUrl
      ? [
          {
            url: defaultImageUrl,
            width: 1200,
            height: 630,
            alt: finalTitle,
          },
        ]
      : [];

  // Process Twitter images
  const validTwitterImages =
    twitter?.images
      ?.map((img) => constructImageUrl(img, defaultConfig.siteUrl))
      .filter((img): img is string => img !== null) || [];

  const finalTwitterImages =
    validTwitterImages.length > 0
      ? validTwitterImages
      : finalOGImages.length > 0
      ? [finalOGImages[0].url]
      : defaultImageUrl
      ? [defaultImageUrl]
      : [];

  // Process viewport
  const finalViewport = viewport || defaultConfig.viewport;

  // Process robots directives
  const finalRobots: Metadata["robots"] = {
    index: robots?.index ?? !noindex,
    follow: robots?.follow ?? !nofollow,
    ...(robots?.nocache !== undefined && { nocache: robots.nocache }),
    googleBot: robots?.googleBot
      ? robots.googleBot
      : {
          index: robots?.index ?? !noindex,
          follow: robots?.follow ?? !nofollow,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
  };

  // Process search keywords
  const finalSearchKeywords = searchKeywords || defaultConfig.searchKeywords;

  // Safely create metadataBase
  let metadataBase;
  try {
    metadataBase = new URL(defaultConfig.siteUrl);
  } catch (error) {
    console.error("Invalid siteUrl in defaultConfig:", defaultConfig.siteUrl);
    metadataBase = undefined;
  }

  // Build metadata object
  const metadata: Metadata = {
    title: {
      default: finalTitle,
      template: `%s | ${defaultConfig.siteName}`,
    },
    description: finalDescription,
    keywords: `${finalKeywords}, ${finalSearchKeywords}`,
    authors: [{ name: defaultConfig.siteName }],
    creator: defaultConfig.siteName,
    publisher: defaultConfig.siteName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    ...(metadataBase && { metadataBase }),
    alternates: {
      canonical: alternates?.canonical || finalUrl,
      languages: alternates?.languages,
    },
    openGraph: {
      title: openGraph?.title || finalTitle,
      description: openGraph?.description || finalDescription,
      url: finalUrl,
      siteName: openGraph?.siteName || defaultConfig.siteName,
      ...(finalOGImages.length > 0 && { images: finalOGImages }),
      locale: openGraph?.locale || defaultConfig.locale,
      type: openGraph?.type || "website",
      ...(openGraph?.publishedTime && {
        publishedTime: openGraph.publishedTime,
      }),
      ...(openGraph?.modifiedTime && { modifiedTime: openGraph.modifiedTime }),
      ...(openGraph?.authors && { authors: openGraph.authors }),
    },
    twitter: {
      card: twitter?.card || "summary_large_image",
      title: twitter?.title || finalTitle,
      description: twitter?.description || finalDescription,
      site: twitter?.site || defaultConfig.twitterHandle,
      creator: twitter?.creator || defaultConfig.twitterHandle,
      ...(finalTwitterImages.length > 0 && { images: finalTwitterImages }),
    },
    robots: finalRobots,
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
      other: [
        {
          rel: "mask-icon",
          url: "/safari-pinned-tab.svg",
          color: defaultConfig.themeColor,
        },
      ],
    },
    manifest: "/site.webmanifest",
    verification: {
      google: verification?.google || defaultConfig.verification.google,
      yandex: verification?.yandex || defaultConfig.verification.yandex,
      other: {
        "msvalidate.01": verification?.bing || defaultConfig.verification.bing,
      },
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: defaultConfig.siteName,
    },
    other: {
      "msapplication-TileColor": defaultConfig.themeColor,
      "theme-color": defaultConfig.themeColor,
      "mobile-web-app-capable": "yes",
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "default",
      "apple-mobile-web-app-title": defaultConfig.siteName,
      "application-name": defaultConfig.siteName,
      "msapplication-tooltip": finalDescription,
      "msapplication-starturl": "/",
      "msapplication-tap-highlight": "no",
      "full-screen": "yes",
      browsermode: "application",
      nightmode: "enable",
      layoutmode: "fitscreen",
      imagemode: "force",
      "x5-orientation": "portrait",
      "screen-orientation": "portrait",
      "x5-fullscreen": "true",
      "x5-page-mode": "app",
    },
  };

  return metadata;
};

// Generate viewport configuration
export const generateViewport = async (
  config?: Partial<Pick<SEOConfig, "viewport">>
): Promise<Viewport> => {
  const viewport = config?.viewport || defaultConfig.viewport;

  // Parse viewport string into Viewport object
  // Format: "width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes"
  const viewportObj: Viewport = {};

  if (viewport) {
    const parts = viewport.split(",").map((part) => part.trim());
    parts.forEach((part) => {
      const [key, value] = part.split("=").map((s) => s.trim());
      if (key === "width") {
        viewportObj.width = value;
      } else if (key === "initial-scale") {
        viewportObj.initialScale = parseFloat(value);
      } else if (key === "maximum-scale") {
        viewportObj.maximumScale = parseFloat(value);
      } else if (key === "minimum-scale") {
        viewportObj.minimumScale = parseFloat(value);
      } else if (key === "user-scalable") {
        viewportObj.userScalable = value === "yes";
      } else if (key === "viewport-fit") {
        viewportObj.viewportFit = value as "auto" | "contain" | "cover";
      }
    });
  }

  return viewportObj;
};

// Helper function for page-specific metadata
export const getPageMetadata = async (
  page: "home" | "about" | "projects" | "experience",
  customConfig?: Partial<SEOConfig>
): Promise<Metadata> => {
  const pageConfigs: Record<string, SEOConfig> = {
    home: {
      title: "fawasam — Design & Systems // Software Architect",
      description:
        "Portfolio of fawasam. Architecting high-concurrency systems, premium digital experiences, and visionary technical infrastructure.",
      path: "/",
      keywords: [
        "fawasam",
        "systems design",
        "next.js developer",
        "software architect",
        "full stack engineering",
      ],
    },
    about: {
      title: "About Us - Our Architecture & Vision",
      description:
        "Learn about fawasam's commitment to building scalable, high-fidelity digital systems and robust technical solutions.",
      path: "/about",
      keywords: [
        "about fawasam",
        "technical vision",
        "software engineering philosophy",
        "system architecture",
      ],
    },
    projects: {
      title: "Projects - High-Fidelity Systems Manifest",
      description:
        "Explore a curated archive of enterprise-grade projects, from logistics engines to high-concurrency communication meshes.",
      path: "/projects",
      keywords: [
        "software projects",
        "enterprise web platforms",
        "systems design cases",
        "next.js examples",
      ],
    },
    experience: {
      title: "Experience - Professional Technical Orbit",
      description:
        "A detailed timeline of professional engagements, technical leadership, and engineering impact across diverse sectors.",
      path: "/experience",
      keywords: [
        "software engineering career",
        "technical experience",
        "resume",
        "career path",
      ],
    },
  };

  const baseConfig = pageConfigs[page] || pageConfigs.home;
  const mergedConfig = { ...baseConfig, ...customConfig };

  return generateMetadata(mergedConfig);
};

// Export utility functions
export {
  getOrganizationSchema,
  getBreadcrumbSchema,
  getFAQSchema,
  getProductSchema,
  generateStructuredData,
  isValidUrl,
  constructImageUrl,
};

// Export types
export type { SEOConfig };
