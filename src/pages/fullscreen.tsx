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
        <div className="flex h-screen w-screen items-center gap-x-24 bg-white p-24">
          <>
            <div className="relative aspect-square h-full flex-shrink-0">
              <Image
                priority
                fill
                alt=""
                src={status.data.item.album.images[0].url}
                //   width={status.data.item.album.images[0].width}
                //   height={status.data.item.album.images[0].height}
              />
            </div>
            <div>
              <div className="line-clamp-2 text-9xl font-semibold leading-normal">
                {status.data.item.name}
              </div>
              <div className="line-clamp-1 text-7xl leading-normal">
                {(
                  status.data.item.artists.map((v: any) => v.name) as string[]
                ).join(", ")}
              </div>
            </div>
            <div
              className="fixed inset-x-0 bottom-0 h-8 bg-lime-400"
              style={{
                width: `${
                  (status.data.progress_ms / status.data.item.duration_ms) * 100
                }%`,
              }}
            />
          </>
        </div>
      )}
    </>
  );
}
