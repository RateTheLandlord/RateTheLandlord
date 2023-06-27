/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import CityComboBox from "./CityComboBox";

describe("CityComboBox", () => {
  const options = [
    { id: 1, city: "New York", state: "New York" },
    { id: 2, city: "Los Angeles", state: "LA" },
    { id: 3, city: "Chicago", state: "Illinois" }
  ];

  const handleChange = jest.fn();

  beforeEach(() => {
    render(
      <CityComboBox
        name="City"
        state=""
        setState={handleChange}
        options={options}
        searching={false}
      />
    );
  });

  test("renders component with label and placeholder", () => {
    const labelElement = screen.getByText("City");
    const inputElement = screen.getByPlaceholderText("City");

    expect(labelElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
  });
});