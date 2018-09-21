import styled from 'styled-components';

const backgroundColour = '#2311BF'
const bodyColour = '#9ADA84';
const borderWidth = 2

export const BodyStyle = styled.div`
	color: ${bodyColour};
	border-color: darken(${bodyColour}, 30%);	
	min-width: 300px;
	min-height: 400px;
	padding: 5px;
	border-width: ${borderWidth}px;
	border-style: solid;
	border-radius: ${2 * borderWidth}px;			
	background-color: ${backgroundColour};
`


