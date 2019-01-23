import React from 'react';
import styled from 'styled-components';
import ControlGroup from '../widgets/ControlGroup';
import { Checkbox, Label } from '../widgets/Fields';

const StyledControlGroup = styled(ControlGroup)`

`;

const PreviewWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1em;
`;

const Preview = styled.div`
    border-radius: 3px;
    position: relative;
    overflow: hidden;

    :after {
        display: block;
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        box-shadow: inset 0 2px 5px rgba(10,20,40,0.05);
        border-radius: 3px;
    }
    
`;

const Image = styled.img`
    display: block;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 200px;
`;

String.prototype.capitalise = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

export default class ImageControls extends React.Component {
    constructor() {
        super();

        this.state = {
            settings: null,
            value: '',
            useImage: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }

    componentDidMount() {
        const settings = this.props.settings;
        const useImage = this.props.useImage;

        this.setState({ settings: settings, useImage });
    }
    
    handleChange(e) {
        
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
    
            reader.onload = (e) => {
                this.props.setImage.call(this, e.target.result);
                this.setState({ settings: e.target.result });
            }
    
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    handleCheckboxChange(e) {
        this.props.setUseImage.call(this, e.target.checked);
        this.setState({ useImage: e.target.checked });
    }

    render() {

        const { settings, value, useImage } = this.state;

        return (
            <StyledControlGroup
                title="Image">

                {settings ? (
                    <PreviewWrap>
                        <Preview>
                            <Image src={settings} />
                        </Preview>
                    </PreviewWrap>
                ) : ''}

                <input type="file" value={value} onChange={this.handleChange} />
                <br/><br/>
                <Label><Checkbox checked={useImage} onChange={this.handleCheckboxChange} /> Use image</Label>
            </StyledControlGroup>
        );
    }
}