// constants.js

export const CRIMSON = 'rgb(220, 20, 60)'
export const CRIMSON_HALF = 'rgba(220, 20, 60, .5)'
export const GREY = '#b9b9b9'
export const GREY_HALF = 'rgba(185,185,185,0.5)'
export const DARKGREY = 'rgba(61,34,34,0.5)'
export const BLACK = '#000000ff'
export const strokeWidth = 0.5
export const stroke = "#FFFFFF"
export const ZOOM = .15
export const ZOOM_ANIMATION_MS = 3000
export const MAX_BOUNDING_RECT_FACTOR = 2 /* a good choice is 2 - 3 */
export const SVG_WIDTH = 1000
export const SVG_HEIGHT = 428 /* 507.209 would include Antarctica */
export const MAX_NAME_LEN = 25
export const mainTitle = 'Country Democracy Index (2020)'
export const breakpoints = [
    [.4, 'authoritarian'],
    [.6, 'hybrid regime'],
    [.8, 'flawed democracy'],
    [1, 'full democracy'],
]
/* JSON source files: in public/ subdir */
export const countriesSVGDataJson = 'countries.json'
export const democIdxJson = 'worldbank_democracy_index.json'
// export const totalLoadingTimeMs = 5000
export const totalLoadingTimeMs = 5
export const progressiveLoading = true

