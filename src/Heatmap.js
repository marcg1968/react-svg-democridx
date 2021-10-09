// Heatmap.js

import React from 'react'
import {
    HeatmapCol,
    HeatmapContainer,
    HeatMapScaleInner,
    HeatMapScaleOuter,

} from './Builders'
import { breakpointsPlural } from './constants'
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

    // let arr = [
    //     ...breakpointsPlural.slice(0, 1),
    //     [0,0],
    //     ...breakpointsPlural.slice(1, breakpointsPlural.length),
    // ]
    // console.log(58, arr)
    // arr = [
    //     ...breakpointsPlural.slice(0, 1),
    //     [0,0],
    //     ...breakpointsPlural.slice(1, breakpointsPlural.length-1),
    // ]
    // console.log(64, arr)
    const breakpoints = [
        ...breakpointsPlural.slice(0, 2),
        [0, ''],
        ...breakpointsPlural.slice(2, breakpointsPlural.length),
    ]

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

            <HeatmapContainer>
            {[...Array(4).keys()].map(i => (
                <HeatmapCol key={'colcol'+i} col={i+1}>&nbsp;</HeatmapCol>
            ))}
            </HeatmapContainer>
            <HeatmapContainer>
                {breakpoints
                .map((pt, i, self) => (
                    <HeatmapCol
                        key={`col0-${i}`}
                    >
                        {i/self.length}
                    </HeatmapCol>
                ))}
            </HeatmapContainer>
            <HeatmapContainer col={1}>
                {breakpoints
                .map((pt, i, self) => (
                    <HeatmapCol
                        key={`col-${i}`}
                        borderleft={i===2 ? 0 : 1}
                        marginleft={i===0 ? 0 : i===1 ? 1 : (i/15)}
                        col={-1}
                        hangright={(i===1||i===self.length-1)?1:0}
                    >
                        {pt[1]}
                    </HeatmapCol>
                ))}
            </HeatmapContainer>

        </section>
    )
}

export default Heatmap
