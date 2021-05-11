import * as React from "react"

import { render } from "@testing-library/react"

import { Employment } from ".."

describe("<Employment />", () => {
  it("Should render correctly", () => {
    const { container } = render(<Employment />)

    expect(container)
  })
})
