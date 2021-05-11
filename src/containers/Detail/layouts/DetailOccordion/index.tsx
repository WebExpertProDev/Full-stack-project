/* eslint-disable object-curly-newline */
/**
 *
 * DetailOccordion
 *
 */
import React, { useState } from "react";

// InterFaces
import { Accordion, Card, Button, Container } from "react-bootstrap";
import { cardLists } from "@data/detail/data";
import { IDetailOccordion } from "./DetailOccordion";

// styles
import styles from "./styles/DetailOccordion.module.scss";

// static data

export const DetailOccordion: React.FunctionComponent<IDetailOccordion.IProps> = ({
  detail
}) => {
  const [selected, setSelected] = useState(undefined);
  return (
    <section>
      <Container fluid="lg" className={`px-lg-0  ${styles["section-tab"]}`}>
        <Accordion defaultActiveKey="0">
          {cardLists.map((cardList, index) =>
            detail.forRent && cardList.cardHeader == "Payment Calculator" ? (
              <></>
            ) : (
              <Card
                bsPrefix={styles["feature-card"]}
                key={index + 1}
                id={cardList.cardHeader.replace(/\s+/g, "")}
              >
                <Card.Header bsPrefix={styles["card-header"]} key={index}>
                  <Accordion.Toggle
                    as={Button}
                    variant="link"
                    key={index}
                    eventKey={`${index + 1}`}
                    onClick={() =>
                      selected === index
                        ? setSelected(undefined)
                        : setSelected(index)
                    }
                  >
                    <div
                      className={
                        selected === index
                          ? styles["arrow-open"]
                          : styles["arrow-close"]
                      }
                    />
                    {cardList.cardHeader}
                  </Accordion.Toggle>
                </Card.Header>

                {console.log(cardList.cardHeader.replace(/\s+/g, ""))}
                <Accordion.Collapse eventKey={`${index + 1}`} key={index + 1}>
                  <Card.Body style={{ padding: 0 }}>
                    <cardList.cardToggle detail={detail} />
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            )
          )}
        </Accordion>
      </Container>
    </section>
  );
};

export default DetailOccordion;
