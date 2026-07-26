import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import ProfileForm from "./ProfileForm";
import { supabaseServer } from "@/lib/supabase-server";

export default async function MyProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  let avatarUrl: string | null = null;

  if (user.profileImageUrl) {
    const { data } = await supabaseServer.storage
      .from("profile-images")
      .createSignedUrl(user.profileImageUrl, 60 * 60);

    avatarUrl = data?.signedUrl ?? null;
  }

  return (
    <main className="min-h-screen bg-[#050816] p-6 text-white">
      <h1 className="text-3xl font-bold text-blue-400">
        My Profile
      </h1>

      <p className="mt-2 text-gray-400">
        Manage your account information.
      </p>

      <div className="mt-8 rounded-2xl border border-blue-800 bg-[#0b1024] p-6">
        <div className="flex flex-col items-center">

          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Profile"
              className="h-28 w-28 rounded-full object-cover border-4 border-blue-500"
            />
          ) : (
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-blue-700 text-5xl font-bold">
              {user.inGameName.charAt(0).toUpperCase()}
            </div>
          )}

          <h2 className="mt-4 text-2xl font-bold">
            {user.inGameName}
          </h2>

          <p className="text-gray-400">
            {user.playerId}
          </p>

          <span className="mt-3 rounded-full bg-blue-600 px-4 py-1 text-sm">
            {user.role}
          </span>
        </div>
      </div>

      <ProfileForm
        user={{
          inGameName: user.inGameName,
          playerId: user.playerId,
          role: user.role,
        }}
      />
    </main>
  );
}