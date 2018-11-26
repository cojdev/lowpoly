import { css } from 'styled-components';
import theme from '../common/theme';

export const Button = css`
    display: inline-block;
	text-decoration: none;
	background: transparent;
	border: 1px solid #ddd;
	padding: 0.6rem;
	color: ${theme.colours.primary};
	text-align: center;
	border-radius: 50px;
    width: 100%;
    
	font-size: 1em;
    
    :hover {
		background: #eee;
	}
    
    [disabled] {
		cursor: not-allowed;
	}
`;