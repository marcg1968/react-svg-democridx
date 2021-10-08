

import React from 'react'
import {
    DemoButton,
    DemoModalOuterContainer,
    DemoModalOverlay,
    DemoModalContainer,
} from './Builders'

export default class DemoModal extends React.Component {
  
    onClose = e => {
        this.props.onClose && this.props.onClose(e)
    }

    render() {

        if (!this.props.show) {
            //return null
        }
        //const closing = !this.props.show ? true : false 
        
        return (
            <DemoModalOverlay closing={!this.props.show}>
                <DemoModalOuterContainer id="demoModalOuterContainer">
                    <DemoModalContainer id="demoModalContainer">
                        <div className="demoModal" id="demoModal">
                            <h2>Demo Website</h2>
                            <div>{this.props.children}</div>
                            <div>
                                <DemoButton onClick={this.onClose}>
                                    close
                                </DemoButton>
                            </div>
                        </div>
                    </DemoModalContainer>
                </DemoModalOuterContainer>
            </DemoModalOverlay>
        )
    }
}
