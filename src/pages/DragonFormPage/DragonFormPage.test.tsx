import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DragonFormPage from ".";
import api from "../../services/api";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../services/api", () => ({
  get: jest.fn(),
  delete: jest.fn(),
  post: jest.fn(),
}));

const mockedApi = api as jest.Mocked<typeof api>;
const mockNavigate = jest.fn();

jest.spyOn(require("react-router-dom"), "useNavigate").mockReturnValue(mockNavigate);

describe("Dragon Form Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Fill form, add story and sent successfully", async () => {
    mockedApi.post.mockResolvedValueOnce({});

    const { container } = render(
      <MemoryRouter>
        <DragonFormPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Criar Dragão/i)).toBeInTheDocument();
    expect(screen.getByText(/Histórias/i)).toBeInTheDocument();

    const nameInput = container.querySelector('input[name="name"]') as HTMLInputElement;
    const typeInput = container.querySelector('input[name="type"]') as HTMLInputElement;
    const imageUrlInput = container.querySelector('input[name="imageUrl"]') as HTMLInputElement;

    expect(nameInput).toBeInTheDocument();
    expect(typeInput).toBeInTheDocument();
    expect(imageUrlInput).toBeInTheDocument();

    await userEvent.type(nameInput, "Fang");
    await userEvent.type(typeInput, "Fogo");
    await userEvent.type(imageUrlInput, "http://img.com/dragon.png");

    const historyInputs = container.querySelectorAll('fieldset input[type="text"]');
    expect(historyInputs.length).toBeGreaterThan(0);
    await userEvent.type(historyInputs[0], "Primeira história");

    const addHistoryButton = screen.getByRole("button", { name: /\+ Adicionar história/i });
    await userEvent.click(addHistoryButton);

    const updatedHistoryInputs = container.querySelectorAll('fieldset input[type="text"]');
    expect(updatedHistoryInputs).toHaveLength(2);
    await userEvent.type(updatedHistoryInputs[1], "Segunda história");

    const submitButton = screen.getByRole("button", { name: /Salvar/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockedApi.post).toHaveBeenCalledWith("", {
        name: "Fang",
        type: "Fogo",
        imageUrl: "http://img.com/dragon.png",
        histories: ["Primeira história", "Segunda história"],
      });
    });
  });
});