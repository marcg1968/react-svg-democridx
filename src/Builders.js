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