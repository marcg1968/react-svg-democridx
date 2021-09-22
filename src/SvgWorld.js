// SvgWorld.js

import React, {
    Component,
    createRef,
} from 'react'
import {
    easeInOutSine,
    heatMapColorforValue,
    loadDemocIdxJson,
    loadCountriesSVGDataJson,
} from './functions'
import {
    breakpoints,
    CRIMSON,
    CRIMSON_HALF,
    GREY,
    mainTitle, progressiveLoading,
    stroke,
    strokeWidth,
    totalLoadingTimeMs,
    ZOOM,
} from './constants'
import Heatmap from './Heatmap'
import Loading from './Loading'
import CountryListing from './CountryListing'
import CountryProfile from './CountryProfile'

class SvgWorld extends Component {

    constructor(props) {
        super(props)
        this.state = {
            mainTitle: mainTitle,
            total: 0, /* # of countries */
            countries: [],
            countryRefs: {},
            democIdx: {},
            ranking: [],
            selected: null, /* country ID */
            selectedHistory: [],
            width: 0,
            height: 0,
            viewBox: [0, 0, 0, 0],
            boundingBox: null,
            zoom: 1,
        }

        /* vars used in zoom animation */
        this.elapsed = 0
        this.started = null
        this.ms = 3000
        this.percent = ZOOM
        this.startWidth = 0
        this.targetWidth = 0
        this.boundingBox = null
        this.targetCentreX = null
        this.targetCentreY = null
        this.startCentreX = null
        this.startCentreY = null
    }

    componentDidMount = async () => {

        let {
            width,
            height,
        } = this.props

        this.setState({
            viewBox: [0, 0, width, height],
            width,
            height,
        })

        /* load democracy index data from local file */
        const { democIdx, ranking } = await loadDemocIdxJson()
        this.setState({ democIdx, ranking })

        /* load SVG country definitions from local file */
        const data = await loadCountriesSVGDataJson()

        /* The first option creates the illusion of progressive "building blocks" loading of the countries */
        /* The second option loads countries in one hit */
        /* Controlled by bool constant: progressiveLoading */
        if (progressiveLoading) this.loadCountriesCumulatively(data)
        if (!progressiveLoading) this.loadCountriesInOneHit(data)

    }

    componentWillUnmount = () => {}

    loadCountriesCumulatively = data => {
        let countryRefs = {}
        data.reduce((prev, current, i, self) => {
            const { id } = current
            countryRefs[id] = createRef()

            /* progressively add country definitions - creates a cumulative "building block" effect */
            const delay = easeInOutSine((i+1)/self.length) * totalLoadingTimeMs
            return setTimeout(() => this.setState(({countries}) => {
                return {
                    countries: [...countries, current]
                }
            }), delay)

        }, null)
        this.setState({
            countryRefs,
            total: data.length,
        })
    }

    loadCountriesInOneHit = data => {
        let countryRefs = {}
        const countries = data.reduce((prev, current, i, self) => {
            const { id } = current
            countryRefs[id] = createRef()
            prev = [...prev, current]
            return prev
        }, [])
        this.setState({
            countries,
            countryRefs,
            total: data.length,
        })
    }

    handleCentering = () => {
        const {
            viewBox,
            boundingBox,
        } = this.state
        if (!boundingBox || !viewBox) return
        const { x, y, width, height } = boundingBox || {}
        console.log(101, {x, y, width, height})
        const centre = { x: x + (width/2), y: y + (height/2) }
        console.log(103, { centre })
        this.setState(prevState => {
            const { viewBox } = prevState
            viewBox[0] = centre.x - (viewBox[2]/2)
            viewBox[1] = centre.y - (viewBox[3]/2)
            return {
                viewBox
            }
        })
    }

    handleZoomChangeUpateState = country_id => {
        this.setState(prevState => {
            const selectedHistory = prevState.selected
                ? [
                    prevState.selected,
                    ...prevState.selectedHistory.slice(0, 9),
                ]
                : []
            return {
                selected: country_id,
                selectedHistory,
            }
        })
    }

