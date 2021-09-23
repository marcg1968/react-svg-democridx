// Zoomer.js

import React from 'react'

const Zoomer = props => {

    const {
        zoom,
        handleZoomChange,
        reset,
    } = props

    /* zoom in i.e. decrease zoom value */
    const handleZoomPlus = zoom > .15
        ? () => {
            const zoomTo = (Math.round(zoom*100)/100)*90
            handleZoomChange(zoomTo < 15 ? 15 : zoomTo)
        }
        : null
    /* zoom OUT i.e. increase zoom value */
    const handleZoomMinus = zoom < 1
        ? () => {
            const zoomTo = (Math.round(zoom*100)/100)*110
            handleZoomChange(zoomTo > 100 ? 100 : zoomTo)
        }
        : null

    const classZoomerPlus = zoom <= .15 ? 'zoomerPlus0' : 'zoomerPlus'
    const classZoomerMinus = zoom >= 1 ? 'zoomerMinus0' : 'zoomerMinus'

    return (
        <div>
            <div className={'zoomer'}>
                <div className={'zoomerReset'} onClick={reset}>{'reset'}</div>
                <div className={'zoomerPc'}>{zoom && Math.round(zoom*100) + '%'}</div>
                <div className={classZoomerMinus} onClick={handleZoomMinus}>{'\u2012'}</div>
                <div className={classZoomerPlus} onClick={handleZoomPlus}>{'\u002B'}</div>
            </div>
        </div>
    )
}

export default Zoomer
