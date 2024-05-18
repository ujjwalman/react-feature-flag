/// <reference types="react" />
export type IFeature = {
    [key: string]: boolean;
};
export type IFeatureManager = {
    enabled: (feature: string) => boolean;
    all: IFeature;
};
export declare const FeatureContext: import("react").Context<IFeature>;
export declare const isFeatureEnabled: (feature: string, features: IFeature) => boolean;
export declare function useFeatureFlag(): IFeatureManager;
