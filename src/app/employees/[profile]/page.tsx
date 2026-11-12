import ProfileClient from "./profile-client";

export function generateStaticParams() {
  return [{ profile: "1" }];
}

export default function ProfilePage() {
  return <ProfileClient />;
}
