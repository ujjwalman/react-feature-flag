import { createContext, useContext } from "react";



export type IFeature = {
    [key:string] : boolean
};

export type IFeatureManager = {
    enabled: (feature:string) => boolean,
    all: IFeature
}

export const FeatureContext = createContext<IFeature>({});

export const isFeatureEnabled = (feature:string, features:IFeature) => {
    return Object.keys(features).includes(feature) && features[feature] === true;
}

export function useFeatureFlag() : IFeatureManager {
    const features = useContext(FeatureContext);
    return {
        all: features,
        enabled: (feature:string) => isFeatureEnabled(feature, features)
    }
}