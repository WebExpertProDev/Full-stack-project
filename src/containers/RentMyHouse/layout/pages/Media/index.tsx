/**
 *
 * Media
 *
 */
import React, { useState } from "react";
import request from "superagent";
// components
import ImageRadio from "@Components/ImageRadioBtn";
import Button from "@Components/Button";
import Link from "@Components/Link";
// Static Data
import { Container, Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";
//import { images } from "../../../../../staticData/common/data"

// InterFaces
import { IMedia } from "./Media";

// assets
import Arrow from "./svg/arrow.svg";
import Camera from "./svg/camera.svg";
import Cancel from "./svg/cancel.svg";
import Minus from "./svg/minus.svg";
// styles
import styles from "./styles/media.module.scss";

export const Media: React.FunctionComponent<IMedia.IProps> = ({
  changePageHandler,
  homeInfo,
  setHomeInfo
}) => {
  const router = useRouter();
  const [imgSelect, setImgSelect] = useState<string>("");
  const [image, setImage] = useState<any>(null);
  const [storeImage, setStoreImage] = useState<any>([]);
  const [imagePreview, setImagePreview] = useState<any>([]);

  const deleteImg = () => {
    let currentImgs, currentStore;
    currentImgs = imagePreview.filter(i => i.name !== imgSelect);
    setImagePreview(currentImgs);
    currentStore = storeImage.filter(i => i.name !== imgSelect);
    setStoreImage(currentStore);
  };
  const setCover = () => {
    let currentImgs, currentStore;
    const coverimg = imagePreview.filter(i => i.name == imgSelect);
    currentImgs = imagePreview.filter(i => i.name !== imgSelect);
    currentImgs = coverimg.concat(currentImgs);
    setImagePreview(currentImgs);
    const coverurl = storeImage.filter(i => i.name == imgSelect);
    currentStore = storeImage.filter(i => i.name !== imgSelect);
    currentStore = coverurl.concat(currentStore);
    setStoreImage(currentStore);
  };
  const upload = () => {
    // setHomeInfo({ ...homeInfo, image: imagePreview });
    let urls = [];
    for (var i = 0; i < storeImage.length; i++) {
      urls.push(storeImage[i].url);
    }
    console.log(homeInfo);
    const Uploadrequest = new Request(
      "http://localhost:5000/api/addHomeListing",
      {
        method: "POST",
        //  body: JSON.stringify(homeInfo),
        body: JSON.stringify({
          ...homeInfo,
          image: urls
        }),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      }
    );
    fetch(Uploadrequest)
      .then(res => {
        console.log(res.status);
        if (res.status === 200) {
          //console.log("success"+res.json())
          console.log(res);
          return res.json();
        } else {
          console.log("errno");
          return;
        }
      })
      .then(data => {
        console.log(data);
        return;
      });
    // changePageHandler(9);
  };
  const handleChange = e => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      });

      onPhotoSelected(e.target.files[0]);

      const arr = imagePreview;
      arr.push({
        img: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
        name: e.target.files[0].name
      });
      setImagePreview(arr);
      console.log(imagePreview);
    }
  };

  const onPhotoSelected = files => {
    const url = `https://api.cloudinary.com/v1_1/dc5dimsuk/upload`;
    const title = homeInfo.description;

    const photoId = 10003;
    const fileName = files.name;
    request
      .post(url)
      .field("upload_preset", "qmb8asjq")
      .field("file", files)
      .field("multiple", false)
      .field("tags", title ? `myphotoalbum,${title}` : "myphotoalbum")
      .field("context", title ? `photo=${title}` : "")
      .on("progress", progress => console.log("PROGRESS" + progress))
      .end((error, response) => {
        console.log(response);
        if (response.status == 200) {
          const data = response.body;
          const imageArr = storeImage;
          imageArr.push({ url: data.url, name: fileName });
          setStoreImage(imageArr);
        } else {
          console.log("error" + response.status);
          return;
        }
      });
  };

  return (
    <section className={`${styles.media} wow fadeInUp`}>
      <Container className="px-lg-0" fluid="lg">
        <div className="d-flex align-items-center justify-content-center mt-4">
          <div className="d-flex flex-column justify-content-center align-items-center mr-3">
            <div className={styles.arrow}>
              <Arrow className={styles.svg} />
            </div>
            {/* <FileBase64
        multiple={ true }
        onDone={getFiles} /> */}
            <p className={styles.title}>Add 360° Image</p>
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center ml-3">
            <div className={styles.camera}>
              <label htmlFor="upload-button">
                {
                  <>
                    <span className="fa-stack fa-2x mt-3 mb-2">
                      <i className="fas fa-circle fa-stack-2x" />
                      <i className="fas fa-store fa-stack-1x fa-inverse" />
                    </span>
                    <Camera className={styles.svg} />
                  </>
                }
              </label>
              <input
                type="file"
                id="upload-button"
                style={{ display: "none" }}
                onChange={handleChange}
              />
            </div>

            <p className={styles.title}>Add media</p>
          </div>
        </div>
        <Row className="justify-content-end">
          <Col
            lg="6"
            xs="12"
            className="d-flex justify-content-lg-end justify-content-md-end justify-content-center"
          >
            <div className={styles["media-form"]}>
              <button type="button">
                <span
                  className={styles.minimize}
                  onClick={() => setImgSelect("")}
                >
                  <Minus />
                </span>
                Selected
              </button>
              <button type="button" onClick={setCover}>
                Image Cover
              </button>
              <button type="button" onClick={deleteImg}>
                Delete
              </button>
            </div>
          </Col>
        </Row>
        <Row className={`${styles.wrapper} justify-content-center`}>
          {imagePreview.map((info, index) => (
            <Col lg="2" md="3" sm="4" xs="8" className="mt-3" key={index}>
              <ImageRadio
                inputName={info.name}
                Image={info.img}
                checked={info.name === imgSelect}
                handleClick={() => setImgSelect(info.name)}
              />
            </Col>
          ))}
        </Row>

        <Row className="justify-content-end mb-4">
          <Col lg="3" md="4" sm="5" xs="11">
            <div className={styles.nextbtn}>
              <Button handleClick={upload}>Next</Button>

              <Link href="/">
                <div
                  className={`${styles.cancel} d-flex align-items-center mt-2`}
                >
                  <Cancel />
                  <span className="ml-1">Cancel</span>
                </div>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Media;
