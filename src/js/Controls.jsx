import React from 'react';
import styled from 'styled-components';
import theme from './common/theme';

import DimensionControls from './DimensionControls';
import GeometryControls from './GeometryControls';
import ColourControls from './ColourControls';
import { Button } from './widgets/Button';
import Header from './Header';
import ControlGroup from './widgets/ControlGroup';

const StyledControls = styled.section`
    min-height: 100vh;
    margin-left:  calc(100% - ${theme.controls.width});
    color: #444;
	width: ${theme.controls.width};
	background: #f8f8f8;
    padding: 0;
	box-shadow:  0 10px 25px rgba(0,0,0,0.05);
    overflow-y: auto;

    h3 {
		padding: .5rem 1rem;
		margin: 0 0;
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
    padding: 1em 0;

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
			color: #888;
		}
    }
`;

export default class Controls extends React.Component {
    // handleSaveImage() {

    // }

    render() {
        let settings = this.props.settings;
        let presets = this.props.presets;
        let setDimensions = this.props.setDimensions.bind(this);
        let setColours = this.props.setColours.bind(this);

        return (
            <StyledControls>
                <Header />
                    <DimensionControls
                        settings={settings.dimensions}
                        presets={presets}
                        setDimensions={setDimensions} />
                    <GeometryControls
                        settings={settings.geometry}
                        setGeometry={this.props.setGeometry.bind(this)} />
                    <ColourControls
                        settings={settings.colour}
                        setColours={setColours} />
                    <ControlGroup title="Export">
                        <DownloadButton
                            href={this.props.output}
                            download="lowpoly.png">Download Image</DownloadButton>
                    </ControlGroup>
                    <Footer>
                    by <a href="https://cojdev.github.io" target="_top">Charles Ojukwu</a>
                    <ul>
                        <li><a href="https://github.com/cojdev">Github</a></li>
                        <li><a href="https://codepen.io/cojdev">CodePen</a></li>
                    </ul>
                </Footer>
            </StyledControls>
        );
    }
}