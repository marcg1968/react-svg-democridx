// CountryListing.js

import {
    abbrevCountryName,
} from './functions'
import {
    GREY_HALF,
} from './constants'

const CountryListing = props => {

    const {
        countries, selected, colour, countryRefs,
        handleZoomChange, handleZoomChangeUpateState,
        baseSpacing=.25,
        fontSize=1,
        title='Country list'
    } = props

    if (countries===null) return null
    // console.log(576, {selected, colour})

    const styles = {
        title: {
            fontSize: `${fontSize*1.1}rem`,
            fontWeight: 'bolder',
            padding: `${baseSpacing*2}rem`,
        },
        countries: {
            display: 'flex', flexWrap: 'wrap',
        }
        ,
    }

    return (
        <section>
            <div style={{...styles.title}}>
                {title}
            </div>
            <div style={{...styles.countries}}>
                {countries
                    .filter(e => e.n) /* filter out elements without n (=name) */
                    .sort((a, b) => a.n < b.n ? -1 : 1)
                    .map((country, i) => {
                        let { n: countryName, id } = country
                        if (!countryName) return false
                        countryName = abbrevCountryName(countryName)
                        countryName = countryName.replace(/\s+/g, '\u00a0') /* nbsp */
                        countryName = countryName.replace(/-/g, '\u2011') /* hyphen, non-breaking */
                        const bgCol = (i % 2 === 0) ? 'transparent' : GREY_HALF
                        const borderAndPadding = (id === selected)
                            ? {
                                border: `${baseSpacing}rem solid ${colour}`,
                                padding: `0 ${baseSpacing*2}rem`,
                            }
                            : {
                                border: `${baseSpacing}rem solid transparent`,
                                padding: `0 ${baseSpacing*2}rem`,
                            }
                        return (
                            <div
                                key={country.id}
                                title={country.n}
                                style={{
                                    ...{
                                        background: bgCol,
                                        cursor: 'pointer',
                                        fontSize: `${fontSize}rem`,
                                    },
                                    ...borderAndPadding
                                }}
                                onClick={() => {
                                    // console.log(country.paths)
                                    if ('id' in country && country.id in countryRefs) {
                                        // console.log(623, countryRefs[country.id])
                                        const {current} = countryRefs[country.id] || {}
                                        // console.log(625, current)
                                        if (current) {
                                            const {x, y, width, height} = current.getBBox()
                                            // console.log(628, {x, y, width, height})
                                            const boundingBox = {
                                                x,
                                                y,
                                                width,
                                                height,
                                                sw: 0.3,
                                            }
                                            handleZoomChange(50, boundingBox)
                                        }
                                    }
                                    handleZoomChangeUpateState(country.id)
                                }}
                            >
                                {countryName}
                            </div>
                        )
                    })
                    .filter(Boolean)
                }
            </div>
        </section>
    )
}

export default CountryListing
