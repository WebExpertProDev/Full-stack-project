/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import  { AuthModal } from './index';

import { IAuth } from './Auth';

// eslint-disable-next-line arrow-parens
const Template: Story<IAuth.IProps> = (args) => <AuthModal {...args} />;

export const AuthStory = Template.bind({});

export default {
  title: 'Components/Auth',
  component: AuthModal,
} as Meta;


AuthStory.args = {
    /* the args you need here will depend on your component */
}