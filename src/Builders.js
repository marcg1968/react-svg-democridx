// Builders.js

import React from 'react'
import styled, {
    keyframes,
    css,
} from 'styled-components'

export const DemoButton = styled.button.attrs(({type, disabled}) => ({
    type: type || 'button',
    disabled: disabled || false,
}))`
    background: ${(props) => props.theme.darkBlue};
    font-size: 1.1rem;
    border-radius: 0;
    border: 2px solid rgb(28, 61, 132);
    padding: 6px 24px;
    margin: 18px 0 0;
    
    &:focus {
        outline: none;
    }
    
    &:hover {
        color: crimson;
        border-radius: 5%;
        border: 3px solid crimson;
        padding: 5px 23px;
    }

`

export const DemoModalOuterContainer = styled.div`
    position: absolute;
    top: 25vh;
    width: 60vw;
    left: 20vw;
    z-index: 601;
`

export const DemoModalContainer = styled.div`
    font-weight: 900;
    background: wheat;
    padding: 1.6rem;
    border: 5px solid ${(props) => props.theme.weiss1};
`

const animatedDemoModal = keyframes`
    from {
        top: -100px;
        opacity: 0;
    }
    70% {
        opacity: 0.5;
    }
    to {
        top: 0;
        opacity: 1;
    }
`

const animatedDemoModalClosing = keyframes`
    from {
        top: 0;
        opacity: 1;
        height: auto;
    }
    to {
        top: -300px;
        top: -101vh;
        left: -1000px;
        left: -101vw;
        opacity: 0;
        height: 0;
    }
`

export const DemoModalOverlay = styled.div`
    /* position: absolute; */
    position: fixed;
    left: 0;
    background: rgba(25, 25, 25, .7);
    height: 100%;
    width: 100%;
    top: 0;
    top: -100px;
    opacity: 0;
    z-index: 600;
    
    animation-duration: 1300ms;
    animation-duration: ${props => props.closing ? 600 : 1300}ms,
    animation-timing-function: linear;
    animation-delay: 3s;
    animation-delay: ${props => props.closing ? 0 : 3}s;
    animation-iteration-count: 1;
    animation-direction: normal;
    animation-fill-mode: forwards;
    animation-play-state: running;
    /*animation-name: ${animatedDemoModal};*/
    animation-name: ${props => props.closing ? animatedDemoModalClosing : animatedDemoModal}; 
`

export const DemoHr = styled.hr`
    border: none;
    height: 1px;
    background-color: #333;
    margin: 2.5rem 0 .67rem 0;
`

export const HeatMapScaleOuter = styled.div`
    position: relative;
    margin: 0;
    height: 1.5rem;
    background: rgba(185, 185, 185, .5);
    display: flex;
`

export const HeatMapScaleInner = styled.div`
    background: #fff;
    height: 1.5rem;
    // height: 5.5rem;
    // width: 75%;
    width: ${props => props.rating ? (100 - (props.rating*100)) : 0 }%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    border-left: ${props => props.rating ? 1 : 0 }px solid #333;
    text-align: left;

    display: flex;
    justify-content: center;
    flex-direction: column;
    background: rgba(185, 185, 185, .5);
`

export const HeatmapContainer = styled.div.attrs(({ col }) => ({
    col: col || 0
}))`
    width: 100%;
    display: flex;
    flex-direction: row;
    background: transparent;
    ${({ col }) => col && `
        background: rgba(185, 185, 185, .5);
    `}
    
`

const heatmap = n => {
    // background: linear-gradient(to right, hsl(0, 100%, 50%), hsl(47, 100%, 50%) 100%);
    // background: linear-gradient(to right, hsl(48, 100%, 50%), hsl(95, 100%, 50%) 100%);
    // background: linear-gradient(to right, hsl(96, 100%, 50%), hsl(143, 100%, 50%) 100%);
    // background: linear-gradient(to right, hsl(144, 100%, 50%), hsl(195, 100%, 50%) 100%);
    // background: linear-gradient(to right, hsl(196, 100%, 50%), hsl(240, 100%, 50%) 100%);
    n = n || 0
    let start, end
    switch (n) {
        case 1: start = 0;   end = 47;  break;
        case 2: start = 48;  end = 95;  break;
        case 3: start = 96;  end = 143; break;
        case 4: start = 144; end = 195; break;
        case 5: start = 196; end = 240; break;
        case 6: start = 0;   end = 240; break;
        default:
        case 0:
            return 'linear-gradient(to right, rgb(255, 0, 0), rgb(255, 200, 0) 100%);'
    }
    return `linear-gradient(to right, hsl(${start}, 100%, 50%), hsl(${end}, 100%, 50%) 100%);`
} 

export const HeatmapCol = styled.div.attrs(({ col, border, hangright, borderleft, marginleft, bgcol }) => ({
    col: col || false,
    border: border || false,
    hangright: hangright || false,
    borderleft: borderleft || false,
    marginleft: marginleft || false,
    bgcol: bgcol || false,
}))`
    // border: ${props => props.col ? props.col : 0 }px solid crimson;
    flex: 1 1 0%;
    display: flex;
    flex-direction: column;
    background: rgba(185, 185, 185, .5);
    padding-bottom: .5rem;
    text-align: ${({hangright}) => hangright ? 'right' : 'left'};
    
    // background: ${props => props.col ? heatmap(props.col) : ''};
    ${({ col }) => col && `
         background: ${heatmap(col)};
    `}
    ${({ col }) => col < 0 && `
         background: transparent;
    `}
    ${({ border }) => border && `
        border: 1px solid #333;
    `}
    ${({ marginleft }) => marginleft && `
        // margin-left: 1rem;
        margin-left: ${marginleft}rem;
        // border: 1px solid cyan;
    `}
    ${({ borderleft }) => borderleft && `
        border-left: 1px solid #343536;
        // margin-left: 0.2rem;
        padding-left: 0.67rem;
    `}
`


