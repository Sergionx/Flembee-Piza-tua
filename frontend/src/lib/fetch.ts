"use server";

export async function customFetch(url: string, options: RequestInit = {}) {
  const {headers, ...rest} = options

  const combinedHeaders = new Headers({
    'Content-Type': 'application/json',
    ...headers,
  })

  const response = await fetch(`${process.env.BACKEND_URL}/${url}`, {
    headers: combinedHeaders,
    ...rest,
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Error en la petición");
  }

  return response;
}

