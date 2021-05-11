import {LoadingOutlined} from "@ant-design/icons";
import React from "react";
import {request} from "./request";
import {toaster} from "evergreen-ui";


Array.prototype.mergeChildren = function () {
    return this.reduce((a, b) => ({...a, ...b}), {});
};

// TODO: write test cases for this function in the future
Array.prototype.flattenArray = function () {
    return this.reduce((a, b) => {
        if (Array.isArray(b)) {
            return [...a, ...b];
        }
        return [...a, b];
    }, []);
};

Array.prototype.reverseArray = function () {
    this.reverse();
    return this;
};

Array.prototype.sortByOrder = function () {
    return this.sort((a, b) => a.order > b.order ? 1 : a.order < b.order ? -1 : 0);
};

const redirectTo = (destination, { res, status } = {}) => {
    if (res) {
        res.writeHead(status || 302, { Location: destination });
        res.end();
    } else {
        if (destination[0] === "/") {
            Router.push(destination);
        } else {
            window.location = destination;
        }
    }
};

const isServer = typeof window === "undefined";

const setCookie = (name, value, expire, path = "/") => {
    let expires = "";

    if (expire.days) {
        expires = new Date(Date.now() + expire.days * 864e5).toUTCString();
    }

    if (expire.min) {
        expires = new Date(Date.now() + expire.min * 6e4).toUTCString();
    }

    document.cookie = name + "=" + encodeURIComponent(value) + "; expires=" + expires + "; path=" + path;
};

const getCookie = name => {
    return document.cookie.split("; ").reduce((r, v) => {
        const parts = v.split("=");
        return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, "");
};

const deleteCookie = (name, path) => {
    setCookie(name, "", -1, path);
};

const redirect = url => {
    if (!isServer) {
        window.location.href = url;
    }
};

const beautifyDateString = isoString => isoString.split('T')[0];

const userLoggedIn = !isServer && localStorage.getItem('auth');

const reloadPage = () => window.location.reload();

const spinnerIcon = <LoadingOutlined style={{ fontSize: 36 }} spin />;


const httpRequestHelper = (url, data = null, opts={}) => {
    const postOptions = data && {
        method: "POST",
        data
    } || {};
    return request({
        url,
        method: "GET",
        ...postOptions,
        ...opts
    });
};

const getDateWithTimezone = (date=null) => {
    if (!date) {
        return new Date(new Date().toLocaleString("en-US", {timeZone: "America/Vancouver"}));
    }
    return new Date(new Date(date).toLocaleString("en-US", {timeZone: "America/Vancouver"}));
};

function numberWithCommas(num) {
    if (!num) return 0;
    const parts = (+num).toFixed(2).split(".");
    return parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (+parts[1] ? "." + parts[1] : ".00");
}

const formatDate = (isoString) => {
    const dateObject = getDateWithTimezone(isoString.replace('Z', ''));
    return `${dateObject.toDateString()}, ${dateObject.toLocaleTimeString()}`;
};


const generateString = () => Math.random().toString(36).substr(2, 5);
const generateLongString = () => generateString() + generateString();

const isEmpty = obj => Object.keys(obj).length === 0;

const getGoogleMapAddress = (address) => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURI(address)}`
};

const notifyError = (title='An error occurred', description='Please try again later') => {
    toaster.danger(title, {
        duration: 5,
        description
    });
};

const notifySuccess = (title='Successful', description='Action is Done.') => {
    toaster.success(title, {
        duration: 5,
        description
    });
};

const numberOnChange = (e, cb) => {
    e.preventDefault();
    let {value} = e.target;
    const regex = /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*|0)$/;
    value = value.toString();
    if (value === '' || regex.test(value)) {
        cb(value);
    }
};

const getUrlQuery = () => {
    return window.location.search
        .split('?')
        .splice(-1)[0]
        .split('&')
        .map(str => {
            const [key, value] = str.split('=');
            return {[key]: decodeURI(value)};
        })
        .mergeChildren();
};


export {redirectTo, isServer, setCookie, getCookie, deleteCookie, redirect, beautifyDateString, userLoggedIn,
    reloadPage, spinnerIcon, httpRequestHelper, getDateWithTimezone, numberWithCommas, getUrlQuery,
    formatDate, generateLongString, isEmpty, getGoogleMapAddress, notifyError, numberOnChange, notifySuccess
}
