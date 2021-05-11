/* eslint-disable import/no-named-as-default */
import React from 'react';
import { NextPage } from 'next';

import { IDetailPage } from '@Interfaces/index';

// Views
import Detail from '../../containers/Detail';

export async function getServerSideProps(context) {
    const url = "http://localhost:5000/api/getHomeListingbyID";
    const id = context.params.id
    const req1 = new Request(url, {
      method: "POST",
      body: JSON.stringify({ id: id }),
      headers: {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    });

    const url2 = "http://localhost:5000/api/getSimilarHomesbyID";
    const req2 = new Request(url2, {
      method: "POST",
      body: JSON.stringify({ id: id }),
      headers: {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    });

    const url3 = "http://localhost:5000/api/getNearbyHomesbyID";
    const req3 = new Request(url3, {
      method: "POST",
      body: JSON.stringify({ id: id }),
      headers: {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    });

    const url4 = "http://localhost:5000/api/incrementHomeView";
    const req4 = new Request(url4, {
      method: "POST",
      body: JSON.stringify({ id: id }),
      headers: {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    });
  
    const [detail, similarHomes, nearbyHomes] = await Promise.all([fetch(req1), fetch(req2), fetch(req3)]);
    fetch(req4);
    if (detail.status !== 200){
        return { props: { status: detail.status } };
    } else if (similarHomes.status !== 200){
      return { props: { status: similarHomes.status } };
    } else if (nearbyHomes.status !== 200){
      return { props: { status: nearbyHomes.status } };
    }
    const [temp1, temp2, temp3] = await Promise.all([detail.json(), similarHomes.json(), nearbyHomes.json()]);

    return { props: { detail: temp1, similarHomes: temp2, nearbyHomes: temp3, status: detail.status }}
  
  }

export const DetailPage: NextPage<IDetailPage.IProps> = ( props ) => <Detail props={props}/>;

// Detail.getInitialProps = async () => ({
//   namespacesRequired: ['common', 'main'],
// });

export default Detail;
