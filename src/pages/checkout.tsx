/* eslint-disable import/no-named-as-default */
import React from "react";
import { NextPage } from "next";

import { ICheckoutPage } from "@Interfaces/index";

// Views
import Checkout from "../containers/Checkout";

export const CheckoutPage: NextPage<ICheckoutPage.IProps> = () => <Checkout />;

// Detail.getInitialProps = async () => ({
//   namespacesRequired: ['common', 'main'],
// });

export default Checkout;
