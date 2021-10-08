// Heatmap.js

import React from 'react'
import { HeatMapScaleInner, HeatMapScaleOuter } from './Builders'
import './Heatmap.css'

const Heatmap = props => {

    const {
        rating,
        selected,
        countries,
    } = props

    // console.log({countries,rating,selected})
    let label = (rating && selected)
        ? rating + ' - ' + countries.find(e => e.id === selected).n + ' '
        : null
    label = (rating && rating < 0.8) 
        ? (
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    background: '#fff',
                }}>
                {'|< '}{label}
            </div>
        )
        : (rating && rating >= 0.8)
            ? (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        background: '#fff',
                        width: `${rating * 100}%`,
                    }}>
                    {label}{' >|'}
                </div>
            )
            : null

    return (
        <section>
            <div className={'heatmap-title'}>{'Heat map scale:'}</div>

            <HeatMapScaleOuter>
                {rating && rating >= 0.8 ? label : ''}
                <HeatMapScaleInner rating={rating}>
                    {/* {label ? label : ''} */}
                    {rating && rating < 0.8 ? label : ''}
                </HeatMapScaleInner>
            </HeatMapScaleOuter>

            <div className={'heatmap-container'}>
                <div className={'heatmap-col col1'}>
                    <div className={'colour-col'}>&nbsp;</div>
                    <div className={'label-col'}>authoritarian</div>
                    <div className={'rating-col'}>0</div>
                </div>
                <div className={'heatmap-col col2'}>
                    <div className={'colour-col'}>&nbsp;</div>
                    <div className={'label-col'}>hybrid regimes</div>
                    <div className={'rating-col'}>0.2</div>
                </div>
                <div className={'heatmap-col col3'}>
                    <div className={'colour-col'}>&nbsp;</div>
                    <div className={'label-col'}>&nbsp;</div>
                    <div className={'rating-col'}>0.4</div>
                </div>
                <div className={'heatmap-col col4'}>
                    <div className={'colour-col'}>&nbsp;</div>
                    <div className={'label-col'}>flawed democracies</div>
                    <div className={'rating-col'}>0.6</div>
                </div>
                <div className={'heatmap-col col5'}>
                    <div className={'colour-col'}>&nbsp;</div>
                    <div className={'label-col'}>full democracies</div>
                    <div className={'rating-col'}>0.8</div>
                </div>
            </div>
        </section>
    )
}

export default Heatmap
