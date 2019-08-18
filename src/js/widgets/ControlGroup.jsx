import React from 'react';
import styled, { css } from 'styled-components';
import animate from '../Libraries/Animate';
import { colours } from '../common/theme';

const StyledControlGroup = styled.section``;

const Heading = styled.button`
  line-height: 2.4;
  font-weight: bold;
  position: relative;
  background: transparent;
  display: block;
  width: 100%;
  border: none;
  cursor: pointer;
  padding: 0 1rem;
  margin: 0;
  font-size: .9em;
  outline: none;
  text-align: left;
  color: #444;
  font-family: inherit;
  transition: 150ms ease;
  ${props => props.open && css`
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  `}
  
  &:hover {
    color: ${colours.primary};
  }
`;

const Arrow = styled.div`
  position: absolute;
  right: 1rem;
  display: block;
  top: 50%;
  transform: translateY(-50%);
  bottom: 0;
  height: 1rem;
  width: 1rem;
  border-radius: 100px;
  border: 1px solid #ccc;

  :before,
  :after {
    display: block;
    position: absolute;
    content: '';
    height: 1px;
    width: .62em;
    background: #ccc;
    top: calc(50% - .5px);
    left: calc(50% - .31em);
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
  padding: 0;
  background-color: #fbfbfb;
`;

const ContentInner = styled.div`
  padding: .5rem 1rem;
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
    if (this.state.open) {
      animate.slideUp(this.content.current);
    } else {
      animate.slideDown(this.content.current);
    }
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
        {this.state.open
          ? ''
          : ''}
        <Content ref={this.content}><ContentInner>{this.props.children}</ContentInner></Content>
      </StyledControlGroup>
    );
  }
}
