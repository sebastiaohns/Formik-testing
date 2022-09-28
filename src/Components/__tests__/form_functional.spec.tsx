import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { validate } from "../../Utils/validate";
import { FormFunctional } from "../form_functional";

const handleSubmit = jest.fn();

describe("FormFunctional", () => {
  describe("Submit form", () => {
    it("must submit form - userEvent", async () => {
      const user = userEvent.setup();

      render(<FormFunctional onSubmit={handleSubmit} validate={validate} />);

      await user.type(screen.getByLabelText(/name/i), "sebastiao");

      await user.type(screen.getByLabelText(/email/i), "sebastiao@mail.com");

      await user.click(screen.getByRole("button", { name: /submit/i }));

      await waitFor(() =>
        expect(handleSubmit).toHaveBeenCalledWith({
          email: "sebastiao@mail.com",
          name: "sebastiao",
        })
      );
    });

    it("must submit form - fireEvent", async () => {
      render(<FormFunctional onSubmit={handleSubmit} validate={validate} />);

      await act(async () => {
        fireEvent.input(screen.getByTestId("name"), {
          target: { value: "name" },
        });

        fireEvent.input(screen.getByTestId("email"), {
          target: { value: "sebastiao@mail.com" },
        });

        fireEvent.submit(screen.getByText("Submit"));

        expect(handleSubmit).toHaveBeenCalledWith({
          email: "sebastiao@mail.com",
          name: "sebastiao",
        });
      });
    });

    it("must cancel submission", async () => {
      render(<FormFunctional onSubmit={handleSubmit} validate={validate} />);

      await act(async () => {
        fireEvent.change(screen.getByTestId("name"), {
          target: { value: "sebastiao" },
        });

        fireEvent.change(screen.getByTestId("email"), {
          target: { value: "sebatiao@mail.com" },
        });

        fireEvent.click(screen.getByText("Cancel"));
      });

      expect(screen.getByTestId("name")).toHaveValue("");

      expect(screen.getByTestId("email")).toHaveValue("");
    });
  });

  describe("Validate form", () => {
    it("must show form validation", async () => {
      render(<FormFunctional onSubmit={handleSubmit} validate={validate} />);

      await act(async () => {
        fireEvent.change(screen.getByTestId("name"), {
          target: { value: "" },
        });

        fireEvent.input(screen.getByTestId("email"), {
          target: { value: "" },
        });

        fireEvent.submit(screen.getByText("Submit"));
      });

      expect(screen.getByText("Name required")).toBeInTheDocument();

      expect(screen.getByText("Email required")).toBeInTheDocument();
    });

    it("must show email validation", async () => {
      render(<FormFunctional onSubmit={handleSubmit} validate={validate} />);

      await act(async () => {
        fireEvent.change(screen.getByTestId("name"), {
          target: { value: "sebastiao" },
        });

        fireEvent.input(screen.getByTestId("email"), {
          target: { value: "sebatiao@mail" },
        });

        fireEvent.submit(screen.getByText("Submit"));
      });

      expect(screen.getByText("Invalid email address")).toBeInTheDocument();
    });
  });
});
