import { render, screen, waitFor } from "@testing-library/react";
import DragonsListPage from ".";
import api from "../../services/api";
import { Dragon } from "../../@types/DragonsInterface";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

interface ItensListProps {
  dragon: Dragon;
}

jest.mock("../../services/api", () => ({
  get: jest.fn(),
  delete: jest.fn(),
}));
const mockedApi = api as jest.Mocked<typeof api>;

jest.mock("../../components/ItemsList", () => ({ dragon }: ItensListProps) => {
  const { Link } = require("react-router-dom");
  return (
    <li>
      <Link to={`/dragon/${dragon.id}`}>{dragon.name}</Link>
    </li>
  );
});

describe("Dragons List Page", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Rende the list of dragons sorted by name", async () => {
    const dragões = [
      { id: "2", name: "Zarathustra" },
      { id: "1", name: "Apollo" },
      { id: "3", name: "Balthazar" },
    ];
    mockedApi.get.mockResolvedValueOnce({ data: dragões });

    render(
      <MemoryRouter>
        <DragonsListPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText(/carregando dados/i)).not.toBeInTheDocument();
    });

    const itens = screen.getAllByRole("listitem");
    expect(itens).toHaveLength(3);
    expect(itens[0]).toHaveTextContent("Apollo");
    expect(itens[1]).toHaveTextContent("Balthazar");
    expect(itens[2]).toHaveTextContent("Zarathustra");
  });

  it("Renders correct link to dragon page and navigates on click", async () => {
    const dragões = [{ id: "1", name: "Apollo" }];
    mockedApi.get.mockResolvedValueOnce({ data: dragões });

    render(
      <MemoryRouter initialEntries={["/"]}>
        <DragonsListPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText(/carregando/i)).not.toBeInTheDocument();
    });

    const link = screen.getByRole("link", { name: "Apollo" });

    expect(link).toHaveAttribute("href", "/dragon/1");
    await userEvent.click(link);
  });
});