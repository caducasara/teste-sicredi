import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from ".";
import useAuth from "../../hooks/UseAuth";

jest.mock("../../hooks/UseAuth");
const mockedUseAuth = useAuth as jest.Mock;

describe("Login Page", () => {
  it("Send login form with correct username and password", async () => {
    const loginMock = jest.fn();
    mockedUseAuth.mockReturnValue({ login: loginMock });

    render(<LoginPage />);

    const userInput = screen.getByPlaceholderText(/Usuário/i);
    await userEvent.type(userInput, "meuUser");

    const passwordInput = screen.getByPlaceholderText(/Senha/i);
    await userEvent.type(passwordInput, "123456");

    const submitButton = screen.getByRole("button", { name: /Entrar/i });
    await userEvent.click(submitButton);

    expect(loginMock).toHaveBeenCalledWith("meuUser", "123456");
    expect(loginMock).toHaveBeenCalledTimes(1);
  });
});