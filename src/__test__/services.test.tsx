import { gitProfileServices } from "../services/githubProfiles";
import { GET } from "../services/methods";
import {
  followersMock,
  mockProfiles,
  errorProfileFollowersUrls,
  profileFollowersUrls,
} from "./mocks";

jest.mock("../services/methods");

describe("gitProfileServices", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("getProfiles debe obtener perfiles correctamente", async () => {
    const mockResponse = {
      items: mockProfiles,
    };
    (GET as jest.Mock).mockResolvedValueOnce(mockResponse);

    const result = await gitProfileServices.getProfiles("user123");

    expect(GET).toHaveBeenCalledWith("search/users?q=user123&per_page=10");
    expect(result).toEqual(mockResponse);
  });

  test("getDetails debe obtener los detalles de un usuario correctamente", async () => {
    const mockResponse = mockProfiles[0];
    (GET as jest.Mock).mockResolvedValueOnce(mockResponse);

    const result = await gitProfileServices.getDetails("user1");

    expect(GET).toHaveBeenCalledWith("users/user1");
    expect(result).toEqual(mockResponse);
  });

  test("getFollowers debe obtener los seguidores de una lista de usuarios", async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => followersMock,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => followersMock,
      });

    const result = await gitProfileServices.getFollowers(profileFollowersUrls);

    expect(fetch).toHaveBeenCalledTimes(2);

    expect(result).toEqual([
      { status: "fulfilled", value: followersMock[0] },
      { status: "fulfilled", value: followersMock[1] },
    ]);
  });

  test("getFollowers debe manejar errores correctamente", async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        ok: false,
        status: 500,
      })
      .mockResolvedValueOnce({
        ok: false,
        status: 400,
      });

    const result = await gitProfileServices.getFollowers(
      errorProfileFollowersUrls
    );

    expect(result).toEqual([
      {
        status: "fulfilled",
        value: {
          status: "rejected",
          reason: new Error("Error en la solicitud: 500"),
          value: null,
        },
      },
      {
        status: "fulfilled",
        value: {
          status: "rejected",
          reason: new Error("Error en la solicitud: 400"),
          value: null,
        },
      },
    ]);
  });
});
