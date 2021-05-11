import {httpRequestHelper} from "../utils/utils";

const searchHouses = (params) => httpRequestHelper(`houses/search`, null, {params});


export {searchHouses};
