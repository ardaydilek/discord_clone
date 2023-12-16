import { redirect } from "next/navigation";
import { redirectToSignIn } from "@clerk/nextjs";

import { prisma } from "@/lib/prisma";
import { currentProfile } from "@/lib/current-profile";

import ServerSidebar from "@/components/server/server-sidebar";

export default async function ServerIdLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serverId: string };
}) {
  const profile = await currentProfile();

  if (!profile) return redirectToSignIn();

  const server = await prisma.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (!server) return redirect("/");

  return (
    <div
      className="h-full"
      aria-label="server-sidebar"
    >
      <div className="hidden md:flex fixed h-full w-60 z-20 flex-col inset-y-0">
        <ServerSidebar serverId={params.serverId} />
      </div>
      <main className="h-full md:pl-60 transition-all duration-500">
        {children}
      </main>
    </div>
  );
}
