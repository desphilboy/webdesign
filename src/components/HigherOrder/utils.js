export const isValidFn = fn => fn && typeof fn === "function";

export const getComponentName = Component =>
	Component.displayName || Component.name || "Component";
