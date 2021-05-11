import React, { useState, useEffect } from 'react'
import { withRouter } from "next/router";
import VerticalLine from "../common/VerticalLine";


const headerLabels = [
    {
        label: 'Find a home',
        children: [
            {
                label: 'Buy',
                url: '/buy-home'
            },
            {
                label: 'Rent',
                url: '/rent-home'
            },
        ]
    },
    // TODO: only when logged in
    // {
    //     label: 'Find a service',
    //     children: [
    //         {
    //             label: 'Find an Agent',
    //             url: '/services/find-agent'
    //         },
    //         {
    //             label: 'Find a Partner',
    //             url: '/services/find-partner'
    //         },
    //     ]
    // },
    {
        label: 'List Your Home',
        children: [
            {
                label: 'For Sale',
                url: '/list-for-sale'
            },
            {
                label: 'For Rent',
                url: '/list-for-rent'
            },
        ]
    },
    {
        label: 'Rent Your Home',
        children: [
            {
                label: 'For Sale',
                url: '/list-for-sale'
            },
            {
                label: 'For Rent',
                url: '/list-for-rent'
            },
        ]
    },
    {
        label: 'Join Housee',
        children: [
            {
                label: 'Become a Partner',
                url: '/become-partner'
            },
            {
                label: 'Become a Housee Agent',
                url: '/become-agent'
            },
        ]
    }
];

const Header = ({ router }) => {
    const [isHomepage, setIsHomepage] = useState(false);

    return <>
        <div style={{
            height: 73,
            backgroundColor: 'rgba(63, 63, 63, 0.72)',
            position: "absolute",
            zIndex: 1,
            right: 0,
            top: 0,
            left: 0
        }}>
            <ul className="header-ul">
                {headerLabels.map(({label}) =>
                    <>
                        <VerticalLine color={"white"}/>
                        <li className="header-li">
                            <a>
                                <div className="Segoe-UI-17pt" style={{
                                    fontWeight: 'normal'
                                }}>{label}</div>
                            </a>
                        </li>
                    </>)
                }
                <li className="header-li">
                    <button className="Segoe-UI-17pt header-tab my-auto ml-3"
                            style={{
                                borderRadius: 4,
                                border: 'solid 1px #ffffff',
                                background: 'transparent',
                                width: 100
                            }}
                            onClick={() => router.push('/auth/sign-up')}>
                        Sign in
                    </button>
                </li>
            </ul>
        </div>
        <style jsx>{`
    ul li {
      list-style-type: none;
    }
    .header-tab:hover {
      opacity: 0.6;
    }
    .header-ul {
        display: flex;
        float: right;
        margin: 23px;
    }
    .header-li {
    margin: auto 1.5rem;
    }
        `}</style>
    </>
};

export default withRouter(Header);
