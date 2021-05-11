/* eslint-disable import/no-extraneous-dependencies */
import React from "react"
import { Meta, Story } from "@storybook/react/types-6-0"
import { Employment } from "./index"

import { IEmployment } from "./Employment"

// eslint-disable-next-line arrow-parens
const Template: Story<IEmployment.IProps> = args => <Employment {...args} />

export const EmploymentStory = Template.bind({})

export default {
  title: "Components/Employment",
  component: Employment,
} as Meta

EmploymentStory.args = {
  /* the args you need here will depend on your component */
}
