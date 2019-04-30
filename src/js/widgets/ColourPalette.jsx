import React from 'react';
import styled from 'styled-components';

const Palette = styled.div`
    display: flex;
    position: relative;
    margin: 0 0 1em;
    cursor: pointer;
    outline: none;
    height: 20px;
    border-radius: 3px;
    overflow: hidden;

    :last-child {
        margin: 0;
    }
`;

const Colour = styled.div`
    flex-grow: 1;
    height: 100%;
    background-color: ${props => props.background || '#ccc'};
`;

export default function ColourPalette(props) {

    return (
        <Palette
            onClick={props.handleSetPalette.bind(this, props.colours)}>
            {props.colours.map((item, index) => 
                <Colour
                    key={index}
                    background={item} />)}
        </Palette>
    );
}