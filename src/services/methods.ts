export const GET = async <T>(endpoint: string): Promise<T> => {
  const baseUrl = "https://api.github.com/";
  const url = `${baseUrl}${endpoint}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return handleResponse<T>(response);
};

export const GetMultiple = async (list: string[]) => {
  const promises = list.map(async (item) => {
    try {
      const response = await fetch(item);
      if (response.ok) {
        const followers = await response.json();
        return { followers };
      }
      throw new Error(`Error en la solicitud: ${response.status}`);
    } catch (error) {
      return { status: "rejected", reason: error, value: null };
    }
  });
  const results = await Promise.allSettled(promises);
  return results;
};

async function handleResponse<T>(response: Response): Promise<T> {
  if (response.ok) {
    return response.json();
  }
  throw new Error("Error getting data, try again");
}
