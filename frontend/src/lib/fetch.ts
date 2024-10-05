"use server";
export async function customFetch(url: string, options: RequestInit = {}) {
  const response = await fetch(`${process.env.BACKEND_URL}/${url}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Error en la petición");
  }

  return response;
}
