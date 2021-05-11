import styled from "styled-components"
import Image from "next/image"

const FooterContainer = styled.footer`
  width: 100%;
  position: relative;
  bottom: 0;
  height: auto;
`

const TopFooter = styled.div`
  width: 100%;
  height: auto;
  border-top: solid 3px;
  border-bottom: solid 3px;
  border-color: rgba(229, 231, 235, 0.5);
  hr {
    width: 50%;
    @media (min-width: 768px) {
      width: 100px;
    }
  }
  @media (min-width: 768px) {
    height: 400px;
  }
`

const Footer = () => {
  return (
    <>
      <FooterContainer className="flex flex-col justify-center text-gray-500 pt-5">
        <TopFooter className="w-full flex flex-row flex-wrap md:flex-row justify-center md:justify-around pt-10">
          <div className="m-5 flex flex-col items-center">
            <h4>Contanct us</h4>
            <hr className="bg-blue-200 h-1 mb-3 mt-1" />
            <p>651 888 9669</p>
            <p>Mon-Fri 8AM-6PM</p>
          </div>
          <div className="list-none m-5 flex flex-col items-center">
            <h4>Company</h4>
            <hr className="bg-blue-200 h-1 mb-3 mt-1" />
            <li>About</li>
            <li>Jobs</li>
            <li>Find a gent</li>
            <li>agents</li>
            <li>Partners</li>
          </div>
          <div className="list-none m-5 flex flex-col items-center">
            <h4>Sell your home</h4>
            <hr className="bg-blue-200 h-1 mb-3 mt-1" />
            <li>Real state ofer </li>
            <li>In person with Ai</li>
            <li>with agent and Ai</li>
          </div>
          <div className="list-none m-5 flex flex-col items-center">
            <h4>Find a home</h4>
            <hr className="bg-blue-200 h-1 mb-3 mt-1" />
            <li>buy</li>
            <li>rent</li>
          </div>
          <div className="list-none m-5 flex flex-col items-center">
            <h4>Resource</h4>
            <hr className="bg-blue-200 h-1 mb-3 mt-1" />
            <li>Blog</li>
            <li>Buying guide</li>
            <li>Selling guide</li>
            <li>FAQs</li>
          </div>
        </TopFooter>
        <div className="pt-5 md:pt-0 flex flex-col justify-between md:flex-row md:justify-around w-full h-auto md:h-20 items-center">
          <div className="flex justify-around w-full md:w-1/6">
            <Image
              className="z-10 mx-4"
              src="/static/logo-twitter.svg"
              width="20"
              height="20"
              layout="fixed"
            />
            <Image
              className="z-10 mx-4"
              src="/static/youtube.svg"
              width="20"
              height="20"
              layout="fixed"
            />
            <Image
              className="z-10 mx-4"
              src="/static/linkedin.svg"
              width="20"
              height="20"
              layout="fixed"
            />
            <Image
              className="z-10 mx-4"
              src="/static/pinterest.svg"
              width="20"
              height="20"
              layout="fixed"
            />
          </div>
          <div className="list-none flex flex-col md:flex-row items-center md:items-start">
            <li className="mx-3">Term & Privacy |</li>
            <li className="mx-3">Certificates & Awards |</li>
            <li className="mx-3">My Account</li>
          </div>
        </div>
      </FooterContainer>
    </>
  )
}

export default Footer
