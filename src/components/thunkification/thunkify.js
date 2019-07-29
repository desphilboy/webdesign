/**
 * @param { object or function }	dependencyMap	maps dependencies into sideEffec parameter names. If it is
 * a function will be called with Redux state and dispatch if non-function object will be added to
 * parameters as is
 *
 * @param { function }		sideEffect		is a function that does the actual work. It will be called
 * with all the parameters including mapped ones and the third param.
 *
 * @param { object }		params 			additional parameters passed by caller of the effect. the params
 * will be passed to the sideEffect funcion as is
 *
 * @params { function }		dispatch and getState this will be provided by thunk middleware from Redux store
 */
export const thunkify = dependencyMap => sideEffect => params => (dispatch, getState) =>
	sideEffect({
		...params,
		...(typeof dependencyMap === 'function' ? dependencyMap(dispatch, getState) : dependencyMap)
	});
