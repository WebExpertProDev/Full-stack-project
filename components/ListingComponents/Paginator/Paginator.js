/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import Image from "next/image"
import React from "react"

import styles from "./Paginator.module.css"

export const Paginator = ({ count, current, nextHandler, backHandler, handler }) => (
  <>
    <h4 className={`${styles.paginationTitle} w-full flex justify-center text-black`}>
      Viewing page 1 of {count}
    </h4>
    <div className={`${styles.customPaginator} flex w-full justify-center items-center`}>
      <li className="mx-4 border-r border-blue-500 p-1">
        <span onClick={() => backHandler()} className={styles.back}>
          <Image src="/static/icons/back.svg" layout="fixed" width="15" height="15" />
        </span>
      </li>
      {count.map((page) => (
        <div
          key={page}
          onClick={() => handler(page)}
          className={
            page === current ? `${styles.active} w-7 flex justify-center rounded-md` : null
          }>
          {page}
        </div>
      ))}

      <li className="mx-4 border-l border-blue-500 p-1">
        <span onClick={() => nextHandler()} className={styles.next}>
          <Image src="/static/icons/next.svg" layout="fixed" width="15" height="15" />
        </span>
      </li>
    </div>
  </>
)

export default Paginator
