import React from 'react';
import { compose } from 'redux';
import { withProps } from './withProps';

describe('withProps', () => {
	const testBaseComponent = () => <div />;
	let WithProps;
	let extraProps;
	let wrapper;

	it('calls extraProps with props if it is a function', () => {
		extraProps = jest.fn();
		WithProps = withProps(extraProps)(testBaseComponent);
		wrapper = shallow(<WithProps prop="val" />);

		expect(extraProps).toHaveBeenCalledWith({ prop: 'val' });
	});

	it('calls extraProps with props if it is a function', () => {
		extraProps = jest.fn(props => ({ somethingCalculatedUsingProps: `something calculated using ${props.prop}` }));
		WithProps = withProps(extraProps)(testBaseComponent);
		wrapper = shallow(<WithProps prop="val" />);

		expect(wrapper.props()).toEqual({
			prop: 'val',
			somethingCalculatedUsingProps: 'something calculated using val'
		});
	});

	it('spreads extraProps on props if it is an object', () => {
		extraProps = { extraProp: 'extraPropVal' };
		WithProps = withProps(extraProps)(testBaseComponent);
		wrapper = shallow(<WithProps prop="val" />);

		expect(wrapper.props()).toEqual({ prop: 'val', extraProp: 'extraPropVal' });
	});

	it('can be used with compose', () => {
		extraProps = { extraProp: 'extraPropVal' };
		WithProps = compose(withProps(extraProps))(testBaseComponent);
		wrapper = shallow(<WithProps prop="val" />);

		expect(wrapper.props()).toEqual({ prop: 'val', extraProp: 'extraPropVal' });

		extraProps = jest.fn();
		WithProps = compose(withProps(extraProps))(testBaseComponent);
		wrapper = shallow(<WithProps prop="val" />);

		expect(extraProps).toHaveBeenCalledWith({ prop: 'val' });
	});

	it('is not cascadable and must be last one to call', () => {
		extraProps = { extraProp: 'extraPropVal' };
		const extraProps2 = { extraProp2: 'extraPropVal2' };
		WithProps = compose(
			withProps(extraProps),
			withProps(extraProps2),
			withProps({ shaloo: 'galoo' })
		)(testBaseComponent);
		wrapper = shallow(<WithProps prop="val" />);

		expect(wrapper.props()).toEqual({ prop: 'val', extraProp: 'extraPropVal' });
	});
});
