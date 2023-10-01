import { supabase } from "@/services/supabaseClient";
import { PROFILES_ENDPOINT } from "@/types/constants";
import { QueryOptionsType } from "@/types/dataTypes";
import type { profile } from "@prisma/client";
import {
  Session,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";

export async function authorizeUser(token: string | null) {
  // Extract the authorization header

  if (!token) {
    return null;
  }
  // Validate the token and get the user
  const { data: user, error } = await supabase.auth.getUser(token);
  if (error || !user) {
    return null;
  }

  return user;
}

export const getServerSideSession = async (): Promise<Session | null> => {
  try {
    const supabase = createServerComponentClient({
      //headers,
      cookies,
    });
    const sessionData = await supabase.auth.getSession();
    const session: Session | null = sessionData?.data?.session;

    return session;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetcher = async (url: string, accessToken?: string) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (accessToken) {
    headers["Authorization"] = `${accessToken}`;
  }

  const res = await fetch(url, {
    method: "GET",
    headers: headers,
  });
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }

  return data;
};

export const formatPaginatedEndpoint = (
  baseUrl: string,
  queryOptions: QueryOptionsType,
  page: number
) => {
  const paramsString =
    queryOptions &&
    Object.keys(queryOptions)
      .filter(
        (key) =>
          queryOptions[key as keyof QueryOptionsType] !== undefined &&
          queryOptions[key as keyof QueryOptionsType] !== null &&
          queryOptions[key as keyof QueryOptionsType] !== ""
      )
      .map((key) => `${key}=${queryOptions[key as keyof QueryOptionsType]}`)
      .join("&");

  const queryString = paramsString ? `?${paramsString}` : "";

  return `${baseUrl}${queryString}&offset=${page}`;
};

export const getUserProfile = async (
  username: string | undefined,
  accessToken: string | undefined
): Promise<profile | null> => {
  try {
    if (!username || !accessToken) return null;
    const response = await fetch(`${PROFILES_ENDPOINT}?username=${username}`, {
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${accessToken}`,
      },
    });
    const data: profile = await response.json();
    return data;
  } catch (error) {
    console.log("error: ", error);
    return null;
  }
};
