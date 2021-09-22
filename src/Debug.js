// Debug.js

import React, {useState} from 'react'
import './Debug.css'

const Debug = props => {

    const {
        len,
        boundingBox,
        viewBox,
        viewBoxCtl,
        zoom,
        handleCentering,
        selectedHistory,
        selected,
    } = props

    const [debugOn, setDebugOn] =  useState(localStorage.getItem('debug'))

    if (!viewBox || !(viewBox instanceof Array)) return null

    const toggleDebug = () => {
        // setDebugOn(prev => setDebugOn(!prev))
        localStorage.setItem('debug', !debugOn ? '1' : '')
        setDebugOn(!debugOn)
    }

    const styleDebug = debugOn ? {...styles.styleDebugOn} : {...styles.styleDebugOff}
    const { debugBtn, debugBtnText } = styles

    return (
        <section className={'section-debug'}>
            <div
                style={{...debugBtn}}
                className={'debug-btn'}
                title={`Turn debugging output ${debugOn ? 'OFF' : 'ON'}`}
            >
                <div
                    style={{...debugBtnText}}
                    className={'debug-btn-text'}
                    onClick={() => toggleDebug()}
                >
                    {'D'}
                    {debugOn ? '\u2014' : '\u002B'}
                </div>
            </div>

            <div style={{...styleDebug}}>
                <div>{'boundingBox:' + boundingBox ? JSON.stringify(boundingBox) : ''}</div>
                <div>{'viewBox:' + viewBox.join(', ')}</div>
                {viewBox && viewBox.map((e, i) =>
                    (<input
                        type={'number'}
                        i={i}
                        key={'inp'+i}
                        value={viewBox[i]}
                        onChange={(e) => viewBoxCtl(i, e.target.value)}
                    />)
                )}
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div style={{flex: 1}}>
                        <button
                            // onClick={() => this.handleCentering()}>{'move selected to center'}
                            onClick={() => handleCentering()}>{'move selected to center'}
                        </button>
                    </div>
                    <div style={{flex: 1}}>
                        Zoom: <input
                        type={'number'}
                        value={Math.round(zoom*100000)/1000}
                        onChange={(e) => {
                            this.handleZoomChange(e.target.value)
                        }}
                    />
                    </div>
                </div>
                <div>{'#:' + len}</div>
            </div>

            <pre style={{...styleDebug}}>
                {'selectedHistory: '}{JSON.stringify(selectedHistory)}
                <br/>
                {'selected: '}{JSON.stringify(selected)}
            </pre>

        </section>
    )
}

const styles = {
    debugBtn: {
        position: 'absolute',
        border: '1px solid #000',
        borderRadius: '10%',
        top: '1rem',
        right: '1rem',
        width: '3.3rem',
        height: '2.25rem',
        display: 'flex',
        zIndex: 1,
    },
    debugBtnText: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        width: '100%',
        cursor: 'pointer',
    },
    styleDebugOn: {
        opacity: 1,
        display: 'block',
    },
    styleDebugOff: {
        opacity: 0,
        height: 0,
        display: 'none',
    },
}

export default Debug
