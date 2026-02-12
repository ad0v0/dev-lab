import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { Header } from "@/components/Header";
import { useUI } from "@/stores/useUI";

describe("Header", () => {
  it("renders title and description", () => {
    render(<Header />);

    expect(screen.getByText("Colors catalog")).toBeInTheDocument();
    expect(screen.getByText("Where color meets structure.")).toBeInTheDocument();
  });
});

describe("Theme toggle", () => {
  beforeEach(() => {
    useUI.setState({ theme: 'light' });
  });

  it("toggles theme on button click", async () => {
    render(<Header />);

    const button = screen.getByLabelText('Toggle theme');
    await userEvent.click(button);
    expect(useUI.getState().theme).toBe('dark');
  })

  it("shows moon icon in light theme", () => {
    useUI.setState({ theme: 'light' });

    render(<Header />);

    expect(screen.getByLabelText('Toggle theme')).toHaveTextContent('🌙');
  });

  it("shows sun icon in dark theme", () => {
    useUI.setState({ theme: 'dark' });

    render(<Header />);

    expect(screen.getByLabelText('Toggle theme')).toHaveTextContent('☀️');
  });
});

