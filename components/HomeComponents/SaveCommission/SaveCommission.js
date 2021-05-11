import styled from "styled-components"
import Image from "next/image"
import { RangeStepInput } from "react-range-step-input"
import { useState } from "react"
import styles from "./Commission.module.css"
import InputSlider from "../../InputSlider/InputSlider"

const Container = styled.div`
  height: auto;
  background-color: #f7f7f7;
  width: 100%;
`

const SaveCommission = () => {
  const [amount, setAmount] = useState(30)

  return (
    <Container className=" flex flex-row flex-wrap justify-center">
      <section className={`flex flex-col w-10/12 md:w-8/12 mt-5 ${styles.sellingDesc}`}>
        <div className="flex flex-col ">
          <div className="flex flex-row items-center">
            <div className="rounded-full bg-blue-200 w-8 h-8 z-0 -mr-3" />
            <Image
              className="z-10 -ml-4"
              src="/static/rounded-circles.png"
              width="21"
              height="40"
              layout="fixed"
            />
            <h3 className="ml-2">How much could you save in commission selling with Housee?</h3>
          </div>
          <p className="ml-12 my-3 text-gray-400">Slide to select your home’s value</p>
        </div>

        <div className="mt-10 flex">
          <div className="rounded-full bg-blue-200 w-5 h-5 z-0 mr-5" />
          <p className="text-gray-400 flex items-center">
            Save money: <span className="mx-4">{`$ ${amount / 2}`}</span>
          </p>
        </div>
        <div className="w-full">
          <div className={`${styles["price-range"]} w-10/12 md:w-full flex justify-center`}>
            <span className="text-left">0</span>
            <span className="text-center">{`$ ${amount}`}</span>
            <span className="text-right">$5000,000</span>
          </div>
          <div className="my-10">
            <InputSlider value={amount} onChange={setAmount} />
          </div>
        </div>
      </section>
    </Container>
  )
}

export default SaveCommission
