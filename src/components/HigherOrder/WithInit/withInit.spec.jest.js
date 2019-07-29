import React from 'react';
import withInit from './index.js';

describe('withInit', () => {
	const TestSpinner = () => <div>Test is in Progress!...</div>;
	const TestComponent = props => <div {...props}>The Base Component</div>;
	describe('Initial state', () => {
		it('is { showSpinner: true } if there is a spinner', () => {
			const WithInit = withInit(null, null, true, TestSpinner)(TestComponent);
			const wrapper = shallow(<WithInit />);

			expect(wrapper.state()).toEqual({ showSpinner: true });
		});

		it('is { showSpinner: false } if there is no spinner or invalid params', () => {
			const WithInit = withInit()(TestComponent);
			const wrapper = shallow(<WithInit />);

			expect(wrapper.state()).toEqual({ showSpinner: false });
		});
	});

	describe('Rendering', () => {
		it('passes all passover props and state to Spinner', () => {
			const WithInit = withInit(null, null, true, TestSpinner)(TestComponent);
			const wrapper = shallow(<WithInit valoo="aloo" />);

			expect(wrapper.props()).toEqual({ showSpinner: true, valoo: 'aloo' });
			expect(wrapper.dive().text()).toContain('Test is in Progress!...');
		});

		it('passes all passover props and state to BaseComponent', () => {
			const WithInit = withInit()(TestComponent);
			const wrapper = shallow(<WithInit valu="umbaloo" />);

			expect(wrapper.props()).toEqual({ showSpinner: false, valu: 'umbaloo' });
			expect(wrapper.dive().text()).toContain('The Base Component');
		});
	});

	describe('init stuff', () => {
		let init;
		let callInitLogic;
		let inProgressLogic;

		beforeEach(() => {
			init = jest.fn();
			callInitLogic = jest.fn();
			inProgressLogic = jest.fn();

			jest.clearAllMocks();
		});

		it('when init, callInitLogic, inProgressLogic are functions are called with props', () => {
			callInitLogic = jest.fn(() => true);
			const WithInit = withInit(init, callInitLogic, inProgressLogic, TestSpinner)(TestComponent);
			shallow(<WithInit someProp="someValue" />);

			expect(callInitLogic).toHaveBeenCalledWith({ someProp: 'someValue' });
			expect(init).toHaveBeenCalledWith({ someProp: 'someValue' });
			expect(inProgressLogic).toHaveBeenCalledWith({ someProp: 'someValue' });
		});

		it('when callInitLogic is a non-functions its boolean value is used', () => {
			callInitLogic = true;
			let WithInit = withInit(init, callInitLogic, inProgressLogic, TestSpinner)(TestComponent);
			shallow(<WithInit someProp="someValue" />);

			expect(init).toHaveBeenCalledWith({ someProp: 'someValue' });
			expect(inProgressLogic).toHaveBeenCalledWith({ someProp: 'someValue' });

			jest.clearAllMocks();

			callInitLogic = false;
			WithInit = withInit(init, callInitLogic, inProgressLogic, TestSpinner)(TestComponent);
			shallow(<WithInit someProp="someValue" />);

			expect(init).not.toHaveBeenCalled();
		});

		it('when inProgressLogic is non-functions its boolean value is used', () => {
			inProgressLogic = true;
			let WithInit = withInit(init, callInitLogic, inProgressLogic, TestSpinner)(TestComponent);
			let wrapper = shallow(<WithInit someProp="someValue" />);

			expect(wrapper.state()).toEqual({ showSpinner: true });

			jest.clearAllMocks();
			inProgressLogic = false;
			WithInit = withInit(init, callInitLogic, inProgressLogic, TestSpinner)(TestComponent);
			wrapper = shallow(<WithInit someProp="someValue" />);

			expect(wrapper.state()).toEqual({ showSpinner: false });
		});
	});

	describe('LifeCycle', () => {
		let init;
		let callInitLogic;
		let inProgressLogic;

		beforeEach(() => {
			init = jest.fn();
			callInitLogic = jest.fn();
			inProgressLogic = jest.fn();

			jest.clearAllMocks();
		});

		it('calls init and shows spinner if callInitLogic is true and not inProgress', () => {
			callInitLogic = jest.fn(() => true);
			inProgressLogic = jest.fn(() => false);
			const WithInit = withInit(init, callInitLogic, inProgressLogic, TestSpinner)(TestComponent);
			const wrapper = shallow(<WithInit someProp="someValue" />);

			expect(init).toHaveBeenCalledWith({ someProp: 'someValue' });
			expect(wrapper.state()).toEqual({ showSpinner: true });
			expect(wrapper.dive().text()).toContain('Test is in Progress!...');
		});

		it('does not call init but shows spinner if callInitLogic is false and inProgress', () => {
			callInitLogic = jest.fn(() => false);
			inProgressLogic = jest.fn(() => true);
			const WithInit = withInit(init, callInitLogic, inProgressLogic, TestSpinner)(TestComponent);
			const wrapper = shallow(<WithInit someProp="someValue" />);

			expect(init).not.toHaveBeenCalled();
			expect(wrapper.state()).toEqual({ showSpinner: true });
			expect(wrapper.dive().text()).toContain('Test is in Progress!...');
		});

		it('does not call init but shows spinner if both callInitLogic and inProgress are true', () => {
			callInitLogic = jest.fn(() => true);
			inProgressLogic = jest.fn(() => true);
			const WithInit = withInit(init, callInitLogic, inProgressLogic, TestSpinner)(TestComponent);
			const wrapper = shallow(<WithInit someProp="someValue" />);

			expect(init).not.toHaveBeenCalled();
			expect(wrapper.state()).toEqual({ showSpinner: true });
			expect(wrapper.dive().text()).toContain('Test is in Progress!...');
		});

		it('does not call init and shows the base component if both callInitLogic and inProgress are false', () => {
			callInitLogic = jest.fn(() => false);
			inProgressLogic = jest.fn(() => false);
			const WithInit = withInit(init, callInitLogic, inProgressLogic, TestSpinner)(TestComponent);
			const wrapper = shallow(<WithInit someProp="someValue" />);

			expect(init).not.toHaveBeenCalled();
			expect(wrapper.state()).toEqual({ showSpinner: false });
			expect(wrapper.dive().text()).not.toContain('Test is in Progress!...');
			expect(wrapper.dive().text()).toContain('The Base Component');
		});

		it('triggers re-evaluation when there is a props update', () => {
			let callTheInit = false;
			let isInProgress = false;
			callInitLogic = jest.fn(() => callTheInit);
			inProgressLogic = jest.fn(() => isInProgress);
			const WithInit = withInit(init, callInitLogic, inProgressLogic, TestSpinner)(TestComponent);
			const wrapper = shallow(<WithInit someProp="someValue" />);

			expect(init).not.toHaveBeenCalled();
			expect(wrapper.state()).toEqual({ showSpinner: false });
			expect(wrapper.dive().text()).not.toContain('Test is in Progress!...');
			expect(wrapper.dive().text()).toContain('The Base Component');

			jest.clearAllMocks();
			isInProgress = false;
			callTheInit = true;
			wrapper.setProps({ someProp: 'someOtherValue' });

			expect(init).toHaveBeenCalled();
			expect(wrapper.state()).toEqual({ showSpinner: true });
			expect(wrapper.dive().text()).toContain('Test is in Progress!...');
			expect(wrapper.dive().text()).not.toContain('The Base Component');

			jest.clearAllMocks();
			isInProgress = true;
			callTheInit = false;
			wrapper.setProps({ someProp: 'yetAnotherValue' });

			expect(init).not.toHaveBeenCalled();
			expect(wrapper.state()).toEqual({ showSpinner: true });
			expect(wrapper.dive().text()).toContain('Test is in Progress!...');
			expect(wrapper.dive().text()).not.toContain('The Base Component');

			jest.clearAllMocks();
			isInProgress = false;
			callTheInit = false;
			wrapper.setProps({ someProp: 'theFinalValue' });

			expect(init).not.toHaveBeenCalled();
			expect(wrapper.state()).toEqual({ showSpinner: false });
			expect(wrapper.dive().text()).not.toContain('Test is in Progress!...');
			expect(wrapper.dive().text()).toContain('The Base Component');
		});
	});
});
