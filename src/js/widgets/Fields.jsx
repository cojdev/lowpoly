import styled, { css } from 'styled-components';
import theme from '../common/theme';
import { hexToRgb } from '../common/colour';

const field = css`
    display: block;
    width: 100%;
    height: 2rem;
    font-family: inherit;
    font-size: .9em;
    line-height: 2rem;
    padding: 0 1ch;
    background: #fff;
    border: none;
    margin-bottom: .75rem;
    border-radius: 100px;
    transition: 150ms ease;

    :focus {
        outline: none;
        box-shadow: inset 0 0 0 2px ${theme.colours.primary}, 0 0 0 4px rgba(${hexToRgb(theme.colours.primary).join(', ')}, .1);
    }
`;

export const TextField = styled.input.attrs({ type: 'text' })`
    ${field};
`;

export const NumberField = styled.input.attrs({ type: 'number' })`
    ${field};
`;

export const Dropdown = styled.select`
    ${field};
`;

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
    
`;

export const RangeSlider = styled.input.attrs({ type: 'range' })`
    width: 100%;
`;

export const Label = styled.label`
    color: #888;
	display: block;
	margin: .5em 0 0;
    font-weight: 500;
    font-size: .8em;
    font-weight: bold;
`;