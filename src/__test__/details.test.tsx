import { render, screen, waitFor } from "@testing-library/react";
import { useDetails } from "../components/hooks/useDetails";
import { setupJestCanvasMock } from "jest-canvas-mock";
import { MemoryRouter } from "react-router-dom";
import UserDetails from "../pages/userDetails";
import { mockProfiles } from "./mocks";
import "@testing-library/jest-dom";

jest.mock("../components/hooks/useDetails");

describe("details view component", () => {
  const mockUseClientRect = jest.mocked(useDetails);

  beforeEach(() => {
    jest.resetAllMocks();
    setupJestCanvasMock();

    mockUseClientRect.mockReturnValue({
      userData: undefined,
      loadingData: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("show profile details correctly", async () => {
    mockUseClientRect.mockReturnValue({
      userData: mockProfiles[1],
      loadingData: false,
    });

    render(
      <MemoryRouter initialEntries={["/user"]}>
        <UserDetails />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("midudev")).toBeInTheDocument();
    });
  });

  test("show loading screen when loadingData is true", () => {
    mockUseClientRect.mockReturnValue({
      userData: undefined,
      loadingData: true,
    });

    render(
      <MemoryRouter initialEntries={["/user"]}>
        <UserDetails />
      </MemoryRouter>
    );

    expect(screen.getByText("Cargando...")).toBeInTheDocument();
  });
});
