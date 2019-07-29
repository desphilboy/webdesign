import React from "react";
import { getComponentName } from "./utils";

/* adds some more props on the component to perserve component purity and independence.
 * can be called on a component only once ( not cascadable )
 * Params:
 *  @extraProps is an mapping object or function retruning a mapping object which contains new params.
 *	if is a funcion, will be called with existing props.
 *  @BaseComponent is the component to be decorated with more props
 *  @props are the existing props passed by parent
 */

export function withProps(extraProps) {
	return BaseComponent =>
		// eslint-disable-next-line react/prefer-stateless-function
		class WithProps extends React.Component {
			static displayName = `withProps(${getComponentName(
				BaseComponent
			)})`;

			render() {
				return (
					<BaseComponent
						{...this.props}
						{...(typeof extraProps === "function"
							? extraProps(this.props)
							: extraProps)}
					/>
				);
			}
		};
}
