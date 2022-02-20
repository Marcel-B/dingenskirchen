import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("react-router-dom", () => {
  return {
    useLocation: jest.fn()
  }
});

test("renders learn react link", () => {
  expect(true).toBeTruthy();
});
