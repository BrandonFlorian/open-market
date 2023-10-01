import ProfileForm from "@/components/forms/profileForm";
import { getServerSideSession, getUserProfile } from "@/lib/serverUtils";
import type { profile } from "@prisma/client";
import type { Session } from "@supabase/auth-helpers-nextjs";

export default async function Profile() {
  const session: Session | null = await getServerSideSession();
  console.log("session: ", session);
  const userProfile: profile | null = await getUserProfile(
    session?.user.user_metadata.username,
    session?.access_token
  );

  console.log("userProfile: ", userProfile);

  return (
    <div className="flex items-center justify-center h-screen">
      <ProfileForm profile={userProfile} />
    </div>
  );
}
