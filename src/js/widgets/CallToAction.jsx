import { css } from 'styled-components';
import theme from '../common/theme';

export const CallToAction = css`
    display: inline-block;
	text-decoration: none;
	background: linear-gradient(to bottom left, ${theme.colours.primary}, ${theme.colours.secondary});
	border: none;
	padding: 0.6rem;
	color: #fff;
	text-align: center;
	border-radius: 100px;
    width: 100%;
    
	font-size: 1em;
    
    :hover {
		/* background: #eee; */
	}
    
    [disabled] {
		cursor: not-allowed;
	}
`;