"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
  const user = await currentUser();

  if (!user) throw new Error("User is not signed in");
  if (!apiKey) throw new Error("No API key found");
  if (!apiSecret) throw new Error("No API secret found");

  // use the user's id as the token
  const client = new StreamClient(apiKey, apiSecret);

  // token is valid for 1 hour
  const expiration = Math.round(new Date().getTime() / 1000) + 60 * 60;

  // token is issued 1 minute ago
  const issued = Math.round(new Date().getTime() / 1000) - 60;

  const token = client.generateUserToken({
    user_id: user.id,
    validity_in_seconds: 60 * 60,
    exp: expiration,
    iat: issued,
  });

  return token;
};
