import { useQuery } from "@tanstack/react-query";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession({ required: true });
  const status = useQuery({
    queryKey: ["status"],
    enabled: !!session,
    queryFn: async () => {
      const res = await fetch("/api/status");
      if (!res.ok) {
        throw new Error("Getting status failed");
      }
      const data = await res.json();
      console.log(data);
      return data;
    },
    refetchInterval: 2000,
  });

  return (
    <>
      {status.data && status.data.is_playing && (
        <div className="flex w-80 items-center gap-x-4 bg-white p-4 shadow">
          <>
            <Image
              priority
              className="h-16 w-16 flex-shrink-0"
              alt=""
              src={status.data.item.album.images[0].url}
              width={status.data.item.album.images[0].width}
              height={status.data.item.album.images[0].height}
            />
            <div>
              <div className="line-clamp-1 text-lg font-semibold">
                {status.data.item.name}
              </div>
              <div className="line-clamp-1">
                {(
                  status.data.item.artists.map((v: any) => v.name) as string[]
                ).join(", ")}
              </div>
            </div>
          </>
        </div>
      )}
    </>
  );
}
