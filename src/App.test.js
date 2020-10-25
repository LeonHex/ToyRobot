import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders all required elements", () => {
  render(<App />);
  const labelElement = screen.getByText("Please enter the commands:");
  expect(labelElement).toBeInTheDocument();
  const textElement = screen.getByRole("textbox");
  expect(textElement).toBeInTheDocument();
  const btnElement = screen.getByRole("button");
  expect(btnElement).toBeInTheDocument();
  const resultElement = screen.getByText((content, element) =>
    content.startsWith("output:")
  );
  expect(resultElement).toBeInTheDocument();
});

test("execute first sample commands", () => {
  render(<App />);
  const textElement = screen.getByRole("textbox");
  textElement.textContent = `PLACE 0,0,NORTH
MOVE
REPORT`;
  const btnElement = screen.getByRole("button");
  fireEvent.click(btnElement);
  const resultElement = screen.getByText((content, element) =>
    content.startsWith("output:")
  );
  expect(resultElement).toHaveTextContent("output: 0, 1, NORTH");
});

test("execute second sample commands", () => {
  render(<App />);
  const textElement = screen.getByRole("textbox");
  textElement.textContent = `PLACE 0,0,NORTH
LEFT
REPORT`;
  const btnElement = screen.getByRole("button");
  fireEvent.click(btnElement);
  const resultElement = screen.getByText((content, element) =>
    content.startsWith("output:")
  );
  expect(resultElement).toHaveTextContent("output: 0, 0, WEST");
});

test("execute third sample commands", () => {
  render(<App />);
  const textElement = screen.getByRole("textbox");
  textElement.textContent = `PLACE 1,2,EAST
MOVE
MOVE
LEFT
MOVE
REPORT`;
  const btnElement = screen.getByRole("button");
  fireEvent.click(btnElement);
  const resultElement = screen.getByText((content, element) =>
    content.startsWith("output:")
  );
  expect(resultElement).toHaveTextContent("output: 3, 3, NORTH");
});

test("execute first custom commands", () => {
  render(<App />);
  const textElement = screen.getByRole("textbox");
  textElement.textContent = `PLACE 1,2,EAST
MOVE
MOVE
LEFT
MOVE
MOVE
MOVE
REPORT`;
  const btnElement = screen.getByRole("button");
  fireEvent.click(btnElement);
  const resultElement = screen.getByText((content, element) =>
    content.startsWith("output:")
  );
  expect(resultElement).toHaveTextContent("output: 3, 4, NORTH");
});

test("execute second custom commands", () => {
  render(<App />);
  const textElement = screen.getByRole("textbox");
  textElement.textContent = `MOVE
PLACE 1,2,EAST
MOVE
MOVE
LEFT
MOVE
MOVE
MOVE
REPORT`;
  const btnElement = screen.getByRole("button");
  fireEvent.click(btnElement);
  const resultElement = screen.getByText((content, element) =>
    content.startsWith("output:")
  );
  expect(resultElement).toHaveTextContent("output: 3, 4, NORTH");
});

test("execute third custom commands", () => {
  render(<App />);
  const textElement = screen.getByRole("textbox");
  textElement.textContent = `MOVE
MOVE
MOVE
LEFT
MOVE
PLACE 1,2,EAST
MOVE
MOVE
REPORT`;
  const btnElement = screen.getByRole("button");
  fireEvent.click(btnElement);
  const resultElement = screen.getByText((content, element) =>
    content.startsWith("output:")
  );
  expect(resultElement).toHaveTextContent("output: 3, 2, EAST");
});

test("execute empty commands", () => {
  render(<App />);
  const textElement = screen.getByRole("textbox");
  textElement.textContent = "";
  const btnElement = screen.getByRole("button");
  fireEvent.click(btnElement);
  const resultElement = screen.getByText((content, element) =>
    content.startsWith("output:")
  );
  expect(resultElement).toHaveTextContent("output:");
});
