import RoadmapDetailClient from "./roadmap-detail-client";

export function generateStaticParams() {
  return [{ roadmap: "1" }];
}

export default function RoadmapDetailPage() {
  return <RoadmapDetailClient />;
}
