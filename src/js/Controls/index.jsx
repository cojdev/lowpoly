import React from 'react';
import styled, { css } from 'styled-components';
import theme from '../common/theme';

import DimensionControls from './DimensionControls';
import GeometryControls from './GeometryControls';
import ColourControls from './ColourControls';
import Header from '../Header';
import ControlGroup from '../widgets/ControlGroup';
import { CallToAction } from '../widgets/CallToAction';
import ImageControls from './ImageControls';
import { Button } from '../widgets/Button';
import PaletteControls from './PaletteControls';

const Container = styled.section`
    padding: 0;
    display: flex;

    @media screen and (min-width: 800px) {
        margin-left:  calc(100% - ${theme.controls.width});   
    }
`;

const ButtonWrap = styled.div`
    width: 5rem;
    padding: 1rem;
    display: flex;
    align-items: flex-end;
    @media screen and (min-width: 800px) {
        display: none;
    }
`;

const ToggleButton = styled.button`
    display: block;
    height: 3rem;
    width: 3rem;
    padding: 0rem;
    margin: 0;
    border: none;
    border-radius: 100px;
    box-shadow: ${theme.shadow};
    background-color: #fff;
    cursor: pointer;
    transition: ${theme.controls.transition};

    img {
        width: 1rem;
        vertical-align: middle;
        height: auto;
    }

    ${props => props.open && css`
        transform: translateX(62%);
    `}
`;

const StyledControls = styled.section`
    min-height: 100vh;
    color: #444;
    background-color: #fff;
    width: ${theme.controls.width};
    max-width: calc(100vw - 2.5rem);
    padding: 0;
	box-shadow:  0 10px 25px rgba(0,0,0,0.05);
    overflow-y: auto;
    z-index: 2;
    
    @media screen and (min-width: 800px) {
        max-width: 100%;
        box-shadow: none;
    }
`;

const DownloadButton = styled.a`
    ${Button};
`;

const Footer = styled.footer`
	color: #888;
	width: 100%;
	font-size: .8em;
    text-align: center;
    padding: 2em 0;
    border-top: 2px solid #eee;

    ul {
		margin: 0;
		padding: 0;
	}
    
	li {
		display: inline;
    }
    
	li:not(:last-child) {
		:after {
			content: " •";
			margin: 0 .5rem;
			color: #ddd;
		}
    }
`;

export default class Controls extends React.Component {

    constructor(props) {
        super(props);
        this.setDimensions = props.setDimensions.bind(this);
        this.setColours = props.setColours.bind(this);
        this.setImage = props.setImage.bind(this);
        this.setUseImage = props.setUseImage.bind(this);
        this.setGeometry = props.setGeometry.bind(this);
    }

    render() {
        const { settings, presets } = this.props;
        
        const setDimensions = this.setDimensions;
        const setColours = this.setColours;
        const setImage = this.setImage;
        const setUseImage = this.setUseImage;
        const setGeometry = this.setGeometry;

        return (
            <Container className={this.props.className}>
                <ButtonWrap>
                    <ToggleButton
                        onClick={this.props.toggleControls}
                        open={this.props.open}>
                        <img src={this.props.open ? 'assets/x.svg' : 'assets/menu.svg'} />    
                    </ToggleButton>
                </ButtonWrap>
                <StyledControls>
                    <Header />
                    <DimensionControls
                        settings={settings.dimensions}
                        presets={presets}
                        setDimensions={setDimensions} />
                    <ImageControls
                        settings={settings.image}
                        useImage={settings.useImage}
                        setImage={setImage}
                        setUseImage={setUseImage} />
                    <GeometryControls
                        settings={settings.geometry}
                        setGeometry={setGeometry} />
                    <ColourControls
                        settings={settings.colour}
                        setColours={setColours} />
                    <PaletteControls
                        setColours={setColours} />
                    <ControlGroup title="Export">
                        <DownloadButton
                            href={this.props.output}
                            download="lowpoly.png">Download PNG</DownloadButton>
                    </ControlGroup>
                    <Footer>
                        by <a href="https://cojdev.github.io" target="_top">Charles Ojukwu</a>
                        <ul>
                            <li><a href="https://github.com/cojdev">Github</a></li>
                            <li><a href="https://codepen.io/cojdev">CodePen</a></li>
                        </ul>
                    </Footer>
                </StyledControls>
            </Container>
        );
    }
}