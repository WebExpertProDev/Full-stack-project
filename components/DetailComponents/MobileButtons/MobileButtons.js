import Image from "next/image"
import Button from "../../Button/Button"

export const MobileButtons = () => {
  return (
    <section className="flex flex-col justify-center items-center">
      <div className="flex  justify-between items-center w-full px-3">
        <div className="w-1/2 mr-1">
          <Button
            theme="outline-gray"
            size="md"
            height="32px"
            font="12px"
            fontFamily="Regular"
            hasIcon={<Image src="/static/icons/share.svg" layout="fixed" width="15" height="15" />}>
            Share link
          </Button>
        </div>
        <div className="w-1/2 ml-1">
          <Button
            theme="outline-gray"
            size="md"
            height="32px"
            font="12px"
            fontFamily="Regular"
            hasIcon={<Image src="/static/icons/fave.svg" layout="fixed" width="15" height="15" />}>
            Add to Favorites
          </Button>
        </div>
      </div>
      <div className="flex justify-between items-center w-full px-3 mt-4 mb-4">
        <div className="w-1/2 mr-2">
          <Button theme="primary" font="15px" height="32px" size="md">
            Schedule a Tour
          </Button>
        </div>
        <div className="w-1/2 ml-2">
          <Button theme="outline" font="15px" height="32px" size="md">
            Send an Offer
          </Button>
        </div>
      </div>
    </section>
  )
}

export default MobileButtons
