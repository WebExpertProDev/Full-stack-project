import Image from "next/image"
import styled from "styled-components"
import useWindowSize from "../../../hooks/useWindowSize"
import Button from "../../Button/Button"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const ProductOptions = styled.div`
  background-color: #f7f7f7;
  height: 100px;
`

const ShareButton = styled.button`
  width: 24%;
  min-width: 168px;
  @media (max-width: 1200px) {
    width: 26%;
  }
`

const FaveButton = styled.button`
  width: 24%;
  margin-left: 1.5rem;
  min-width: 168px;
  @media (max-width: 1200px) {
    width: 26%;
  }
`

const ScheduleButton = styled.button`
  margin-left: 1.5rem;
  width: 27%;
  min-width: 168px;
`

const Overview = () => {
  const size = useWindowSize()

  const router = useRouter()

  const [fave, setFave] = useState(false)
  const [copied, setCopied] = useState(false)
  const [url, setUrl] = useState("")

  useEffect(() => {
    setUrl(window.location.href)
  })

  return (
    <>
      <div className="bg-white w-full h-16 border-b-2 border-gray-300 flex justify-start items-center">
        <div className="flex items-center justify-start w-9/12 m-auto relative left-7">
          <Image src="/static/icons/circles.svg" layout="fixed" width="20" height="50" />
          <p className="ml-2">Vancouver, BC V6P 0H5 - 1561 W 57th Ave #307</p>
        </div>
      </div>
      {size > 640 ? (
        <ProductOptions className="w-full border-b-2 border-gray-300 flex items-center mx-auto">
          <div className="flex w-full lg:w-7/12 h-auto flex-wrap lg:flex-nowrap m-auto items-center justify-around">
            <CopyToClipboard text={url} onCopy={() => setCopied(true)}>
              <ShareButton>
                <Button
                  theme="outline-gray"
                  size="md"
                  height="48px"
                  font="15px"
                  fontFamily="Regular"
                  hasIcon={
                    <Image
                      src="/static/icons/share.svg"
                      className="z-30"
                      layout="fixed"
                      width="20"
                      height="20"
                    />
                  }>
                  Copy Share link
                </Button>
              </ShareButton>
            </CopyToClipboard>
            <FaveButton className="flex" onClick={() => setFave((prev) => !prev)}>
              <Button
                theme="outline-gray"
                size="md"
                height="48px"
                font="15px"
                fontFamily="Regular"
                hasIcon={
                  fave ? (
                    <Image
                      src="/static/icons/red-heart.svg"
                      className={`z-30`}
                      layout="fixed"
                      width="20"
                      height="20"
                    />
                  ) : (
                    <Image
                      src="/static/icons/fav.svg"
                      className={`z-30`}
                      layout="fixed"
                      width="20"
                      height="20"
                    />
                  )
                }>
                Add to Favorites
              </Button>
            </FaveButton>
            <ScheduleButton
              className="flex"
              onClick={() => {
                router.push("/tour")
              }}>
              <Button theme="primary" size="md" height="50px" font="17px" fontFamily="SemiBoldFont">
                Schedule a Tour
              </Button>
            </ScheduleButton>
            <div className="flex lg:justify-end justify-center mt-4 lg:mt-0">
              <div className="flex items-center justify-end">
                <span className="text-gray-400 text-lg w-24 ml-5">Total Price</span>
                <span className="text-blue-400 text-xl">$1,749,000 </span>
                <div className="flex items-center text-green-400 text-lg ml-3 ">
                  <Image
                    src="/static/icons/star.svg"
                    className="z-30"
                    layout="fixed"
                    width="20"
                    height="20"
                  />
                  <span className="pl-2 w-24">Fair Price</span>
                </div>
              </div>
            </div>
          </div>
        </ProductOptions>
      ) : null}
    </>
  )
}

export default Overview
