import { fireEvent, render, screen } from "@testing-library/react";
import { useProfiles } from "../components/hooks/useProfiles";
import "@testing-library/jest-dom";
import FormComponent from "../components/form";

jest.mock("../components/hooks/useProfiles");

describe("MainPageView form", () => {
  const mockGetUserData = jest.fn();
  const handleSubmit = jest.fn((event) => {
    event.preventDefault();
    const data = new FormData(event?.currentTarget as HTMLFormElement);
    const userName = data.get("username")?.toString();

    if (!userName || userName.length < 4 || userName === "iseijasunow") {
      return;
    } else {
      mockGetUserData(userName);
    }
  });

  beforeEach(() => {
    jest.clearAllMocks();

    (useProfiles as jest.Mock).mockReturnValue({
      getUserData: mockGetUserData,
      loadingData: false,
      usersData: [],
      followersData: null,
      loadingFollowers: false,
    });
  });

  it("check if form renders correctly", () => {
    render(<FormComponent handleSubmit={handleSubmit} />);

    expect(screen.getByText("Buscar en Github")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Buscar")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Buscar/i })).toBeInTheDocument();
  });

  it("happy path call getUserData", () => {
    render(<FormComponent handleSubmit={handleSubmit} />);

    const input = screen.getByPlaceholderText("Buscar");
    const form = screen.getByTestId("form");

    fireEvent.change(input, { target: { value: "testUser" } });
    fireEvent.submit(form);

    expect(mockGetUserData).toHaveBeenCalledWith("testUser");
  });

  it("username empty to call getUserData", () => {
    render(<FormComponent handleSubmit={handleSubmit} />);

    const form = screen.getByTestId("form");
    fireEvent.submit(form);

    expect(mockGetUserData).not.toHaveBeenCalled();
  });

  it("username < 4 length", () => {
    render(<FormComponent handleSubmit={handleSubmit} />);

    const input = screen.getByPlaceholderText("Buscar");
    const form = screen.getByTestId("form");

    fireEvent.change(input, { target: { value: "abc" } });
    fireEvent.submit(form);

    expect(mockGetUserData).not.toHaveBeenCalled();
  });

  it("avoid to call getuserData when 'iseijasunow' ", () => {
    render(<FormComponent handleSubmit={handleSubmit} />);

    const input = screen.getByPlaceholderText("Buscar");
    const form = screen.getByTestId("form");

    fireEvent.change(input, { target: { value: "iseijasunow" } });
    fireEvent.submit(form);

    expect(mockGetUserData).not.toHaveBeenCalled();
  });
});
