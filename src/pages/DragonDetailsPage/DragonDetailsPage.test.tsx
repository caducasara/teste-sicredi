import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import DragonDetailPage from ".";
import api from "../../services/api";

jest.mock("../../services/api", () => ({
  get: jest.fn(),
  delete: jest.fn(),
}));

const mockedApi = api as jest.Mocked<typeof api>;
const mockNavigate = jest.fn();

jest.spyOn(require("react-router-dom"), "useNavigate").mockImplementation(() => mockNavigate);

function renderWithRouter(id: string) {
  return render(
    <MemoryRouter initialEntries={[`/dragon/${id}`]}>
      <Routes>
        <Route path="/dragon/:id" element={<DragonDetailPage />} />
        <Route path="/" element={<div>Home</div>} />
      </Routes>
    </MemoryRouter>
  );
}

describe("Dragon Detail Page", () => {
  beforeEach(() => {
    jest.spyOn(window, "confirm").mockImplementation(() => true);
  });

  it("mostra mensagem de carregando", () => {
    mockedApi.get.mockResolvedValueOnce({
      data: {
        id: "123",
        name: "Teste",
        type: "Fogo",
        createdAt: new Date().toISOString(),
        imageUrl: "",
        histories: [],
      },
    });

    renderWithRouter("123");

    expect(screen.getByText(/Carregando/i)).toBeInTheDocument();
  });

  it("Renders dragon details", async () => {
    mockedApi.get.mockResolvedValueOnce({
      data: {
        id: "123",
        name: "Dragão Feroz",
        type: "Fogo",
        createdAt: new Date().toISOString(),
        imageUrl: "https://exemplo.com/dragon.png",
        histories: ["Invadiu vilas", "Guardião de tesouros"],
      },
    });

    renderWithRouter("123");

    expect(await screen.findByText(/Dragão Feroz/i)).toBeInTheDocument();
    expect(screen.getByText(/Fogo/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Imagem do dragão/i)).toBeInTheDocument();
    expect(screen.getByText(/Invadiu vilas/i)).toBeInTheDocument();
    expect(screen.getByText(/Guardião de tesouros/i)).toBeInTheDocument();
  });

  it("Show message if dragon not found", async () => {
    mockedApi.get.mockRejectedValueOnce(new Error("Not Found"));

    renderWithRouter("999");

    await waitFor(() => {
        expect(screen.getByText(/Dragão não encontrado/i)).toBeInTheDocument();
    });
  });

  it("Cancel deletion if user does not confirm", async () => {
    (window.confirm as jest.Mock).mockReturnValueOnce(false);

    mockedApi.get.mockResolvedValueOnce({
      data: {
        id: "123",
        name: "Dragão Feroz",
        type: "Fogo",
        createdAt: new Date().toISOString(),
        imageUrl: "",
        histories: [],
      },
    });

    renderWithRouter("123");

    const deleteButton = await screen.findByRole("button", { name: /Excluir/i });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockedApi.delete).not.toHaveBeenCalled();
    });
  });
});