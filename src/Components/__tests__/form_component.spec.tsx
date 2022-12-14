import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { validate } from "../../Utils/validate";
import { FormComponent } from "../form_component";

const mockOnSubmit = jest.fn();

describe("FormComponent", () => {
  describe("Submit form", () => {
    it("must submit form - userEvent", async () => {
      const user = userEvent.setup();

      render(<FormComponent onSubmit={mockOnSubmit} validate={validate} />);

      await user.type(screen.getByTestId("name"), "user");

      await user.type(screen.getByTestId("email"), "mail@mail.com");

      await user.click(screen.getByRole("button", { name: /submit/i }));

      await waitFor(() =>
        expect(mockOnSubmit).toHaveBeenCalledWith({
          name: "user",
          email: "mail@mail.com",
        })
      );
    });

    it("must submit form - fireEvent", async () => {
      render(<FormComponent onSubmit={mockOnSubmit} validate={validate} />);

      await act(async () => {
        fireEvent.change(screen.getByTestId("name"), {
          target: { value: "user" },
        });

        fireEvent.change(screen.getByTestId("email"), {
          target: { value: "mail@mail.com" },
        });

        fireEvent.click(screen.getByText("Submit"));
      });

      await waitFor(() =>
        expect(mockOnSubmit).toHaveBeenCalledWith({
          name: "user",
          email: "mail@mail.com",
        })
      );
    });

    it("must cancel submition", async () => {
      render(<FormComponent onSubmit={mockOnSubmit} validate={validate} />);

      await act(async () => {
        fireEvent.change(screen.getByTestId("name"), {
          target: { value: "user" },
        });

        fireEvent.change(screen.getByTestId("email"), {
          target: { value: "mail@mail.com" },
        });

        fireEvent.click(screen.getByText("Cancel"));
      });

      expect(screen.getByTestId("name")).toHaveValue("");

      expect(screen.getByTestId("email")).toHaveValue("");
    });
  });

  describe("Validate form", () => {
    it("must show form validation", async () => {
      render(<FormComponent onSubmit={mockOnSubmit} validate={validate} />);

      await act(async () => {
        fireEvent.change(screen.getByTestId("name"), {
          target: { value: "" },
        });

        fireEvent.change(screen.getByTestId("email"), {
          target: { value: "" },
        });

        fireEvent.click(screen.getByText("Submit"));
      });

      expect(screen.getByText("Name required")).toBeInTheDocument();

      expect(screen.getByText("Email required")).toBeInTheDocument();
    });

    it("must show email validation", async () => {
      render(<FormComponent onSubmit={mockOnSubmit} validate={validate} />);

      await act(async () => {
        fireEvent.change(screen.getByTestId("name"), {
          target: { value: "user" },
        });

        fireEvent.change(screen.getByTestId("email"), {
          target: { value: "mail@mail" },
        });

        fireEvent.click(screen.getByText("Submit"));
      });

      expect(screen.getByText("Invalid email address")).toBeInTheDocument();
    });
  });
});
