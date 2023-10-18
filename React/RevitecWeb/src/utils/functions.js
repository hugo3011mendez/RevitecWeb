import moment from 'moment';

export const getStorageObject = (itemName) => { return JSON.parse(localStorage.getItem(window.ENV.StoragePrefix + itemName)); };
export const setStorageObject = (itemName, itemValue) => { localStorage.setItem(window.ENV.StoragePrefix + itemName, JSON.stringify(itemValue)); };
export const getStorageValue = (itemName) => { return localStorage.getItem(window.ENV.StoragePrefix + itemName); };
export const setStorageValue = (itemName, itemValue) => { localStorage.setItem(window.ENV.StoragePrefix + itemName, itemValue); };
export const removeStorageItem = (itemName) => { localStorage.removeItem(window.ENV.StoragePrefix + itemName); };

/**
* Returns the current language.
*/
export const getLanguage = () => getStorageValue("language");

/**
* Stores the given object as the current language.
* @param {string} language
*/
export function storeLanguage(language) {
    setStorageValue("language", language);
}

/**
 * Returns one of the two texts depending on the selected language
 * @param {any} esText Text in spanish
 * @param {any} enText Text in english
 */
export function languageText(esText, enText)
{
    if (getLanguage() == "es") {
        return esText;
    }
    else if (getLanguage() == "en") {
        return enText;
    }
}

export const triggerOnEnter = (e) => {
    if (e.which === 13) {
        const element = e.target;
        const parent = element.closest("[triggeronenterparent]");
        const child = parent.querySelector("[triggeronenter]");
        child.click();
    }
};

/**
 * Checks whether a string has a valid email format.
 * @see https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
 * @param {string} email
 * @returns {boolean}
 */
export const validateEmail = email => String(email).toLowerCase().match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

/**
 * Pads a value with leading zeroes.
 * @see https://stackoverflow.com/questions/1267283/how-can-i-pad-a-value-with-leading-zeros
 * @param {any} value Value to pad.
 * @param {number} zeros Maximun 16.
 * @returns {string} Zerofilled value.
 */
export const zerofill = (value, zeros) => ('0000000000000000' + value).slice(-zeros);

/**
 * Generates a human-friendly HTML string from a JSON.
 * @see https://stackoverflow.com/questions/4810841/pretty-print-json-using-javascript
 * @param {any} json JSON string or plain JavaScript object.
 */
export const prettyPrint = json => {
    if (typeof json !== 'string') {
        json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        let cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

/**
 * Creates a single query parameter string from a key and a value.
 * @param {any} key
 * @param {any} value
 */
export function queryParam(key, value) {
    const simpleParam = (k, v) => {
        if (v) return encodeURIComponent(k) + '=' + encodeURIComponent(v);
    }
    if (Array.isArray(value)) {
        if (value.length > 0)
            return value.map(elem => simpleParam(key, elem)).join('&')
    } else return simpleParam(key, value);
}

/**
 * Converts an object in a query parameters string.
 * @param {object} params Parameters object.
 * @returns {string} Query ready string.
 */
export function queryParams(params) {
    if (params) return Object.keys(params).map(key => queryParam(key, params[key])).join('&');
}

/**
 * Normalizes a string replacing accented and uppercase characters with their regular versions.
 * @see https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
 * @param {string} str String to normalize.
 * @returns Normalized, sortable string.
 */
export const sortableString = str => isString(str) ? str.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase() : "";

/**
 * Checks whether a value is of type string.
 * @param {any} str Value to check.
 */
export const isString = str => typeof str === 'string';

/**
 * Waits a given time.
 * @see https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
 * @param {any} ms Miliseconds.
 */
export const sleep = ms => new Promise(r => setTimeout(r, ms));

/**
 * Shows every value inside a formData object in console.
 * @see https://stackoverflow.com/questions/17066875/how-to-inspect-formdata
 * @param {FormData} formData
 */
export const consoleLogFormData = (formData) => {
    for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
    }
}

/**
 * Generates a FormData from a plain JavaScript object. Does not work well with nested arrays or objects.
 * @see https://stackoverflow.com/questions/39965579/how-to-loop-an-object-in-react
 * @param {object} data
 */
export const generateFormData = (data) => {
    let formData = new FormData();
    Object.keys(data).forEach(function (key) {
        if (data[key] !== null) {
            formData.append(key, data[key]);
        }
    });
    return formData;
}

/**
 * Appends an array to a FormData object.
 * @param {FormData} formData
 * @param {string} name
 * @param {any[]} array
 */
export const appendArrayToFormData = (formData, name, array) => {
    for (var i = 0; i < array.length; i++) {
        formData.append(`${name}[]`, array[i]);
    }
}

/**
 * Converts a date and time from UTC to local and formats it.
 * @param {string} value UTC datetime.
 * @param {string} format
 * @returns {string} A formatted string.
 */
export const localDateTime = (value, format = "DD/MM/yyyy HH:mm") => moment.utc(value).local().format(format)

/**
 * Formats a date.
 * @param {string} value Valid date or date and time.
 * @param {string} format
 * @returns {string} A formatted string.
 */
export const formatDate = (value, format = "l") => moment.utc(value).local().format(format)

/**
 * Calculates relative time from the current local time.
 * @param {string} value UTC datetime.
 * @param {string} altText Shown when the time is not valid.
 * @returns {string} A string, e.g. "45 minutes ago".
 */
export const relativeDateTime = (value, altText = 'never') => {
    const time = moment.utc(value);
    return time.isValid() ? time.fromNow() : altText;
}

/**
 * Extracts the extension from a file name or path.
 * @see https://stackoverflow.com/questions/190852/how-can-i-get-file-extensions-with-javascript
 * @param {string} filename Name or path of the file.
 * @returns {string} File extension.
 */
export const getFileExtension = filename => filename.split('.').pop();
