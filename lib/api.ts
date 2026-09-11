export async function fetchGraphQL(query: string, variables: any = {}) {
  try {
    const res = await fetch("https://api.autheeka.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 },
    });

    const json = await res.json();
    if (json.errors) {
      console.error(json.errors);
      throw new Error("Failed to fetch GraphQL API");
    }

    return json.data;
  } catch (error) {
    console.error("Error fetching GraphQL:", error);
    return null;
  }
}
