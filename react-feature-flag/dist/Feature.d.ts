import { ReactNode } from "react";
import { IFeature, IFeatureManager } from "./FeatureContext";
export declare enum FeatureRequirement {
    All = "All",
    Any = "Any"
}
export type FeatureProps = {
    when: string | string[] | ((featureManager: IFeatureManager) => boolean);
    requirement?: FeatureRequirement;
    negate?: boolean;
    children: ReactNode;
};
export declare function FeatureProvider(props: {
    value: IFeature;
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function Feature(props: FeatureProps): import("react/jsx-runtime").JSX.Element;
