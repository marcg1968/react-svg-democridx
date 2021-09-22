// Heatmap.js

import React from 'react'
import './Heatmap.css'

const Heatmap = () => {

    return (
        <section>
            <div className={'heatmap-title'}>{'Heat map scale:'}</div>
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
