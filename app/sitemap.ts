import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://skunichetty.dev",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://skunichetty.dev/posts",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://skunichetty.dev/posts/lambda-deployment",
      lastModified: new Date(2024, 7, 11),
      changeFrequency: "never",
      priority: 1,
    },
    {
      url: "https://skunichetty.dev/posts/erm-p1",
      lastModified: new Date(2024, 4, 27),
      changeFrequency: "never",
      priority: 0.5,
    },
    {
      url: "https://skunichetty.dev/posts/logistic-regression",
      lastModified: new Date(2025, 2, 9),
      changeFrequency: "never",
      priority: 0.5,
    },
  ];
}
