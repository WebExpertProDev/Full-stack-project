/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { Confirmation } from "./index";

import { IConfirmation } from "./Confirmation";

// eslint-disable-next-line arrow-parens
const Template: Story<IConfirmation.IProps> = args => (
  <Confirmation {...args} />
);

export const ConfirmationStory = Template.bind({});

export default {
  title: "Components/Confirmation",
  component: Confirmation
} as Meta;

ConfirmationStory.args = {
  /* the args you need here will depend on your component */
};
