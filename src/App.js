// App.js

import React, {
    useEffect,
    useState,
} from 'react'
import './App.css'
import SvgWorld from './SvgWorld'
import {
    SVG_HEIGHT,
    SVG_WIDTH,
} from './constants'

const App = () => {

    const [width, setWidth] = useState(SVG_WIDTH)
    const [height, setHeight] = useState(SVG_HEIGHT)
    const [selected, setSelected] = useState(null)
    const [size, setSize] = useState([window.innerWidth, window.innerHeight])

    const changeDims = ({width, height}) => {
        if (width  && !isNaN(parseInt(width)))  setWidth (parseInt(width))
        if (height && !isNaN(parseInt(height))) setHeight(parseInt(width))
    }

    useEffect(() => {
        const handleResize = () => {
            setSize([window.innerWidth, window.innerHeight])
            if (window.innerWidth <= 1600) {
                setWidth(800)
                setHeight(342.4)
            }
            if (window.innerWidth > 1600) {
                setWidth(SVG_WIDTH)
                setHeight(SVG_HEIGHT)
            }
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div className="App">

            <SvgWorld
                width={width}
                height={height}
                selected={selected}
                changeDims={changeDims}
                setWidth={setWidth}
                setHeight={setHeight}
            />

            <footer className={'main'}>
                <h4>References</h4>
                <ul>
                    <li>
                        <a href={'https://www.eiu.com/n/campaigns/democracy-index-2020/'}>{'https://www.eiu.com/n/campaigns/democracy-index-2020/'}</a>
                    </li>
                </ul>
            </footer>

        </div>
    )
}

export default App


