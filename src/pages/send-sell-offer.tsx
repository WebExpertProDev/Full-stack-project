import React from 'react';
import { NextPage } from 'next';

import { ISendSellOfferPage } from '@Interfaces/index';

// Views
import SendSellOffer from '@containers/SendSellOffer';

export const SendSellOfferPage: NextPage<ISendSellOfferPage.IProps> = () => <SendSellOffer />;

export default SendSellOffer;