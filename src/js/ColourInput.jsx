import React from 'react';
import styled, {css} from 'styled-components';

const StyledColourInput = styled.div`
    display: block;
    position: relative;
    margin: 0;
    
    flex-grow: 1;
`;

const Target = styled.div`
    height: 100%;
    width: 100%;
    transition: 150ms ease;
    cursor: pointer;
    outline: none;

    ${props => props.active && css`
        box-shadow:
            inset 0 0 0 3px #fff,
            inset 0 0 4px 3px rgba(0,0,0,0.4);
    `}
`;

const Picker = styled.div`
    position: absolute;
    right: 100%;
    bottom: 0;
    transition: 150ms ease;
    visibility: hidden;
    opacity: 0;
    
    *:focus > & {
        visibility: visible;
        opacity: 1;
    }
`;

export default class ColourInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showPicker: false,
            value: this.props.value
        }
    }

    handleChangeComplete(colour) {
        console.log(this.state.value);
        this.setState({ value: colour.hex}, this.props.handleChangeColour.bind(this, this.props.index, colour.hex));
    }
    
    render() {
        let showPicker = this.state.showPicker;
        // console.log(this.props.active);

        return (
            <StyledColourInput
                onBlur={() => { this.setState({ showPicker: false }) }}>
                <Target
                    active={this.props.active}
                    style={{backgroundColor: this.props.value}}
                    data-id={this.props.index}
                    onClick={this.props.setActiveColour.bind(this)} />
                {/* {showPicker ?
                
                : ''} */}
                <Picker>
                    {/* <ChromePicker
                        color={this.state.value}
                        style={{ display: this.showPicker ? 'block' : 'none'} }
                        onChangeComplete={this.handleChangeComplete.bind(this)}/> */}
                </Picker>
            </StyledColourInput>
        )
    }
}