/**
 *
 * Media
 *
 */
import React from "react"

// components
import ImageRadio from "@Components/ImageRadioBtn"
import Button from "@Components/Button"
import Link from "@Components/Link"

// Static Data
import { Container, Row, Col } from "react-bootstrap"
import { useRouter } from "next/router"
import { images } from "../../../../../staticData/common/data"

// InterFaces
import { IMedia } from "./Media"

// assets
import Arrow from "./svg/arrow.svg"
import Camera from "./svg/camera.svg"
import Cancel from "./svg/cancel.svg"
import Minus from "./svg/minus.svg"
// styles
import styles from "./styles/media.module.scss"

export const Media: React.FunctionComponent<IMedia.IProps> = () => {
  const router = useRouter()

  const NavigateRoute = (e, path) => {
    e.preventDefault()
    router.push(path)
  }

  return (
    <section className={`${styles.media} wow fadeInUp`}>
      <Container className="px-lg-0" fluid="lg">
        <div className="d-flex align-items-center justify-content-center mt-4">
          <div className="d-flex flex-column justify-content-center align-items-center mr-3">
            <div className={styles.arrow}>
              <Arrow className={styles.svg} />
            </div>

            <p className={styles.title}>Add 360° Image</p>
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center ml-3">
            <div className={styles.camera}>
              <Camera className={styles.svg} />
            </div>

            <p className={styles.title}>Add media</p>
          </div>
        </div>
        <Row className="justify-content-end">
          <Col lg="6" xs="12" className="d-flex justify-content-lg-end justify-content-md-end justify-content-center">
            <div className={styles["media-form"]}>
              <button type="button">
                <span className={styles.minimize}>
                  <Minus />
                </span>
                Selected
              </button>
              <button type="button">Image Cover</button>
              <button type="button">Delete</button>
            </div>
          </Col>
        </Row>
        <Row className={`${styles.wrapper} justify-content-center`}>
          {images.map((info, index) => (
            <Col lg="2" md="3" sm="4" xs="8" className="mt-3" key={index}>
              <ImageRadio inputName="addMedia" Image={info.img} active={info.status} />
            </Col>
          ))}
        </Row>

        <Row className="justify-content-end mb-4">
          <Col lg="3" md="4" sm="5" xs="11">
            <div className={styles.nextbtn}>
              <Button handleClick={e => NavigateRoute(e, "/")}>Next</Button>

              <Link href="/">
                <div className={`${styles.cancel} d-flex align-items-center mt-2`}>
                  <Cancel />
                  <span className="ml-1">Cancel</span>
                </div>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Media
