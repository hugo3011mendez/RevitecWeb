import { getStorageObject, getStorageValue, queryParams, removeStorageItem, setStorageObject, setStorageValue } from './functions';
import { notifyOperationResult, swalertConnectionError } from './notifications';

/**
 * Calls the API, converts the response to JSON and handles errors.
 * Returns null in case of error.
 * @param {string} method
 * @param {string} url
 * @param {FormData} body
 * @returns {object}
 */
export async function api(method, url, body) {
    // params
    let params = {
        method: method,
        headers: {
            'AuthToken': getToken()
        }
    };
    if (method == 'POST') params['body'] = body;

    // api call
    const response = await fetch(window.ENV.ApiURL + url, params);
    if (!response.ok) {
        swalertConnectionError();
        return null;
    }

    // result
    const result = await response.json();

    // operation result
    if (result.error) {
        notifyOperationResult(result);
        if (result.id == 2) {
            // invalid session
            destroySession();
        }
        return null;
    } else {
        if (result.notify) {
            notifyOperationResult(result);
        }
        return result;
    }
}

/**
 * Sends a GET request to the API, converts the response to JSON and handles errors.
 * Returns null in case of error.
 * @param {string} url
 * @returns {object}
 */
export const apiGet = async url => await api('GET', url);

/**
 * Sends a POST request to the API, converts the response to JSON and handles errors.
 * Returns null in case of error.
 * @param {string} url
 * @param {FormData} formData
 * @returns {object}
 */
export const apiForm = async (url, formData) => await api('POST', url, formData);

/**
 * Sends a DELETE request to the API, converts the response to JSON and handles errors.
 * Returns null in case of error.
 * @param {string} url
 * @returns {object}
 */
export const apiDelete = async url => await api('DELETE', url);

/**
 * Generates a URL to the API with credentials sent as a GET parameter.
 * Only some API services accept this credentials.
 * @param {string} path
 * @param {Object} params
 */
export function apiUrl(path, params) {
    if (!params) params = {};
    params['authToken'] = getAltToken();
    return window.ENV.ApiURL + path + '?' + queryParams(params);
}

/**
 * Stores the given user object as the current session.
 * @param {object} user
 */
export function storeSession(user) {
    setStorageObject("user", user);
    setStorageValue("token", user.token);
    setStorageValue("alttoken", user.altToken);
}

/**
 * Deletes the current session info.
 */
export function destroySession() {
    removeStorageItem("user");
    removeStorageItem("token");
    removeStorageItem("alttoken");
}

/**
 * Returns the current session info.
 * @returns {object} User.
 */
export const getSession = () => getStorageObject("user");

/**
 * Returns the current session token.
 * @returns {string} Token.
 */
export const getToken = () => getStorageValue("token");

/**
 * Returns the current session alternative token,
 * which can be used as a GET parameter.
 * @returns {string} Alternative GET token.
 */
export const getAltToken = () => getStorageValue("alttoken");