    /* WORKING: */
    /* also sets boundingBox */
    handleZoomChange = (zoom, boundingBox) => {

        /* animation if both non null params */
        if (zoom && boundingBox) {
            this.setState({ boundingBox: {...boundingBox} })
            this.boundingBox = {...boundingBox}

            /* if boundingBox height > 1/3 of viewport height, use a zoom > .15 */
            /* so that boundingBox is ~ 1/3 height */
            const { height } = this.state
            // console.log(148, {
            //     'this.boundingBox.height': this.boundingBox.height,
            //     'this.boundingBox.height * 3': this.boundingBox.height * 3,
            //     height,
            //     ZOOM,
            //     'height * ZOOM': height * ZOOM,
            // })
            if (this.boundingBox.height * 3 > height * ZOOM) {
                this.percent = (this.boundingBox.height * 2)/height
            }
            // console.log(150, {'this.percent': this.percent})
            return this.animateZoom()
        }

        boundingBox = boundingBox ? boundingBox : this.state.boundingBox
        zoom = zoom ? (zoom || 1)/100 : this.state.zoom
        zoom = zoom !== false && zoom <= 0 ? 1 : zoom /* circular: if < 0 reset to 1 */
        // console.log(134, {zoom, boundingBox})

        this.setState(prevState => {
            let { viewBox, width, height } = prevState
            /* if no country selected, i.e. boundingBox is null, make it full size */
            boundingBox = (boundingBox === null) ? { x: 0, y: 0, width, height, sw: 0 } : boundingBox
            const centre = {
                x: boundingBox.x + (boundingBox.width/2),
                y: boundingBox.y + (boundingBox.height/2)
            }
            viewBox[2] = zoom * width
            viewBox[3] = zoom * height
            viewBox[0] = centre.x - (zoom * width/2)
            viewBox[1] = centre.y - (zoom * height/2)
            return {
                zoom,
                viewBox,
                boundingBox,
            }
        })
    }

    animateZoom = () => {
        const { viewBox, width, height } = this.state
        const _viewBox = [...viewBox] /* shallow copy */

        /* initialize */
        if (this.started === null) {
            this.started = new Date().valueOf()
            /* target width/height */
            const [w2, h2] = [width, height].map(e => (this.percent || 0.5) * e)

            // console.log(177, {w2, h2, boundingBox: this.boundingBox})
            // console.log(178, {_viewBox: [...viewBox].join(' ')})
            this.targetWidth = w2
            this.targetHeight = h2

            this.startCentreX = this.targetCentreX ? this.targetCentreX : width / 2
            this.startCentreY = this.targetCentreY ? this.targetCentreY : height / 2

            this.targetCentreX = this.boundingBox.x + (this.boundingBox.width / 2)
            this.targetCentreY = this.boundingBox.y + (this.boundingBox.height / 2)

            /* if width and height values of viewbox have already been set use them, */
            /* else if first time, use the svg original width and height values */
            // console.log(183, { width, height })
            this.startWidth  = _viewBox[2] ? _viewBox[2] : width
            this.startHeight = _viewBox[3] ? _viewBox[3] : height

            // console.log(222, {
            //     _viewBox,
            //     targetCentreX: this.targetCentreX,
            //     targetCentreY: this.targetCentreY,
            //     startCentreX: this.startCentreX,
            //     startCentreY: this.startCentreY,
            //     startWidth: this.startWidth,
            //     startHeight: this.startHeight,
            //     targetWidth: this.targetWidth,
            //     targetHeight: this.targetHeight,
            // })
        }

        this.elapsed = new Date().valueOf() - this.started
        // console.log(169, this.started, this.elapsed)

        /* calculate graduation based on width */
        let w = this.startWidth - ((this.startWidth - this.targetWidth) * (this.elapsed / this.ms))
        let h = (w/this.startWidth) * this.startHeight
        const zoom = w/width < 1 ? w/width : 1

        // console.log(252, {
        //     w, h,
        //     // growthX, growthY,
        //     zoom: Math.round(zoom * 1000)/1000,
        //     pc: Math.round((this.elapsed / this.ms)*1000)/10,
        // })

        const centre = {
            x: this.startCentreX + ((this.targetCentreX - this.startCentreX) / this.ms) * this.elapsed,
            y: this.startCentreY + ((this.targetCentreY - this.startCentreY) / this.ms) * this.elapsed
        }

        this.setState(prevState => {
            let { viewBox } = prevState
            viewBox[2] = w
            viewBox[3] = h
            viewBox[0] = centre.x - (zoom * width/2)
            viewBox[1] = centre.y - (zoom * height/2)
            return {
                viewBox,
                zoom,
            }
        })
        /* exit animation loop and reset certain values */
        if (this.elapsed >= 3000) {
            this.elapsed = 0
            this.started = null
            this.percent = ZOOM
            return
        }
        /* re-enter animation loop */
        window.requestAnimationFrame(this.animateZoom)
    }

