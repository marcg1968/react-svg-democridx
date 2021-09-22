// functions.js

import {
    MAX_NAME_LEN,
} from './constants'

export const easeInOutSine = n => -(Math.cos(Math.PI*n)-1)/2 /* from 0 to 1 */

export const distributionEaseInOutSine = (len=0) =>
    [...Array(len).keys()].map(i => easeInOutSine(i/(len-1)) * len)

export const heatMapColorforValue = value => {
    /*
    0    : blue   (hsl(240, 100%, 50%))
    0.25 : cyan   (hsl(180, 100%, 50%))
    0.5  : green  (hsl(120, 100%, 50%))
    0.75 : yellow (hsl(60, 100%, 50%))
    1    : red    (hsl(0, 100%, 50%))
    */
    value = 1 - value
    // const h = (1.0 - value) * 240
    const h = (1.0 - value) * 210
    return "hsl(" + h + ", 100%, 50%)"
}

// Saint Pierre and Miquelon
// Saint Helena, Ascension and Tristan da Cunha
export const abbrevCountryName = name => {
    name = name || false
    if (!name) return
    if (name.length <= MAX_NAME_LEN) return name
    return name
        .split(/\s+/)
        .reduce((prev,curr) => `${prev} ${curr}`.length <= 25 ? `${prev} ${curr}` : prev, '')
}
