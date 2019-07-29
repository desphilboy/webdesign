import React, { Component } from "react";
import { getComponentName, isValidFn } from "./utils.js";

export function withInit(init, callInitLogic, inProgressLogic, Spinner) {
	return BaseComponent =>
		class extends Component {
			static getDerivedStateFromProps(props, state) {
				const callInit = !!(
					callInitLogic &&
					(typeof callInitLogic === "function"
						? callInitLogic(props)
						: callInitLogic)
				);
				const inProgress = !!(isValidFn(inProgressLogic)
					? inProgressLogic(props)
					: inProgressLogic);

				if (callInit && !inProgress) {
					if (isValidFn(init)) {
						init(props);
					}
				}

				if (inProgress || callInit) {
					if (!state.showSpinner) {
						return { showSpinner: true };
					}
				}

				if (!callInit && !inProgress && state.showSpinner) {
					return { showSpinner: false };
				}

				return null;
			}

			static displayName = `withInit(${getComponentName(BaseComponent)})`;

			constructor(props) {
				super(props);

				this.state = { showSpinner: !!Spinner };
			}

			render() {
				return this.state.showSpinner ? (
					<Spinner {...this.state} {...this.props} />
				) : (
					<BaseComponent {...this.state} {...this.props} />
				);
			}
		};
}
