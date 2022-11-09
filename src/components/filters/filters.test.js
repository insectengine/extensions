import React from "react"
import { render, screen } from "@testing-library/react"
import Filters from "./filters"

describe("filters bar", () => {
  const searcher = jest.fn()

  beforeEach(() => {
    render(
      <Filters
        categories={["lynx", "skunks", "moose"]}
        filterActions={{ searcher }}
      />
    )
  })

  it("renders categories", () => {
    expect(screen.getByText("Category")).toBeTruthy()
  })

  it("renders individual categories", () => {
    expect(screen.getByText("skunks")).toBeTruthy()
  })
})
