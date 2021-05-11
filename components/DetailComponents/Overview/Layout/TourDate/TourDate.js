/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Image from "next/image"
import { useRouter } from "next/router"
import React, { useState } from "react"
import Button from "../../../../Button/Button"
import RadioButton from "../../../../RadioButton/RadioButton"
import styles from "./Newtour.module.css"
import stylesNew from "./Choose-Date.module.css"
import DatePicker from "react-datepicker"

const TourDate = ({ changePageHandler }) => {
  const [personOrAgent, setpersonOrAgent] = useState("with-person")
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(null)
  const onChange = (dates) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }
  const [active, setActive] = useState("am")

  console.log(startDate)

  const formatDate = (string) => {
    var options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(string).toLocaleDateString([], options)
  }

  const router = useRouter()
  return (
    <div className="flex flex-row items-center m-auto w-full justify-center h-screen">
      <div className="w-3/4 h-screen flex flex-col justify-start p-10">
        <div className="flex flex-col">
          <h3 className="text-2xl my-4">New Tour</h3>
          <p>How would you like to tour?</p>
        </div>
        <div className="flex flex-row items-baseline">
          <div className={`flex items-center mx-5 border-r p-4 ${styles.radioButton}`}>
            <RadioButton
              handleChange={(e) => setpersonOrAgent(e.target.value)}
              isChecked={personOrAgent == "with-person"}
              value="with-person"
              inputType="radioButton"
              name="chooseMethod"
              label="Tour in person"
              hasIcon={
                <Image src="/static/icons/user-man.svg" layout="fixed" width="30" height="30" />
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
              label="Tour via video chat"
              hasIcon={
                <Image src="/static/icons/chat-bubble.svg" layout="fixed" width="30" height="30" />
              }
            />
          </div>
        </div>
        <div className="mt-10">
          <p>Open house option</p>
          <p className="mt-10">Choose date</p>
          <div className={`${stylesNew.calender} mt-1 flex justify-center`}>
            <DatePicker
              selected={startDate}
              calendarClassName={stylesNew.customcalender}
              onChange={onChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              inline
            />
          </div>
        </div>

        <div className="flex flex-col w-full">
          <p className="w-32">Choose a time</p>
          <div className="w-full flex flex-col justify-center">
            <div className="w-6/12 flex flex-col m-auto">
              <input
                placeholder=""
                type="text"
                className="border-2 rounded-md p-1  w-8/12 m-auto text-center"
              />
              <div className="flex w-full m-auto justify-center">
                <div className={` w-1/3 ${active == "am" ? styles.rentBtnActive : styles.rentBtn}`}>
                  <Button handleClick={() => setActive("am")} theme="outline-gray">
                    Am
                  </Button>
                </div>
                <div className={` w-1/3 ${active == "pm" ? styles.buyBtnActive : styles.buyBtn}`}>
                  <Button theme="outline-gray" handleClick={() => setActive("pm")}>
                    Pm
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`flex flex-col justify-center w-1/4 border-l h-1/2 my-auto`}>
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

              <p className="mx-2">Date: {formatDate(startDate)}</p>
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
        <div className={`flex w-2/4 justify-center mx-auto mt-5`}>
          <Button
            handleClick={() => changePageHandler(2)}
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

export default TourDate
