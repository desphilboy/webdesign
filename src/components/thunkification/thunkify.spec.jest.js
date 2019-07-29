import { thunkify } from './thunkify';

describe('thunkify', () => {
	const testDependencyMap = jest.fn((dispatch, getState) => ({
		someThingFromState: getState().someThingInState,
		doSomething: params => dispatch('ACTION', params),
		otherParam: 'otherParamValue'
	}));

	const testState = {
		someThingInState: 'testValueInState'
	};

	const mockGetState = jest.fn(() => testState);
	const mockDispatch = jest.fn();

	let testSideEffect;
	let myTestThunk;

	beforeEach(() => {
		jest.clearAllMocks();
		testSideEffect = jest.fn();
		myTestThunk = thunkify(testDependencyMap)(testSideEffect)({
			someParam: 'someParamValue'
		});
	});

	it('is a valid function', () => {
		expect(typeof myTestThunk).toBe('function');
	});

	it('calls mapping functions with state and dispatch mapped params on the logic', () => {
		myTestThunk(mockDispatch, mockGetState);
		expect(testDependencyMap).toHaveBeenCalledWith(mockDispatch, mockGetState);
	});

	it('calls sideEffect function with given params and getState and dispatch params', () => {
		myTestThunk(mockDispatch, mockGetState);
		expect(testSideEffect).toHaveBeenCalledWith({
			doSomething: expect.any(Function),
			someParam: 'someParamValue',
			someThingFromState: 'testValueInState',
			otherParam: 'otherParamValue'
		});
	});

	it('calls effect with other params if any other param exists', () => {
		myTestThunk = thunkify(testDependencyMap)(testSideEffect)({
			someParam: 'someParamValue'
		});
		myTestThunk(mockDispatch, mockGetState);

		expect(testSideEffect).toHaveBeenCalledWith({
			doSomething: expect.any(Function),
			someParam: 'someParamValue',
			someThingFromState: 'testValueInState',
			otherParam: 'otherParamValue'
		});
	});

	it('can pass params to dispatch correctly', () => {
		const thisTestEffect = ({ someParam, doSomething, someThingFromState, otherParam }) => {
			doSomething({ someParam, someThingFromState, otherParam });
		};
		myTestThunk = thunkify(testDependencyMap)(thisTestEffect)({
			someParam: 'someParamValue'
		});
		myTestThunk(mockDispatch, mockGetState);

		expect(mockDispatch).toHaveBeenCalledWith('ACTION', {
			someParam: 'someParamValue',
			otherParam: 'otherParamValue',
			someThingFromState: 'testValueInState'
		});
	});

	it('works with testDependencyMap functions invalid or empty', () => {
		myTestThunk = thunkify()(testSideEffect)({
			someParam: 'someParamValue'
		});
		myTestThunk(mockDispatch, mockGetState);
		expect(testSideEffect).toHaveBeenCalledWith({
			someParam: 'someParamValue'
		});
	});

	it('works with params invalid or empty', () => {
		myTestThunk = thunkify(testDependencyMap)(testSideEffect)();
		myTestThunk(mockDispatch, mockGetState);
		expect(testSideEffect).toHaveBeenCalledWith({
			doSomething: expect.any(Function),
			someThingFromState: 'testValueInState',
			otherParam: 'otherParamValue'
		});
	});

	it('works with dependencyMap being a simple object', () => {
		myTestThunk = thunkify({
			doSomething: jest.fn(),
			someThingFromState: 'testValueInState',
			otherParam: 'otherParamValue'
		})(testSideEffect)();
		myTestThunk(mockDispatch, mockGetState);

		expect(testSideEffect).toHaveBeenCalledWith({
			doSomething: expect.any(Function),
			someThingFromState: 'testValueInState',
			otherParam: 'otherParamValue'
		});
	});
});
