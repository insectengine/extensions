import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import selectEvent from "react-select-event"
import CompatibilityFilter from "./compatibility-filter"

describe("compatibility filter", () => {
  const label = "Compatibility"

  describe("when the list is empty", () => {
    beforeEach(() => {
      render(<CompatibilityFilter />)
    })

    it("renders a title", () => {
      expect(screen.getByText(label)).toBeTruthy()
    })

    it("has a dropdown menu", () => {
      expect(screen.getByRole("combobox")).toBeTruthy()
    })

    it("gracefully does nothing on click", async () => {
      expect(screen.getByTestId("compatibility-form")).toHaveFormValues({
        compatibility: "",
      })
      await fireEvent.click(screen.getByRole("combobox"))
      expect(screen.getByTestId("compatibility-form")).toHaveFormValues({
        compatibility: "",
      })
    })
  })

  describe("when options are available", () => {
    const filterer = jest.fn()
    beforeEach(() => {
      filterer.mockReset()

      render(
        <CompatibilityFilter
          filterer={filterer}
          extensions={[
            { metadata: { quarkus_core_compatibility: "UNKNOWN" } },
            { metadata: { quarkus_core_compatibility: ["1.1", "1.2"] } },
          ]}
        />
      )
    })

    it("renders a title", () => {
      expect(screen.getByText(label)).toBeTruthy()
    })

    it("has a dropdown menu", () => {
      expect(screen.getByRole("combobox")).toBeTruthy()
    })

    it("nicely formats UNKNOWN", async () => {
      await selectEvent.select(screen.getByLabelText(label), "Unknown")
      expect(screen.getByTestId("compatibility-form")).toHaveFormValues({
        compatibility: "UNKNOWN",
      })
    })

    it("changes the value on click", async () => {
      expect(screen.getByTestId("compatibility-form")).toHaveFormValues({
        compatibility: "",
      })
      await selectEvent.select(screen.getByLabelText(label), "1.1")
      expect(screen.getByTestId("compatibility-form")).toHaveFormValues({
        compatibility: "1.1",
      })
    })

    it("sends a message on click", async () => {
      expect(screen.getByTestId("compatibility-form")).toHaveFormValues({
        compatibility: "",
      })
      await selectEvent.select(screen.getByLabelText(label), "1.1")
      expect(filterer).toHaveBeenCalledWith("1.1")
    })
  })
})
