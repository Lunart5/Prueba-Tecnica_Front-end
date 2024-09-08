import { GET, GetMultiple } from "../services/methods";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ test: 100 }),
  })
) as jest.Mock;

describe("GET", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("get data succesfully", async () => {
    const mockResponse = { id: 1, login: "user123" };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await GET<{ id: number; login: string }>("users/user123");

    expect(fetch).toHaveBeenCalledWith("https://api.github.com/users/user123", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    expect(result).toEqual(mockResponse);
  });

  test("handle call results in error", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(GET("users/user123")).rejects.toThrow(
      "Error getting data, try again"
    );
  });
});

describe("GetMultiple", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("get multiple urls data", async () => {
    const mockData = [{ followers: 10 }, { followers: 20 }];
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockData[0],
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockData[1],
      });

    const result = await GetMultiple([
      "https://api.github.com/user/1",
      "https://api.github.com/user/2",
    ]);

    expect(fetch).toHaveBeenCalledTimes(2);

    expect(result).toEqual([
      { status: "fulfilled", value: { followers: { followers: 10 } } },
      { status: "fulfilled", value: { followers: { followers: 20 } } },
    ]);
  });

  test("at least 1 call fails", async () => {
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: false,
        status: 404,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ followers: 20 }),
      });

    const result = await GetMultiple([
      "https://api.github.com/user/1",
      "https://api.github.com/user/2",
    ]);

    expect(result).toEqual([
      {
        status: "fulfilled",
        value: {
          status: "rejected",
          reason: new Error("Error en la solicitud: 404"),
          value: null,
        },
      },
      { status: "fulfilled", value: { followers: { followers: 20 } } },
    ]);
  });
});
