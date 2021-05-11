import React from 'react'
import Head from 'next/head'
import VerticalLine from "../components/common/VerticalLine";

const ICONS_JSON = [
    {
        icon: '/icons/homepage/price_estimation.svg',
        title: 'PRICE ESTIMATION'
    },
    {
        icon: '/icons/homepage/trade_in.svg',
        title: 'TRADE IN OR INSTANT '
    },
    {
        icon: '/icons/homepage/offer_money_save.svg',
        title: 'OFFER MONEY SAVER'
    },
    {
        icon: '/icons/homepage/seamless_process.svg',
        title: 'SEAMLESS PROCESS'
    }
];

const SearchBox = () => {
    return <div className="search-box item">
        <ul>
            <li><select className="item">Your City</select></li>
            <VerticalLine color={"var(--warm-grey)"}/>
            <li><select className="item">Rent House</select></li>
            <li><button className="item btn Segoe-UI-17pt">Search</button></li>
        </ul>
        <style jsx>{`
      .search-box {
        width: 590px;
        position: absolute;
        top: 334px;
        right: 140px;
        border-radius: 4px;
        background-color: #ffffff;
      }
      .item {
        height: 56px;
      }
      ul li {
        list-style-type: none;
      }
      .btn {
        background-color: var(--turquoise-blue);
        width: 134px;
        border-radius: 0 4px 4px 0;
      }
      ul {
        display: flex;
        float: right;
      }
      `}</style>
    </div>
};

const CustomSlider = () => {
    React.useEffect(() => {
        let isFF = true;
        (function (style) {
            let sheet = document.head.appendChild(style).sheet;
            return function (selector, css) {
                if ( isFF ) {
                    if ( sheet.cssRules.length > 0 ) {
                        sheet.deleteRule( 0 );
                    }
                    try {
                        sheet.insertRule(selector + "{" + css + "}", 0);
                    } catch ( ex ) {
                        isFF = false;
                    }
                }
            };
        })(document.createElement("style"));
    });
  return <>
      <input type="range" className="slider" onChange={(e) => {
          const value = e.target.value;
          e.target.style.background = `linear-gradient(to right, var(--turquoise-blue) 0%, var(--turquoise-blue) ${value}%, #fff ${value}%, var(--pinkish-grey) 0%)`
      }
      }/>
      <style>{`
      .slider {
          width: 100%;
          height: 10px;
          -webkit-appearance: none;
          background-color: var(--pinkish-grey);
          -webkit-transition: .2s;
          transition: opacity .2s;
          background: linear-gradient(to right, var(--turquoise-blue) 0%, var(--turquoise-blue) 50%, #fff 50%, var(--pinkish-grey) 0%);
      }
      .slider:focus {
            outline: none;
      }
      .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 30px;
          margin: -10px 0;
          width: 30px;
          cursor: pointer;
          
          background: var(--turquoise-blue);
          border-radius: 50%;
      }
      .slider::-moz-range-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 30px;
          margin: -10px 0;
          width: 30px;
          cursor: pointer;
          border: none;
          background: var(--turquoise-blue);
          border-radius: 50%;
      }
      .slider::range-progress {
          height: 20px;
          border-radius: 10px 0 0 10px;
          background-color: var(--turquoise-blue);
          border: 2px solid var(--turquoise-blue);
        }
       input[type=range]::-ms-fill-lower {
        background: var(--turquoise-blue);
        border-radius: 10px;
        }
      `}</style>
  </>
};

