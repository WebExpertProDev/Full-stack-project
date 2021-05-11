import Document, { Head, Main, NextScript } from "next/document";
import React from "react";

const gtm_id = 'UA-172028425-1';

class SiteDocument extends Document {
    render() {
        return (
            <html>
            <Head>
                {/*Global site tag (gtag.js) - Google Analytics*/}
                <script async src={`https://www.googletagmanager.com/gtag/js?id=${gtm_id}`}/>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments)}
                    gtag('js', new Date());
                    gtag('config', '${gtm_id}');`
                    }}
                />
                <meta charSet="utf-8" />
                <link rel="apple-touch-icon" sizes="180x180" href="/static/svg/homepage/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/static/svg/homepage/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/static/svg/homepage/favicon-16x16.png"/>
                <link rel="manifest" href="/static/svg/homepage/site.webmanifest"/>
                <link rel="mask-icon" href="/static/svg/homepage/safari-pinned-tab.svg" color="#5bbad5"/>
                <meta name="msapplication-TileColor" content="#da532c"/>
                <meta name="theme-color" content="#ffffff"/>
                <meta name="apple-mobile-web-app-title" content="Housee" />
                <meta name="application-name" content="Housee" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="stylesheet" href="/static/css/bootstrap.min.css" />
                <link rel="stylesheet" href="/static/css/styles.css" />
            </Head>
            <body>
            <div className="root">
                <Main />
            </div>
            <NextScript />
            </body>
            </html>
        );
    }
}

export default SiteDocument;
