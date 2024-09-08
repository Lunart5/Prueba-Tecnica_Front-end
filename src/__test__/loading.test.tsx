import { render, screen } from "@testing-library/react";
import LoadingWrapper from "../components/loading";
import "@testing-library/jest-dom";

describe("Loading component", () => {
  it("show loading msg when loading is true", async () => {
    render(
      <LoadingWrapper isLoading={true}>
        <div>Result</div>
      </LoadingWrapper>
    );

    expect(screen.getByText("Cargando...")).toBeInTheDocument();
  });

  it("show children when is not loading", () => {
    render(
      <LoadingWrapper isLoading={false}>
        <div>children</div>
      </LoadingWrapper>
    );

    expect(screen.getByText("children")).toBeInTheDocument();
  });

  it("no render when no children is pass.", () => {
    const { container } = render(
      <LoadingWrapper isLoading={false} children={null} />
    );

    expect(container.firstChild).toBeNull();
  });

  it("does not show loading msg when is loading is false", () => {
    render(
      <LoadingWrapper isLoading={false}>
        <div>Child Content</div>
      </LoadingWrapper>
    );

    expect(screen.queryByText("Cargando...")).not.toBeInTheDocument();
  });
});
