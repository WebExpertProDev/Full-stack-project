import Link from "next/link";
import VerticalLine from "../common/VerticalLine";
import React from "react";

const FOOTER_JSON = [
    {
        label: 'Contact Us',
        children : [
            {
                label: '651 888 9669',
                url: 'tel:+1-651-888-9669'
            },
            {
                label: 'Mon-Fri 8AM-6PM',
                url: '#'
            }
        ]
    },
    {
        label: 'Company',
        children : [
            {
                label: 'About',
                url: '/about'
            },
            {
                label: 'Jobs',
                url: '/jobs'
            },
            {
                label: 'Find an Agent',
                url: '/find-an-agent'
            },
            {
                label: 'Agents',
                url: '/agents'
            },
            {
                label: 'Partners',
                url: '/partners'
            },
        ]
    },
    {
        label: 'Sell you Home',
        children : [
            {
                label: 'Real State Offer',
                url: '/offer'
            },
            {
                label: 'In Person with AI',
                url: '/in-person-with-ai'
            },
            {
                label: 'With Agent and AI',
                url: '/with-agent-and-ai'
            }
        ]
    },
    {
        label: 'Find a Home',
        children : [
            {
                label: 'Buy',
                url: '/buy-a-home'
            },
            {
                label: 'Rent',
                url: '/rent-a-home'
            }
        ]
    },
    {
        label: 'Resource',
        children : [
            {
                label: 'Blog',
                url: '/blog'
            },
            {
                label: 'Buying Guide',
                url: '/guides/buying'
            },
            {
                label: 'Selling Guide',
                url: '/guides/selling'
            },
            {
                label: 'FAQs',
                url: '/frequently-asked-questions'
            },
        ]
    },
];

const SECOND_FOOTER_JSON = {
    social_media: [
        {
            icon: '/icons/footer/twitter.svg',
            link: 'https://twitter.com'
        },
        {
            icon: '/icons/footer/youtube.svg',
            link: 'https://youtube.com'
        },
        {
            icon: '/icons/footer/linkedin.svg',
            link: 'https://linkedin.com'
        },
        {
            icon: '/icons/footer/pinterest.svg',
            link: 'https://pinterest.com'
        },
    ],
    static_pages: [
        {
            title: 'Term & Privacy',
            link: '/terms'
        },
        {
            title: 'Certificates & Awards',
            link: '/certificates-awards'
        },
        {
            title: 'My Account',
            link: '/dashboard'
        },
    ]

};

const SecondFooter = () => {
    return <div className="row second-footer">
        <div className="col">
            <ul>
                {SECOND_FOOTER_JSON.social_media.map(({icon, link}) =>
                    <li className="mx-2">
                        <Link href={link}>
                            <a>
                                <img src={icon}/>
                            </a>
                        </Link>
                    </li>
                )}
            </ul>
        </div>
        <div className="col">
            <ul style={{
                float: 'right'
            }}>
                {SECOND_FOOTER_JSON.static_pages.map(({title, link}, i) =>
                    <>
                        {i > 0 && <VerticalLine color={"var(--warm-grey)"}/>}
                        <li className="mx-3">
                            <Link href={link}>
                                <a>
                                    <div className="content">
                                        {title}
                                    </div>
                                </a>
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </div>
        <style jsx>{`
        .second-footer ul li {
            list-style-type: none;
        }
        .second-footer ul {
            display: flex;
        }
        .second-footer {
            display: flex;
        }
        .content {
          opacity: 0.6;
          font-family: Rubik;
          font-size: 14px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.21;
          letter-spacing: normal;
          text-align: right;
          color: #1e1713;
        }
        `}</style>
    </div>
};

const Footer = () => {
    return <footer style={{
        padding: '2rem 0',
        display: "flex",
        zIndex: 1,
        borderTop: 'solid 3px #f3f3f3',
        background: 'white'
    }} className="container">
        <div className="col">
            <div className="row mx-auto">
                {
                    FOOTER_JSON.map(({label, children}) => (
                        <div className="col">
                            <ul>
                                <div className="text-center Segoe-UI-14pt">{label}</div>
                                <div className={"horizontal-line mt-4 mb-3"}/>
                                {children.map(({label, url}) =>
                                    <li>
                                        <Link href={url}>
                                            <a className="Segoe-UI-14pt">
                                                {label}
                                            </a>
                                        </Link>
                                    </li>)}
                            </ul>
                        </div>)
                    )
                }
                <div className={"my-3"} style={{
                    width: '100%',
                    borderBottom: '2px solid #f3f3f3'
                }}/>
            </div>
            <SecondFooter/>
        </div>
        <style jsx>{`
    ul li {
      list-style-type: none;
      margin: 5px 0;
    }
    ul {
    min-width: 170px;
    }
    .horizontal-line {
        border-bottom: 1px solid var(--turquoise-blue);
    }
        `}</style>
    </footer>
};


export default Footer;
