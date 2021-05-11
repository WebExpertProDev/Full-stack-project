/**
 *
 * DetailList
 *
 */
import React from "react";

// InterFaces
import { Container } from "react-bootstrap";
import { IDetailList } from "./DetailList";
import { useRouter } from "next/router";

// styles
import styles from "./styles/DetailList.module.scss";

export const DetailList: React.FunctionComponent<IDetailList.IProps> = () => {
  const router = useRouter();
  const goTo = section => {
    router.push("/detail/" + router.query.id + section);
  };

  return (
    <section className={styles["detail-section"]}>
      <Container fluid="xl">
        <div className={styles["detail-list"]}>
          <ul>
            <li onClick={() => goTo("#overview")}>Overview</li>
            <li onClick={() => goTo("#propertyDetails")}>Property Details</li>
            <li onClick={() => goTo("#Pastlistings")}>Property History</li>
            <li onClick={() => goTo("#MarketInsights")}>Market Insights</li>
            <li onClick={() => goTo("#public")}>Public</li>
            <li onClick={() => goTo("#facts")}>Facts</li>
            <li onClick={() => goTo("#neighborhood")}>Neighborhood</li>
            <li onClick={() => goTo("#similarHomes")}>Similar Homes</li>
          </ul>
        </div>
      </Container>
    </section>
  );
};

export default DetailList;
