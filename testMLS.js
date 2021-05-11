// This module Mersen's attempt to access crea database via NodeJs, but it doesn't work, the issue might be inproper Cookie maintainence


const digestFetch = require('digest-fetch');
const convert = require('xml-js');

const loginUrl = "https://data.crea.ca/Login.svc/Login";
const metaDataUrl = "https://data.crea.ca/Metadata.svc/GetMetadata";
const searchUrl = "https://data.crea.ca/Search.svc/Search";
const getObjectUrl = "https://data.crea.ca/Object.svc/GetObject";
const logoutUrl = "https://data.crea.ca/Logout.svc/Logout";

const crea = new digestFetch('CXLHfDVrziCfvwgCuL8nUahC', 'mFqMsCSPdnb5WO1gpEEtDCHH')
let cookie = "";


class CREA{

    async login() {
        const params = {
            method: 'POST',
            credentials: 'include'
        }
        const res = await crea.fetch(loginUrl, params);
        if (res.status !== 200) throw new Error(res.status);
        cookie = res.headers.raw()['set-cookie'].reduce( (a, b) => a + b.split(";")[0] + "; ", "" ).slice(0, -2);
        console.log(cookie);
    }

    async search(resource, resourceClass, select="", query="(ID=*)", count=0, limit="None", offset=1, format="STANDARD-XML", queryType="DMQL2", culture="en-CA"){
        const params = {
            method: 'POST',
            credentials: 'include',
            headers: { 'Cookie': cookie },
            body: JSON.stringify({
                Format: format,
                SearchType: resource,
                Class: resourceClass,
                QueryType: queryType,
                Query: query,
                Count: count,
                Limit: limit,
                Offset: offset,
                Culture: culture,
                Select: select
            })
        }
        
        const res = await crea.fetch(searchUrl, params);
        if (res.status !== 200) throw new Error(res.status);
        const text = await res.text();
        console.log(text)
        return text;

    }

    async logout(){
        const params = {
            method: 'POST',
            credentials: 'include'
        }
        const res = await crea.fetch(logoutUrl, params);
        if (res.status !== 200) throw new Error(res.status); 
    }
}

async function main(){
    try {
        const session = new CREA();
        await session.login();
        await session.search("Property", "Property");
        await session.logout();
    } catch(err){
        console.log(err);
    }
    
}

main();





