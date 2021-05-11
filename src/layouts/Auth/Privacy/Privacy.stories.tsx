import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import Privacy from './index';

import { IPrivacy } from './Privacy';

// eslint-disable-next-line prettier/prettier
const Template: Story<IPrivacy.IProps> = (args) => <Privacy {...args}/>;

export const PrivacyStory = Template.bind({});

PrivacyStory.args = {
/* the args you need here will depend on your component */
};

export default {
    title: 'Auth/Privacy',
    component: Privacy,
} as Meta;

PrivacyStory.args = {
/* the args you need here will depend on your component */
} 