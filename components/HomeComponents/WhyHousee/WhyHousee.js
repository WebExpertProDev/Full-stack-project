import Image from "next/image"
import styled from "styled-components"
import WhyFeatures from "./WhyFeatures/WhyFeatures"

const BehindCircle = styled.div`
  background-color: #00bbd8;
  width: 29px;
  height: 29px;
  z-index: 0;
  border-radius: 100%;
  opacity: 22%;
  position: absolute;
`

const TopCircle = styled.div`
  background: transparent;
  border: 4px solid #00bbd8;
  width: 21px;
  height: 21px;
  z-index: 1;
  border-radius: 100%;
`

const ImageContainer = styled.div`
  @media (min-width: 1024px) {
    height: 784px;
    width: 1160px;
  }
`

const WhyHousee = () => {
  return (
    <div className="flex flex-col w-full h-auto m-0">
      <WhyFeatures />

      <div>
        <div className="flex w-full ">
          <div className="flex justify-start items-center m-auto w-8/12">
            <div className="flex items-center justify-center">
              <BehindCircle />
              <TopCircle />
            </div>
            <h3 className="text-lg ml-3">The most visited</h3>
          </div>
        </div>

        <ImageContainer className="lg:m-auto w-full">
          <div className="flex flex-row flex-wrap justify-center lg:justify-around mt-10">
            <div className="">
              <Image src="/static/surre.png" width="370" height="245" layout="fixed" />
              <p className="bg-gray-200 text-gray-600 h-8 relative -top-5 flex justify-center">
                Surre | 84a
              </p>
            </div>
            <div>
              <Image src="/static/toronto.png" width="370" height="245" layout="fixed" />
              <p className="bg-gray-200 text-gray-600 h-8 relative -top-5 flex justify-center">
                Toronto | 15 fiesta
              </p>
            </div>
            <div>
              <Image src="/static/los.png" width="370" height="245" layout="fixed" />
              <p className="bg-gray-200 text-gray-600 h-8 relative -top-5 flex justify-center">
                Los | Macgregor
              </p>
            </div>
            <div>
              <Image src="/static/los.png" width="370" height="245" layout="fixed" />
              <p className="bg-gray-200 text-gray-600 h-8 relative -top-5 flex justify-center">
                Vancouve | 1561
              </p>
            </div>
            <div>
              <Image src="/static/vancouver.png" width="765" height="245" layout="fixed" />
              <p className="bg-gray-200 text-gray-600 h-8 relative -top-5 flex justify-center">
                Vancouve | 1561
              </p>
            </div>
            <div>
              <Image src="/static/los angeles.png" width="765" height="245" layout="fixed" />
              <p className="bg-gray-200 text-gray-600 h-8 relative -top-5 flex justify-center">
                Vancouve | 1561
              </p>
            </div>
            <div>
              <Image src="/static/los.png" width="370" height="245" layout="fixed" />
              <p className="bg-gray-200 text-gray-600 h-8 relative -top-5 flex justify-center">
                Vancouve | 1561
              </p>
            </div>
          </div>
        </ImageContainer>
      </div>
    </div>
  )
}

export default WhyHousee
