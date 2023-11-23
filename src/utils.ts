import { env } from "./env";

const client_id = env.SPOTIFY_CLIENT_ID;
const client_secret = env.SPOTIFY_CLIENT_SECRET;
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const STATUS_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";
const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

const getAccessToken = async (refresh_token: string) => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });
  const res = await response.json();
  console.log(res);

  return res;
};

export const getUserStatus = async (refresh_token: string) => {
  const { access_token } = await getAccessToken(refresh_token);

  return await fetch(STATUS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
