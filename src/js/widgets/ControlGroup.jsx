import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
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
  font-size: 0.9em;
  outline: none;
  text-align: left;
  color: #444;
  font-family: inherit;
  transition: 150ms ease;
  ${(props) =>
    props.open &&
    css`
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05), 0 2px 12px rgba(0, 0, 0, 0.05);
    `}

  &:hover {
    color: ${colours.primary};
  }

  &:after {
    content: '';
    display: block;
    position: absolute;
    height: 1px;
    transition: 450ms ease;
    background: #eee;
    opacity: 0;
    bottom: 0;
    left: 0;
    right: 0;
    ${(props) =>
      !props.open &&
      css`
        opacity: 1;
      `}
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
    width: 0.62em;
    background: #ccc;
    top: calc(50% - 0.5px);
    left: calc(50% - 0.31em);
  }

  :after {
    transform-origin: center;
    transition: 150ms ease;
    transform: rotate(90deg) scaleX(1);
    ${(props) =>
      props.open &&
      css`
        transform: rotate(90deg) scaleX(0);
      `};
  }
`;

const Content = styled.div`
  overflow: hidden;
  transition: 450ms ease;
  padding: 0;
  background-color: #fbfbfb;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03) inset,
    0 2px 12px rgba(0, 0, 0, 0.05) inset;
`;

const ContentInner = styled.div`
  padding: 0.5rem 1rem;
`;

const ControlGroup = ({ className, title, children }) => {
  const [open, setOpen] = useState(true);
  const content = useRef();

  const toggleOpen = () => {
    if (open) {
      animate.slideUp(content.current);
    } else {
      animate.slideDown(content.current);
    }
    setOpen(!open);
  };

  return (
    <StyledControlGroup className={className}>
      <Heading onClick={toggleOpen.bind(this)} open={open}>
        {title}
        <Arrow open={open} />
      </Heading>
      <Content ref={content} open={open}>
        <ContentInner>{children}</ContentInner>
      </Content>
    </StyledControlGroup>
  );
};

ControlGroup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  title: PropTypes.string,
};

export default ControlGroup;
