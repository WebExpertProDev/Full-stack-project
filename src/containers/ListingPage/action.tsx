const log = console.log;
export function getSellListing(
  data,
  setpagesCount,
  setcurrentdata,
  currentPage
) {
  const url = "http://localhost:5000/api/getSellListings";
  fetch(url, {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*"
    }
  })
    .then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        console.log("Cound not get data");
      }
    })
    .then(function(json) {
      data(json);
      const maxpage = 10;
      const count = json.length / 10;
      setpagesCount(Math.round(count));
      setcurrentdata(json.slice(currentPage, currentPage + 10));
    })
    .catch(error => {
      console.log(error);
    });
}

export const getRentListing = (
  data,
  setpagesCount,
  setcurrentdata,
  currentPage
) => {
  const url = "http://localhost:5000/api/getRentListings";
  fetch(url, {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*"
    }
  })
    .then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        console.log("Cound not get data");
      }
    })
    .then(function(json) {
      data(json);
      const maxpage = 10;
      const count = json.length / 10;
      setpagesCount(Math.round(count));
      setcurrentdata(json.slice(currentPage, currentPage + 10));
    })
    .catch(error => {
      console.log(error);
    });
};

export const getRentimage = path => {
  const url = "http://localhost:5000/api/rentimages/upload";
  const request = new Request(url, {
    method: "post",
    body: JSON.stringify({ filePath: path }),
    headers: {
      Accept: "application/json, text/plain, */*",
      "content-type": "multipart/form-data",
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
      log(json);
    })
    .catch(error => {
      console.log(error);
    });
};
