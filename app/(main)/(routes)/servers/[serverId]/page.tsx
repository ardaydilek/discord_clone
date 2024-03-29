import { prisma } from "@/lib/prisma";
import { currentProfile } from "@/lib/current-profile";

import { redirect } from "next/navigation";
import { redirectToSignIn } from "@clerk/nextjs";

interface ServerPageProps {
  params: {
    serverId: string;
  };
}

export default async function ServerPage({ params }: ServerPageProps) {
  const profile = await currentProfile();

  if (!profile) return redirectToSignIn();

  const server = await prisma.server.findUnique({
    where: {
      id: params?.serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      channels: {
        where: {
          name: "general",
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  const initalChannel = server?.channels[0];

  if (initalChannel?.name !== "general") return null;

  return redirect(`/servers/${params?.serverId}/channels/${initalChannel?.id}`);
}
