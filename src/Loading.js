// Debug.js

import React, { useEffect, useState } from 'react'
import {
    GREY
} from './constants'

const Loading = props => {

    let {
        len,
        total,
        loadingText,
        loadedText,
    } = props

    /* useEffect dep on whether loaded will trigger opacity transition via */
    /* the slightly delayed changing of state var animateHide */
    const [animateHide, setAnimateHide] = useState(false);
    const delay = 100
    const opacityTransitionMs = 500
    const innerOpacity = .55
    // const loaded = (len === total)
    const loaded = (len / total > 0.9)
    useEffect(() => {
        let timer1 = setTimeout(() => setAnimateHide(true), delay)
        return () => { clearTimeout(timer1) } /* "unsubscribe" */
    }, [loaded])

    if (!len) return null

    const styleInner = {
        ...styles.inner,
    }

    const styleInnerTransition = len === total
        ? {
            transition: `opacity ${opacityTransitionMs}ms linear`,
            opacity: animateHide ? 0 : innerOpacity, /* changing this value will trigger transition */
        }
        : {
            opacity: innerOpacity,
        }

    loadingText = loadingText && loadingText.trim().length ? loadingText : 'loading ...'
    loadedText = loadingText && loadingText.trim().length ? loadedText : 'Loaded.'
    const text = (len / total === 1) ? loadedText : loadingText

    return (
        <div className={'loading'} style={{...styles.container}}>
            <div style={{...styles.outer}}>
                <div style={{...styleInner, ...styleInnerTransition}}>&nbsp;</div>
                <div style={{
                    ...styles.innerWhiteout,
                    width:`${100-(100*len)/total}%`,
                }}>&nbsp;</div>
            </div>
            <div style={{
                ...styles.progress,
                opacity: (len / total) < 1 ? .67 : 0,
            }}>
                {text + ' '}
                {`${Math.ceil((100 * len) / total)}%`}
            </div>
        </div>
    )
}

const styles = {
    container: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inner: {
        // background: GREY,
        background: 'linear-gradient(to right, ' +
            'hsl(0, 100%, 50%), ' +
            'hsl(48, 100%, 50%) 20%, ' +
            'hsl(96, 100%, 50%) 40%, ' +
            'hsl(144, 100%, 50%) 60%, ' +
            'hsl(196, 100%, 50%) 80%, ' +
            'hsl(240, 100%, 50%) 100%) ',
        opacity: .5,
    },
    innerWhiteout: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        background: '#fff',
    },
    outer: {
        /* DON'T USE flex: 1 HERE!!! */
        width: '50vw',
        textAlign: 'center',
        margin: '.5rem',
        position: 'relative',
    },
    progress: {
        position: 'absolute',
        width: '10vw',
        top: 0, right: 0, bottom: 0, left: 0, margin: 'auto',
        marginTop: '.5rem',
    },
}

export default Loading

