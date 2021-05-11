/* eslint-disable import/no-extraneous-dependencies */
import React from "react"
import { Meta, Story } from "@storybook/react/types-6-0"
import RentMyHome from "./index"

import { IRentMyHome } from "./RentMyHome"

// eslint-disable-next-line prettier/prettier
const Template: Story<IRentMyHome.IProps> = args => <RentMyHome {...args} />

export const RentMyHomeStory = Template.bind({})

RentMyHomeStory.args = {
  /* the args you need here will depend on your component */
}

export default {
  title: "RequestTour/Layout/RentMyHome",
  component: RentMyHome,
} as Meta
