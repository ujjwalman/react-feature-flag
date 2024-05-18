import { createContext, useContext } from "react";
export const FeatureContext = createContext({});
export const isFeatureEnabled = (feature, features) => {
    return Object.keys(features).includes(feature) && features[feature] === true;
};
export function useFeatureFlag() {
    const features = useContext(FeatureContext);
    return {
        all: features,
        enabled: (feature) => isFeatureEnabled(feature, features)
    };
}
