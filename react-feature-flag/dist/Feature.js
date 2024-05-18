import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { FeatureContext, useFeatureFlag } from "./FeatureContext";
export var FeatureRequirement;
(function (FeatureRequirement) {
    FeatureRequirement["All"] = "All";
    FeatureRequirement["Any"] = "Any";
})(FeatureRequirement || (FeatureRequirement = {}));
;
export function FeatureProvider(props) {
    return (_jsx(FeatureContext.Provider, Object.assign({ value: props.value }, { children: props.children })));
}
export function Feature(props) {
    const featurManager = useFeatureFlag();
    const shouldShow = () => {
        let result;
        if (typeof (props.when) === "function") {
            result = props.when(featurManager);
        }
        else {
            let features = typeof (props.when) === "string" ? [props.when] : [...props.when];
            let requirement = props.requirement || FeatureRequirement.All;
            result = requirement === FeatureRequirement.All
                ? features.every(x => featurManager.enabled(x))
                : features.some(x => featurManager.enabled(x));
        }
        const shouldNegate = props.negate || false;
        return shouldNegate ? result === false : result === true;
    };
    return (_jsx(_Fragment, { children: shouldShow() && _jsx(_Fragment, { children: props.children }) }));
}
