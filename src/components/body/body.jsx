import React from  'react';
import PropTypes from 'prop-types'
import { BodyStyle } from './body.style';


export const Body = (props) => (
    <BodyStyle className='webdesign-body'>
		<h2>{props.title}</h2>
	</BodyStyle>
);


Body.propTypes = {
    title: PropTypes.string.isRequired,
};