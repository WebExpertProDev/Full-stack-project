/**
 *
 * ChooseDate2
 *
 */
import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Button from '@Components/Button';
import Link from '@Components/Link';
import RadioButton from '@Components/RadioButton';
import { useRouter } from 'next/router';

// helper
import { IChooseDate } from './ChooseDate';

// styles
import styles from './styles/ChooseDate.module.scss';

// InterFaces
import { IChooseDate2 } from './ChooseDate2';

// assets
import Agentt from './svg/aganet.svg';
import Person from './svg/person.svg';
import Location from './svg/location.svg';
import Date from './svg/date.svg';
import End from './svg/end.svg';
import Start from './svg/start.svg';
import Home from './svg/home.svg';
import Cancelsvg from './svg/cancel.svg';

export const ChooseDate2: React.FunctionComponent<IChooseDate2.IProps> = ({ changePageHandler }) => {
  const [personOrAgent, setPersonOrAgent] = useState<string>('in-person');
  const router = useRouter();
  return (
    <section className={`${styles.ChooseDate} wow fadeInUp`}>
      <Container className="px-lg-0" fluid="lg">
        <Row>
          <Col lg="12" md="12">
            <div className={styles.tour}>
              <p>New tour</p>

              <p>Would the method you choose?</p>

              <div className={styles.radiobtn}>
                <div className="mr-5">
                  <RadioButton
                    name="chatMethod"
                    inputType="radioButton"
                    value="in-person"
                    handleChange={(val) => setPersonOrAgent(val.target.value)}
                    isChecked={personOrAgent === 'in-person'}
                    label="Tour in person"
                    hasIcon={<Person />}
                  />
                </div>

                <div className={styles['tour-chat']}>
                  <RadioButton
                    name="chatMethod"
                    value="in-agent"
                    isChecked={personOrAgent === 'in-agent'}
                    handleChange={(val) => setPersonOrAgent(val.target.value)}
                    inputType="radioButton"
                    label="Tour via video chat"
                    hasIcon={<Agentt />}
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Container fluid="lg" className="px-lg-0">
        <Row>
          <Col lg="7" md="8" sm="8" xs="12" className="d-flex justify-content-lg-center">
            <div>
              <div className="rigth" />

              <div className="left" />
            </div>
          </Col>
          <Col lg="4" md="5" sm="6" xs="10" className="d-flex flex-column mt-4 mt-md-5 mt-lg-0">
            <div className={`${styles.right} d-flex flex-column mt-5 mt-md-0`}>
              <div className="d-flex justify-content-start align-items-center mb-3  wow fadeInUp" data-wow-delay="1.4s">
                <Location />
                <span>Location: 2306 Bagley Ave</span>
              </div>

              <div className="d-flex  justify-content-start align-items-center mb-3 wow fadeInUp" data-wow-delay="1.5s">
                <Home />
                <span>Homes : </span>
              </div>

              <div className="d-flex  justify-content-start align-items-center mb-3 wow fadeInUp" data-wow-delay="1.7s">
                <Date />
                <span>Date: Tue, May 26</span>
              </div>

              <div className="d-flex justify-content-start align-items-center mb-3 wow fadeInUp" data-wow-delay="1.9s">
                <Start />
                <span>Start: 10:00 am</span>
              </div>

              <div className="d-flex    justify-content-start align-items-center  wow fadeInUp" data-wow-delay="2s">
                <End />
                <span>End: 10:30 am</span>
              </div>
            </div>
            <div className="w-100 mt-5">
              <Button handleClick={() => router.push('/')} font="17px">
                request a tour
              </Button>
            </div>
            <div className="w-100 mt-2">
              <Button handleClick={() => changePageHandler(3)} font="17px" theme="outline">
                Back
              </Button>
            </div>
            <Link href="/">
              <div className={styles.cancel}>
                <Cancelsvg />
                <span>cancel</span>
              </div>
            </Link>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ChooseDate2;
