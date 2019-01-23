import React from 'react';
import styled, { css } from 'styled-components';
import animate from '../common/animate';

const StyledControlGroup = styled.section`
    padding: 0 1rem;
    /* border-bottom: 1px solid #ddd; */
`;

const Heading = styled.button`
    line-height: 3;
    font-weight: bold;
    position: relative;
    background: transparent;
    display: block;
    width: 100%;
    border: none;
    cursor: pointer;
    padding: 0;
    margin: 0;
    font-size: 1em;
    outline: none;
    text-align: left;
    color: #444;
    font-family: inherit;
`;

const Arrow = styled.div`
    position: absolute;
    right: 0;
    display: block;
    top: 0;
    bottom: 0;

    :before, :after {
        display: block;
        position: absolute;
        content: '';
        height: 2px;
        width: .62em;
        background: #ccc;
        top: 50%;
        right: 0;
    }

    :after {
        transform-origin: center;
        transition: 150ms ease;
        transform: rotate(90deg) scaleX(1);
        ${props => props.open && css`
            transform: rotate(90deg) scaleX(0);
        `};
    }
`;

const Content = styled.div`
    overflow: hidden;
    transition: 450ms ease;
`;

const ContentInner = styled.div`
    padding-bottom: 1rem;
`;

export default class ControlGroup extends React.Component {
    constructor() {
        super();

        this.state = {
            open: true,
        };

        this.content = React.createRef();
    }

    toggleOpen() {
        this.state.open ? animate.slideUp(this.content.current) : animate.slideDown(this.content.current);
        this.setState({ open: !this.state.open });
    }

    render() {
        return (
            <StyledControlGroup className={this.props.className}>
                <Heading
                onClick={this.toggleOpen.bind(this)}
                    open={this.state.open}>
                    {this.props.title}
                    <Arrow open={this.state.open} />
                </Heading>
                    {this.state.open ?
                        '' :
                        ''}
                <Content ref={this.content}><ContentInner>{this.props.children}</ContentInner></Content>
            </StyledControlGroup>
        );
    }
}