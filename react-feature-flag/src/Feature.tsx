import { ReactNode, useContext } from "react";
import { FeatureContext, IFeature, IFeatureManager, useFeatureFlag } from "./FeatureContext"

export enum FeatureRequirement {
    All = "All",
    Any = "Any"
};

export type FeatureProps = {
    when: string | string[] | ((featureManager:IFeatureManager) => boolean),
    requirement?: FeatureRequirement,
    negate?: boolean,
    children: ReactNode
}

export function FeatureProvider(props:{value: IFeature, children: ReactNode})
{
    return (
        <FeatureContext.Provider value={props.value}>
            {props.children}
        </FeatureContext.Provider>
    )
}
export function Feature(props:FeatureProps){
    const featurManager = useFeatureFlag();
    const shouldShow = () => {
        let result;
        if(typeof(props.when) === "function"){
            result = props.when(featurManager);
        }
        else {
            let features = typeof(props.when) === "string" ? [props.when] : [...props.when];
            let requirement = props.requirement || FeatureRequirement.All;
            result = requirement === FeatureRequirement.All 
                        ? features.every(x => featurManager.enabled(x))
                        : features.some(x => featurManager.enabled(x))
        }
        const shouldNegate = props.negate || false;
        return shouldNegate ? result === false : result === true;
    }
    return (
        <>
        {shouldShow() && <>{props.children}</>}
        </>
    )
}