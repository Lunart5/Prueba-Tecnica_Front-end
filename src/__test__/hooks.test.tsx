import { renderHook, act, waitFor } from "@testing-library/react";
import { gitProfileServices } from "../services/githubProfiles";
import { useProfiles } from "../components/hooks/useProfiles";
import { useDetails } from "../components/hooks/useDetails";
import { useParams } from "react-router-dom";
import { mockProfiles } from "./mocks";

jest.mock("../services/githubProfiles");
jest.mock("react-router-dom", () => ({
  useParams: jest.fn(),
}));

describe("useDetails", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const mockUseClientRect = jest.mocked(gitProfileServices.getDetails);

  beforeEach(() => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
    jest.clearAllMocks();
    mockUseClientRect.mockImplementation(async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockProfiles[0]);
        }, 1000);
      });
    });
  });

  it("feth profile details", async () => {
    (useParams as jest.Mock).mockReturnValue({ user: "testUser" });

    mockUseClientRect.mockResolvedValueOnce(mockProfiles[0]);

    const { result } = renderHook(() => useDetails());

    expect(result.current.loadingData).toBe(true);
    expect(result.current.userData).toBeUndefined();

    await waitFor(() => expect(result.current.loadingData).toBe(false));

    expect(result.current.userData).toEqual(mockProfiles[0]);
  });

  it("error getting profile data", async () => {
    (useParams as jest.Mock).mockReturnValue({ user: "testUser" });

    (gitProfileServices.getDetails as jest.Mock).mockRejectedValueOnce(
      new Error("Error fetching user details")
    );

    const { result } = renderHook(() => useDetails());

    expect(result.current.loadingData).toBe(true);
    expect(result.current.userData).toBeUndefined();

    await waitFor(() => expect(result.current.loadingData).toBe(false));

    expect(result.current.userData).toBeUndefined();
  });

  it("should not fetch data if no user is provided", async () => {
    (useParams as jest.Mock).mockReturnValue({ user: undefined });
    const { result } = renderHook(() => useDetails());

    expect(result.current.loadingData).toBe(false);
    expect(result.current.userData).toBeUndefined();
  });
});

describe("useProfiles", () => {
  const mockUseClientRect = jest.mocked(gitProfileServices.getProfiles);

  afterEach(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
    jest.clearAllMocks();
    mockUseClientRect.mockImplementation(async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            incomplete_status: false,
            items: mockProfiles,
            total_count: mockProfiles.length,
          });
        }, 1000);
      });
    });
  });

  it("fetch data", async () => {
    mockUseClientRect.mockResolvedValueOnce({
      incomplete_status: false,
      items: mockProfiles,
      total_count: mockProfiles.length,
    });

    const { result } = renderHook(() => useProfiles());

    act(() => {
      result.current.getUserData("testUser");
    });

    expect(result.current.loadingData).toBe(true);
    expect(result.current.usersData).toBeUndefined();

    await waitFor(() => expect(result.current.loadingData).toBe(false));
    expect(result.current.usersData).toEqual(mockProfiles);
  });

  it("emulate error", async () => {
    (gitProfileServices.getProfiles as jest.Mock).mockRejectedValueOnce(
      new Error("Error fetching profiles")
    );
    const { result } = renderHook(() => useProfiles());

    act(() => {
      result.current.getUserData("testUser");
    });

    expect(result.current.loadingData).toBe(true);
    await waitFor(() => expect(result.current.loadingData).toBe(false));

    expect(result.current.usersData).toBeUndefined();
  });
});
