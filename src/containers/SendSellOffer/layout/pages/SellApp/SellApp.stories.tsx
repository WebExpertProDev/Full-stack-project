/* eslint-disable import/no-extraneous-dependencies */
import React from "react"
import { Meta, Story } from "@storybook/react/types-6-0"
import { SellApp } from "./index"

import { ISellApp } from "./SellApp"

// eslint-disable-next-line arrow-parens
const Template: Story<ISellApp.IProps> = args => <SellApp {...args} />

export const SellAppStory = Template.bind({})

export default {
  title: "Components/RentalApp",
  component: SellApp,
} as Meta

SellAppStory.args = {
  /* the args you need here will depend on your component */
}
