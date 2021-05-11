import React, { Component } from "react";
// import ReactGA from "react-ga";
import Head from "next/head";

class Layout extends Component {
    // componentDidMount() {
    // 	const { settings } = this.props;
    // 	ReactGA.initialize(settings.footer.google_tracking_id);
    // }
    render() {
        let { header, i18n, settings } = this.props;
        settings = {
            main_title: "Housee",
            meta_description: "meta_description",
            ...settings
        };

        return (
            // <div className={cx(`app__${i18n.language}`, { "is-ltr": true })} dir={cx({ ltr: true })}>
            <>
                <Head>
                    <title>
                        {this.props.title}
                    </title>
                    <meta name="title" content={`${this.props.title} | ${settings.main_title}`} />
                    <meta name="description" content={this.props.meta_description || settings.meta_description} />
                    <meta name="keywords" content={`${this.props.keywords || "house"}`} />
                    <meta name="robots" content="index, follow" />
                    <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                    {/* <meta name="language" content="English"> */}
                </Head>

                {/*<Header settings={settings}>{header}</Header>*/}

                <section id="next__ssr__app">{this.props.children}</section>

                {/*<Footer settings={settings} />*/}
            </>
            // </div>
        );
    }
}

Layout.getInitialProps = async () => ({
    namespacesRequired: ["common"]
});

export default Layout;