const Home = () => {

    const WhatWeOffer = () => {
        return <>
            <div className="col mt-4">
                <img src={"/icons/homepage/shape2.svg"} height={43}/>
                <span className={"mr-3 offer-title"}>What do we offer?</span>
            </div>
            <div className="row">
                <div className="col6">
                    <img src={"/icons/homepage/girl.svg"} className={"mt-5"}/>
                </div>
                <div className="col6">
                    <div className="row" style={{
                        position: "absolute",
                        right: 0
                    }}>
                        {ICONS_JSON.map(({title, icon}) =>
                            <div className="col-6 my-3">
                                <img src={icon}/>
                                <span className="mr-2 icon-title">{title}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <style jsx>{`
        .offer-title {
          font-family: SegoeUI;
          font-size: 20px;
          font-weight: 600;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.95;
          letter-spacing: normal;
          text-align: left;
          color: var(--greyish-brown);
          vertical-align: middle;
        }
        .icon-title {
          font-family: SegoeUI;
          font-size: 17px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.76;
          letter-spacing: normal;
          text-align: left;
          color: var(--warm-grey);
        }
        `}</style>
        </>
    };

    const HowMuchSave = ({className}) => {
        return <div className={className} style={{
            background: '#f7f7f7',
            margin: '0 -140px',
            padding: '0 140px'
        }}>
            <div className="col pt-5">
                <img src={"/icons/homepage/shape.svg"} height={43}/>
                <span className={"mr-3 offer-title"}>How much could you save in commission selling with Housee?</span>
                <div className="subtitle" style={{
                    marginLeft: 65
                }}>Slide to select your home’s value</div>

                <div className="d-flex mt-54px mb-5">
                    <div className="circle"/>
                    <span className="subtitle mr-2">Save Money</span>
                </div>
                <CustomSlider/>
            </div>

            <style jsx>{`
        .offer-title {
          font-family: SegoeUI;
          font-size: 20px;
          font-weight: 600;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.95;
          letter-spacing: normal;
          text-align: left;
          color: var(--greyish-brown);
          vertical-align: middle;
        }
        .subtitle {
          font-family: SegoeUI;
          font-size: 17px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.76;
          letter-spacing: normal;
          text-align: left;
          color: var(--warm-grey);
        }
        
        .circle {
          width: 26px;
          height: 26px;
          border-radius: 100%;
          background-color: var(--duck-egg-blue);
        }
        .mt-54px {
        margin-top: 54px;
        }
        `}</style>
        </div>
    };

    const WhyHousee = () => {

        const WHY_HOUSEE_ICONS = [
            {
                icon: '/icons/homepage/percise_estimation.svg',
                title: 'PRECISE ESTIMATION'
            },
            {
                icon: '/icons/homepage/time_save.svg',
                title: 'TIME SAVER'
            },
            {
                icon: '/icons/homepage/percise_estimation.svg',
                title: 'AUTOMATED TRANSACTION'
            },
            {
                icon: '/icons/homepage/trade_in.svg',
                title: 'TRADE IN ENABLED PLATFORM'
            },
            {
                icon: '/icons/homepage/money_saver.svg',
                title: 'MONEY SAVER'
            },            {
                icon: '/icons/homepage/tailored_search.svg',
                title: 'TAILORED SEARCH QUERY'
            },


        ];
        return <>
            <div className="d-flex mt-54px mb-5">
                <div className="circle"/>
                <span className="why-housee mr-2">WHY HOUSEE?</span>
                <span className="why-explain mr-1">HOUSE is an advanced real estate brokerage platform.</span>
            </div>
            <div className="row justify-content-center">
                {WHY_HOUSEE_ICONS.map(({title, icon}) =>
                    <div className="col-4 my-3">
                        <img src={icon} className="center my-2"/>
                        <div className="mr-2 icon-title text-center">{title}</div>
                    </div>
                )}
            </div>
            <style jsx>{`
        .why-housee {
          font-family: SegoeUI;
          font-size: 20px;
          font-weight: 600;
          font-stretch: normal;
          font-style: normal;
          // line-height: 1.95;
          letter-spacing: normal;
          text-align: left;
          color: #595959;
        }
        .circle {
          width: 25px;
          height: 25px;
          border-radius: 100%;
          background-color: var(--pinkish-grey);
        }
        .why-explain {
          font-family: SegoeUI;
          font-size: 20px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.35;
          letter-spacing: normal;
          text-align: left;
          color: var(--warm-grey);
        }
        .icon-title {
          font-family: SegoeUI;
          font-size: 17px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.29;
          letter-spacing: normal;
          text-align: left;
          color: var(--warm-grey);
        }
        .center {
            display: block;
            margin: auto
        }
        `}</style>
        </>
    };

    return <div>
        <Head>
            <title>Housee</title>
        </Head>
        <img src="/images/homepage-bg.jpg" style={{
            top: 0,
            objectFit: 'cover',
            right: 0,
            width: '100%',
            maxHeight: 467
        }}/>
        <SearchBox/>
        <div className="container mb-5">
            <WhatWeOffer/>
            <HowMuchSave className={"mb-5"}/>
            <WhyHousee/>
        </div>
        <style jsx>{`
        `}</style>
    </div>
};

export default Home;
