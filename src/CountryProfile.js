// CountryProfile.js

import React from 'react'
import {
    GREY_HALF,
} from './constants'

const CountryProfile = props => {

    const {
        selected,
        countries,
        rating,
        colour,
        total,
        ranking,
        typ,
    } = props

    const styleBorderBottom = { borderBottom: `5px solid ${colour}` }
    const place = selected
        ? ranking.findIndex(e => e.code === selected)
        : null

    return (
        <aside className={'svg-country-profile'}>
            {selected && (
                <div
                    className={'svg-country-profile-sel'}
                    style={{border: `1px solid ${GREY_HALF}`,}}
                >
                    <div>
                        <span>{countries.find(e => e.id === selected).n}</span>
                        <span>{` (${selected}) `}</span>
                    </div>
                    {rating
                        ? (
                            <div>
                                <div>&nbsp;&mdash;&nbsp;</div>
                                <div>
                                    <span style={{...styleBorderBottom}}>{'democracy index: '}</span>
                                    <span style={{...styleBorderBottom}}>{rating}</span>
                                </div>
                                <div>&nbsp;</div>
                                <div>{`# ${place} of ${total}`}</div>
                                <div>&nbsp;&mdash;&nbsp;</div>
                                <div>
                                    <span style={{...styleBorderBottom}}>{` (${typ}) `}</span>
                                </div>
                            </div>
                        )
                        : (
                            <div style={{ padding: '1rem 0.5rem', }}>(no data available)</div>
                        )
                    }
                </div>
            )}
            &nbsp;
        </aside>
    )
}

export default CountryProfile
