const log = console.log;
// export function getSellListing(
//   data,
//   setpagesCount,
//   setcurrentdata,
//   currentPage
// ) {
//   const url = "http://localhost:5000/api/getSellListings";
//   fetch(url, {
//     method: "GET",
//     headers: {
//       "Access-Control-Allow-Origin": "*",
//       "Access-Control-Allow-Headers": "*"
//     }
//   })
//     .then(res => {
//       if (res.status === 200) {
//         return res.json();
//       } else {
//         console.log("Cound not get data");
//       }
//     })
//     .then(function(json) {
//       data(json);
//       const maxpage = 10;
//       const count = json.length / 10;
//       setpagesCount(Math.round(count));
//       setcurrentdata(json.slice(currentPage, currentPage + 10));
//     })
//     .catch(error => {
//       console.log(error);
//     });
// }

// export const getRentListing = (
//   data,
//   setpagesCount,
//   setcurrentdata,
//   currentPage
// ) => {
//   const url = "http://localhost:5000/api/getRentListings";
//   fetch(url, {
//     method: "GET",
//     headers: {
//       "Access-Control-Allow-Origin": "*",
//       "Access-Control-Allow-Headers": "*"
//     }
//   })
//     .then(res => {
//       if (res.status === 200) {
//         return res.json();
//       } else {
//         console.log("Cound not get data");
//       }
//     })
//     .then(function(json) {
//       data(json);
//       const maxpage = 10;
//       const count = json.length / 10;
//       setpagesCount(Math.round(count));
//       setcurrentdata(json.slice(currentPage, currentPage + 10));
//     })
//     .catch(error => {
//       console.log(error);
//     });
// };

export const getHomeListing = (
  position,
  data,
  setpagesCount,
  setcurrentdata,
  currentPage
) => {
  const url = "http://localhost:5000/api/getHomeListings";
  const request = new Request(url, {
    method: "post",
    body: JSON.stringify(position), //default is buy so it should be false
    headers: {
      Accept: "application/json, text/plain, */*",

      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*"
    }
  });
  fetch(request)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        console.log("Cound not get data");
      }
    })
    .then(function(json) {
      data(json);
      let count = json.length / 10;
      if (json.length % 10 > 0) {
        count += 1;
      }
      setpagesCount(Math.floor(count));
      setcurrentdata(json.slice(0, 10));
      currentPage(1);
    })
    .catch(error => {
      console.log(error);
    });
};
export const getHomeFilter = (
  filterSubmission,
  searchstring,
  data,
  setpagesCount,
  setcurrentdata,
  setcurrentPage
) => {
  const url = "http://localhost:5000/api/getHomeFilter";
  const request = new Request(url, {
    method: "post",
    body: JSON.stringify(filterSubmission),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*"
    }
  });
  fetch(request)
    .then(function(res) {
      if (res.status === 200) {
        return res.json();
      } else {
        log("failed");
      }
    })
    .then(function(json) {
      json = searchFunction(json, searchstring);
      data(json);
      let count = json.length / 10;
      if (json.length % 10 > 0) {
        count += 1;
      }
      setpagesCount(Math.floor(count));
      setcurrentdata(json.slice(0, 10));
      setcurrentPage(1);
    })
    .catch(error => {
      console.log(error);
    });
};

const searchFunction = (json, searchString) => {
  console.log(searchString);
  if (searchString != null) {
    json = json.filter(option => {
      try {
        const searchByAddress =
          option.streetAddress
            .toLowerCase()
            .indexOf(searchString.toLowerCase()) > -1;
        const searchByCity =
          option.city.toLowerCase().indexOf(searchString.toLowerCase()) > -1;
        const searchByProvince =
          option.province.toLowerCase().indexOf(searchString.toLowerCase()) >
          -1;
        const searchByPostalCode =
          option.postalCode.toLowerCase().indexOf(searchString.toLowerCase()) >
          -1;

        return (
          searchByCity ||
          searchByAddress ||
          searchByProvince ||
          searchByPostalCode
        );
      } catch (e) {
        return false;
      }
    });
    return json;
  } else {
    return json;
  }
};
