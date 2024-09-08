import { render, screen, waitFor } from "@testing-library/react";
import { useProfiles } from "../components/hooks/useProfiles";
import { setupJestCanvasMock } from "jest-canvas-mock";
import { MemoryRouter } from "react-router-dom";
import MainPageView from "../pages/main";
import { mockProfiles } from "./mocks";
import "@testing-library/jest-dom";

jest.mock("../components/hooks/useProfiles");

describe("main view component", () => {
  const mockUseClientRect = jest.mocked(useProfiles);

  beforeEach(() => {
    jest.resetAllMocks();
    setupJestCanvasMock();

    mockUseClientRect.mockReturnValue({
      getUserData: jest.fn(),
      loadingData: false,
      usersData: undefined,
      followersData: undefined,
      loadingFollowers: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("show profiles list correctly", async () => {
    mockUseClientRect.mockReturnValue({
      getUserData: jest.fn(),
      loadingData: false,
      usersData: mockProfiles,
      followersData: undefined,
      loadingFollowers: false,
    });

    render(
      <MemoryRouter>
        <MainPageView />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("midu")).toBeInTheDocument();
      expect(screen.getByText("midudev")).toBeInTheDocument();
    });
  });
  test("show loading screen when loadingData is true", () => {
    mockUseClientRect.mockReturnValue({
      getUserData: jest.fn(),
      loadingData: true,
      usersData: undefined,
      followersData: undefined,
      loadingFollowers: false,
    });

    render(
      <MemoryRouter>
        <MainPageView />
      </MemoryRouter>
    );

    expect(screen.getByText("Cargando...")).toBeInTheDocument();
  });

  test("show no users message when usersData.length===0", () => {
    mockUseClientRect.mockReturnValue({
      getUserData: jest.fn(),
      loadingData: false,
      usersData: [],
      followersData: undefined,
      loadingFollowers: false,
    });

    render(
      <MemoryRouter>
        <MainPageView />
      </MemoryRouter>
    );

    expect(
      screen.getByText("No hay resultados para esta busqueda")
    ).toBeInTheDocument();
  });
});
