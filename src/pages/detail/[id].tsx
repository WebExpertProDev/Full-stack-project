/* eslint-disable import/no-named-as-default */
import React from 'react';
import { NextPage } from 'next';

import { IDetailPage } from '@Interfaces/index';

// Views
import Detail from '../../containers/Detail';
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
    const url = "http://localhost:5000/api/getRentListingbyID";
    const req = new Request(url, {
      method: "POST",
      body: JSON.stringify({ id: context.params.id }),
      headers: {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    });
  
    const res = await fetch(req);
    if (res.status !== 200){
        return { props: { status: res.status } };
    }
    const listingDetail = await res.json();
    return { props: { detail: listingDetail, status: res.status }}
  
  }

export const DetailPage: NextPage<IDetailPage.IProps> = () => <Detail />;

// Detail.getInitialProps = async () => ({
//   namespacesRequired: ['common', 'main'],
// });

export default Detail;
