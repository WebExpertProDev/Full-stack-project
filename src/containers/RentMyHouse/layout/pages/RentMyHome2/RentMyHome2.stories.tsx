/* eslint-disable import/no-extraneous-dependencies */
import React from "react"
import { Meta, Story } from "@storybook/react/types-6-0"
import RentMyHome2 from "./index"

import { IRentMyHome } from "./RentMyHome2"

// eslint-disable-next-line prettier/prettier
const Template: Story<IRentMyHome.IProps> = args => <RentMyHome2 {...args} />

export const RentMyHome2Story = Template.bind({})

RentMyHome2Story.args = {
  /* the args you need here will depend on your component */
}

export default {
  title: "RequestTour/Layout/RentMyHome2",
  component: RentMyHome2,
} as Meta