    render() {

        const {
            mainTitle,
            total,
            countries,
            selected,
            selectedHistory,
            democIdx,
            countryRefs,
            viewBox,
            boundingBox,
            zoom,
            ranking,
        } = this.state
        let {
            width,
            height,
        } = this.props

        const len = countries ? countries.length : -1
        const rating = (selected && (selected in democIdx)) ? democIdx[selected] : null
        const colour = rating ? heatMapColorforValue(rating) : CRIMSON_HALF

        const prevSelected = selectedHistory.length ? selectedHistory[0] : null
        const prevRating = (prevSelected && (prevSelected in democIdx)) ? democIdx[prevSelected] : null
        const prevColour = prevSelected ? heatMapColorforValue(prevRating) : null

        const [, typ] = breakpoints.filter(([val, typ]) => rating < val).shift()

        const countryRectProps = {...boundingBox, sw: 0.1}

        // const zoomerMinus = zoom === 1
        const classZoomerPlus = zoom <= .15 ? 'zoomerPlus0' : 'zoomerPlus'
        const classZoomerMinus = zoom >= 1 ? 'zoomerMinus0' : 'zoomerMinus'

        /* zoom in i.e. decrease zoom value */
        const handleZoomPlus = zoom > .15
            ? () => {
                const zoomTo = (Math.round(zoom*100)/100)*90
                this.handleZoomChange(zoomTo < 15 ? 15 : zoomTo)
            }
            : null
        /* zoom OUT i.e. increase zoom value */
        const handleZoomMinus = zoom < 1
            ? () => {
                const zoomTo = (Math.round(zoom*100)/100)*110
                this.handleZoomChange(zoomTo > 100 ? 100 : zoomTo)
            }
            : null

        return (
            <MainContainer
                mainTitle={mainTitle}
            >
                <Loading
                    len={len}
                    total={total}
                    loadingText={'Loading ...'}
                    loadedText={'Loaded.'}
                />
                <div className={'svgmap-cont'}>
                    <div className={'svg-countrylist'}>
                        <CountryListing
                            countries={countries}
                            selected={selected}
                            colour={colour}
                            countryRefs={countryRefs}
                            handleZoomChange={this.handleZoomChange}
                            handleZoomChangeUpateState={this.handleZoomChangeUpateState}
                            fontSize={.8}
                            baseSpacing={.15}
                        />
                    </div>

                    <div className={'svg-cont'}>
                        <div className={'zoomer'}>
                            <div className={'zoomerPc'}>{zoom && Math.round(zoom*100) + '%'}</div>
                            <div className={classZoomerMinus} onClick={handleZoomMinus}>{'\u2012'}</div>
                            <div className={classZoomerPlus} onClick={handleZoomPlus}>{'\u002B'}</div>
                        </div>
                        <svg
                            width={width}
                            height={height}
                            viewBox={viewBox.join(', ')} /* standard */
                            xmlSpace="preserve"
                            className={'svg-map'}
                            style={{
                                border: `1px solid ${GREY}`,
                                width: `${width}px`,
                            }}
                        >

                            {/* for animations cf https://www.mediaevent.de/svg-line-art-mit-css/ */}
                            <style>
                                {selected && `
                                #layer-${selected.toLowerCase()} {
                                          /*animation: animation1 3750ms ease-in-out;*/
                                          animation: animation1 1500ms linear forwards;
                                }
                                `}
                                {selected && `
                                @keyframes animation1 {
                                   0% { fill: ${GREY}; opacity: 0; }
                                   100% { fill: ${colour}; opacity: 1; }
                                }
                                `}
                                {(prevSelected && prevColour) && `
                                #layer-${prevSelected.toLowerCase()} {
                                    animation: animation2 1500ms linear forwards;
                                }
                                @keyframes animation2 {
                                   0%   {
                                      fill: ${prevColour};
                                      stroke: ${CRIMSON};
                                   }
                                   100% {
                                      fill: ${GREY};
                                      stroke: ${stroke};
                                   }
                                }
                                `}
                            </style>
                            {countries && countries
                                .map(({ id, paths }, i) => {
                                    const fill = (id === selected)
                                        ? colour
                                        : (id === prevSelected)
                                            ? prevColour
                                            : GREY
                                    if (!id) return false

                                    // const transform = (id === selected)
                                    //     // ? 'rotate(-10 50 100) translate(-36, 45) skewX(40) scale(1.5 1.5)'
                                    //     // ? 'scale(1.5 1.5) translate(-36, 45)'
                                    //     ? `matrix(1.5, 0, 0, 1.5, ${-x/2}, ${-y/2})` /* make shape 1.5 times bitter */
                                    //     : ''
                                    let _strokeWidth = strokeWidth
                                    let _stroke = stroke
                                    _strokeWidth = (id === selected) ? .1 : strokeWidth
                                    _stroke = (id === selected) ? CRIMSON : stroke
                                    _strokeWidth = (id === prevSelected) ? .1 : _strokeWidth
                                    _stroke = (id === prevSelected) ? CRIMSON : _stroke

                                    return (
                                        <g
                                            key={i + '-' + id}
                                            id={id}
                                            ref={countryRefs[id] && countryRefs[id]}
                                            // transform={transform}
                                        >
                                            <path
                                                // className={'draw'}
                                                id={`layer-${(id||'missing').toLowerCase()}`}
                                                fill={fill}
                                                stroke={_stroke}
                                                strokeWidth={_strokeWidth}
                                                d={paths.join(' ')}
                                            />
                                        </g>
                                    )
                                })
                                .filter(Boolean)
                            }

                            {/* cf https://stackoverflow.com/a/25302276 - cause shape to be last in "stacking order" */}
                            {/* and for namespace attribute creation: https://stackoverflow.com/a/61167146 */}
                            {selected
                                ? <use
                                    xlinkHref={`#layer-${selected.toLowerCase()}`}
                                    href={`#layer-${selected.toLowerCase()}`}
                                />
                                : null
                            }
                            <CountryRect
                                {...countryRectProps}
                            />
                        </svg>
                    </div>

                    <CountryProfile
                        selected={selected}
                        countries={countries}
                        rating={rating}
                        colour={colour}
                        total={total}
                        ranking={ranking}
                        typ={typ}
                    />

                </div>

                <Heatmap />

            </MainContainer>
        )
    }
}

const MainContainer = props => {

    const {
        mainTitle
    } = props

    const style = {
        position: 'relative',
    }

    return (
        <section className={'section-main'}>
            <header>
                <h3>{mainTitle}</h3>
            </header>
            <div style={{...style}}>{props.children}</div>
        </section>
    )
}

const CountryRect = props => {

    let { x=0, y=0, width=0, height=0, sw=0.5 } = props

    const dx = -.003 * x
    const dy = -.002 * x
    x += dx
    y += dy
    width -= 2 * dx
    height -= 2 * dy

    return (
        <rect
            x={x} y={y} width={width} height={height}
            stroke={'crimson'}
            strokeWidth={sw}
            fill={'transparent'}
        />
    )
}

export default SvgWorld

