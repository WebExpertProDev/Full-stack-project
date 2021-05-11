import React, {useEffect} from 'react'
import CustomLayout from "../layouts/CustomLayout";
// import 'antd/dist/antd.css';
import '../static/css/styles.css';

export default ({ Component, pageProps }) => {
    return (
        <CustomLayout>
            <Component {...pageProps} />
        </CustomLayout>
    );
}
