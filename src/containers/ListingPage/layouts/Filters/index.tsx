/* eslint-disable jsx-a11y/control-has-associated-label */
/**
 *
 * Filters
 *
 */
import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Select from "@Components/Select";

// InterFaces
// eslint-disable-next-line import/no-unresolved
import {
  filterHouseType,
  filterNumbers
} from "../../../../staticData/Listing/data";

// hooks
import useFormFields from "@Services/hooks/useFormFields";

// Interfaces
import { IFilters } from "./Filters";

// Static Data

// components
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import MoreFilters from "../MoreFilters";
import MobileFilterMenu from "../MobileFilterMenu";

// styles
import styles from "./styles/Filters.module.scss";

// svg
import Search from "./svg/search.svg";

export const Filters: React.FunctionComponent<IFilters.IProps> = ({
  filterHandler,
  setShowMap
}) => {
  const [moreFilters, setMoreFilters] = useState<boolean>(false);
  const [moreMobileFilters, setMoreMobileFilters] = useState<boolean>(false);
  const [filterOptions, setfilterOptions] = useState<any>([]);

  // const [minPrice, setminPrice] = useState<number>(1000);
  // const [maxPrice, setmaxPrice] = useState<number>(2000);
  // useEffect(() => {
  //   var json = JSON.parse(localStorage.getItem("info"));
  //   //Note I change the below. It was json.city.title !== null before
  //   if (json !== null) {
  //     setCity(json.city.title);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (city !== null) {
  //     filterBySearch(city);
  //     searchHandler();
  //   }
  // }, [city]);
  //Note I change the below. It was json.city.title !== null before

  const { formFields, createChangeHandler } = useFormFields({
    search: "",
    type: filterHouseType[1],
    roomCount: filterNumbers[0],
    bathroomCount: filterNumbers[0],
    parkingCount: filterNumbers[0],
    minPrice: 0,
    maxPrice: 0,
    utilities: []
  });

  const changeOptions = options => {
    setfilterOptions(options);
  };
  useEffect(() => {
    console.log(formFields);
  }, [formFields.maxPrice]);

  const searchHandler = () => {
    console.log(filterOptions);
    console.log(formFields);
    filterHandler({ filterOptions, formFields });
  };

  const filterBySearch = v => {
    createChangeHandler("search")(v);
  };
  const [btnTitle, setBtnTitle] = useState("filter");

  useEffect(() => {
    if (localStorage.getItem("info") !== null) {
      var json = JSON.parse(localStorage.getItem("info"));
      if (json !== null) {
        console.log(json);
        filterBySearch(json.city.title);
        if (json.type !== undefined && json.type.title === "Buy") {
          createChangeHandler("type")(json.type);
        }
        localStorage.removeItem("info");
      }
    }
  }, []);

  return (
    <>
      <section className={styles["filter-section"]}>
        <Container fluid="xl" className="p-lg-0 d-flex justify-content-center">
          <div className={styles.wrapperFilter}>
            <div className={styles.inputWrapper}>
              {/* {formFields.roomCount ? formFields.roomCount.title : null}
               {formFields.type ? formFields.type.title : null}
               {formFields.search}
               {formFields.minPrice}
               {formFields.maxPrice} */}
              <Input
                value={formFields.search}
                change={filterBySearch}
                theme="default"
                type="text"
                placeholder="Los Angeles"
                hasIcon={<Search />}
              />
            </div>
            <div className={styles.switchWrappers}>
              <div className={styles.selectWrapper}>
                {/* {formFields.type.title} */}
                <div className={styles.label}>Type</div>
                <Select
                  defaultSelected={formFields.type.title}
                  selectOnChange={createChangeHandler("type")}
                  options={filterHouseType}
                  theme="dd-wrapper-secondary"
                  label="rent"
                />
              </div>
              <div className={styles.selectWrapper}>
                <div className={styles.label}> Beds </div>
                <Select
                  defaultSelected="All"
                  selectOnChange={createChangeHandler("roomCount")}
                  options={filterNumbers}
                  label="Beds"
                  theme="dd-wrapper-secondary"
                />
              </div>
              <div className={styles.selectWrapper}>
                {/* <Select label="Min price" theme="dd-wrapper-secondary" /> */}
                {/* <InputNumber change={createChangeHandler('minPrice')} value={formFields.minPrice} /> */}
                <div className={styles.label}> Bathrooms</div>
                <Select
                  defaultSelected="All"
                  selectOnChange={createChangeHandler("bathroomCount")}
                  options={filterNumbers}
                  label="Bathroom"
                  theme="dd-wrapper-secondary"
                />
              </div>
              <div className={styles.selectWrapper}>
                {/* <InputNumber change={createChangeHandler('maxPrice')} value={formFields.maxPrice} /> */}
                <div className={styles.label}>Parking</div>
                <Select
                  defaultSelected="All"
                  selectOnChange={createChangeHandler("parkingCount")}
                  options={filterNumbers}
                  label="Parking"
                  theme="dd-wrapper-secondary"
                />
              </div>
            </div>

            <div className={styles["btn-group"]}>
              <div className={styles.filterbtn}>
                <Button
                  theme="outline"
                  size="md"
                  height="37px"
                  handleClick={() => setMoreFilters(!moreFilters)}
                >
                  {moreFilters ? "Less" : "More"}
                  Filters
                </Button>
              </div>

              <div className={styles.searchbtn}>
                <Button
                  theme="primary"
                  size="md"
                  height="37px"
                  handleClick={() => searchHandler()}
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* filter buttons in mobile */}

      <section className={styles.FiltersMobile}>
        <div className="w-100 d-flex">
          <div className="w-50">
            <Button
              theme="outline-gray"
              size="lg"
              height="47px"
              font="13px"
              borderRadius="0px"
              handleClick={() => setShowMap()}
            >
              Hide Map
            </Button>
          </div>

          <div className="w-50">
            <Button
              theme="outline-gray"
              font="13px"
              height="47px"
              borderRadius="0px"
              size="lg"
              handleClick={() => setMoreMobileFilters(!moreFilters)}
            >
              Filters
            </Button>
          </div>
        </div>
      </section>
      {/* backdrop */}
      {moreMobileFilters ? (
        <div
          className={styles.backDrop}
          onClick={() => setMoreMobileFilters(false)}
          tabIndex={-1}
          role="button"
          onKeyDown={() => setMoreMobileFilters(false)}
        />
      ) : null}
      {/* backdrop */}
      {moreMobileFilters && (
        <MobileFilterMenu
          setParkingCount={createChangeHandler("parkingCount")}
          setBedroomCount={createChangeHandler("roomCount")}
          setType={createChangeHandler("type")}
          setBathroomCount={createChangeHandler("bathroomCount")}
          setMaxprice={createChangeHandler("maxPrice")}
          setMinprice={createChangeHandler("minPrice")}
          setSearch={createChangeHandler("search")}
          formFields={formFields}
          setfilterOptions={(options, v) => createChangeHandler(options)(v)}
          filterNumbers={filterNumbers}
          filterHouseType={filterHouseType}
          setRoom={createChangeHandler("roomCount")}
          currentRoom={formFields.roomCount}
          houseType={formFields.type}
          setHouseType={createChangeHandler("type")}
          setSearch={createChangeHandler("search")}
          parkingCount={createChangeHandler("parkingCount")}
          currentParking={formFields.parkingCount}
          bathroomCount={createChangeHandler("bathroomCount")}
          currentBathroom={formFields.bathroomCount}
          search={formFields.search}
          submitFilter={searchHandler}
          minPrice={formFields.minPrice}
          minPriceHandler={createChangeHandler("minPrice")}
          maxPriceHandler={createChangeHandler("maxPrice")}
          maxPrice={formFields.maxPrice}
        />
      )}
      {moreFilters && (
        <MoreFilters
          setfilterOptions={(options, v) => createChangeHandler(options)(v)}
        />
      )}
    </>
  );
};

export default Filters;
