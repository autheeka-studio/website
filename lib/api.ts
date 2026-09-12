import { translateError } from "./errors";

export async function fetchGraphQL(query: string, variables: any = {}, token?: string) {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const apiUrl = process.env.NEXT_PUBLIC_GRAPHQL_URL || "https://api.autheeka.com/graphql";
    const res = await fetch(apiUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 },
    });

    const json = await res.json();
    if (json.errors) {
      console.error(json.errors);
      const rawCode = json.errors[0]?.message || "Failed to fetch GraphQL API";
      throw new Error(translateError(rawCode));
    }

    return json.data;
  } catch (error) {
    console.error("Error fetching GraphQL:", error);
    throw error;
  }
}
