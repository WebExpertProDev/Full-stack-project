/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Image from "next/image"
import React, { useState } from "react"
import Button from "../../../../Button/Button"
import RadioButton from "../../../../RadioButton/RadioButton"
import styles from "./Newtour.module.css"
import { useRouter } from "next/router"

export const NewTour = ({ changePageHandler }) => {
  const [personOrAgent, setpersonOrAgent] = useState("with-person")
  const router = useRouter()
  return (
    <div className="flex flex-row items-center m-auto w-full justify-center h-screen">
      <div className="w-1/2 flex flex-col justify-center m-auto items-center">
        <h3 className="w-full flex justify-center text-2xl">New Tour</h3>
        <div className="flex flex-col">
          <div className={`flex items-center my-4 ${styles.radioButton}`}>
            <RadioButton
              handleChange={(e) => setpersonOrAgent(e.target.value)}
              isChecked={personOrAgent == "with-person"}
              value="with-person"
              inputType="radioButton"
              name="chooseMethod"
              label="I have an agent"
              hasIcon={
                <Image src="/static/icons/house-hands.svg" layout="fixed" width="30" height="30" />
              }
            />
          </div>
          <div className={`flex items-center ${styles["radio-button"]}`}>
            <RadioButton
              handleChange={(e) => setpersonOrAgent(e.target.value)}
              isChecked={personOrAgent == "with-agent"}
              value="with-agent"
              inputType="radioButton"
              name="chooseMethod"
              label="I do not have an agent"
              hasIcon={
                <Image src="/static/icons/hands.svg" layout="fixed" width="30" height="30" />
              }
            />
          </div>
        </div>
      </div>
      <div className={`flex flex-col justify-center w-1/2 h-screen`}>
        <div className="flex flex-row items-baseline w-full justify-center">
          <div className="flex flex-col">
            <div className="flex items-center my-2">
              <Image src="/static/icons/pin.svg" layout="fixed" width="30" height="30" />

              <p className="mx-2">Location: 2306 Bagley Ave</p>
            </div>
            <div className="flex items-center my-2">
              <Image src="/static/icons/homes.svg" layout="fixed" width="30" height="30" />

              <p className="mx-2">Homes: 1</p>
            </div>
            <div className="flex items-center my-2">
              <Image src="/static/icons/start-time.svg" layout="fixed" width="30" height="30" />

              <p className="mx-2">Date: Tue, May 26</p>
            </div>
            <div className="flex items-center my-2">
              <Image src="/static/icons/start-time.svg" layout="fixed" width="30" height="30" />

              <p className="mx-2">Start: 10:00 am</p>
            </div>
            <div className="flex items-center my-2">
              <Image src="/static/icons/end-time.svg" layout="fixed" width="30" height="30" />

              <p className="mx-2">End: 10:30 am</p>
            </div>
          </div>
        </div>
        <div className={`flex w-1/4 justify-center mx-auto mt-5`}>
          <Button
            handleClick={() => changePageHandler(1)}
            theme="primary"
            size="md"
            height="50px"
            font="17px"
            fontFamily="SemiBoldFont">
            Next
          </Button>
        </div>
        <div
          className="flex justify-center items-center w-full mt-4 cursor-pointer"
          onClick={() => router.back()}>
          <Image src="/static/icons/close-icon.svg" layout="fixed" width="25" height="25" />
          <p className="mx-2">cancel</p>
        </div>
      </div>
    </div>
  )
}

export default NewTour
