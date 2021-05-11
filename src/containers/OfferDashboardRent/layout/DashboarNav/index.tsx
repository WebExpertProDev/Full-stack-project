/**
 *
 * DashboarNav
 *
 */
import React from "react"
import { Container } from "react-bootstrap"

// InterFaces
import { IDashboarNav } from "./DashboarNav"

// styles
import styles from "./styles/DashboarNav.module.scss"

export const DashboarNav: React.FunctionComponent<IDashboarNav.IProps> = () => (
  <section className={styles["nav-section"]}>
    <Container fluid="xl">
      <div className={styles["nav-list"]}>
        <ul>
          <li>Favourites</li>
          <li> Home Tours </li>
          <li>Offers</li>
          <li>Your listings</li>
          <li> Find a Partner</li>
          <li>Manage Payments</li>
          <li>Contracts</li>
        </ul>
      </div>
    </Container>
  </section>
)

export default DashboarNav
