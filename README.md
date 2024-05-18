# Feature flag

## Usage

Index.tsx

```
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { FeatureProvider, IFeature } from 'react-feature-flag';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const features: IFeature = {
  "FeatureA": true,
  "FeatureB": false
};

root.render(
  <React.StrictMode>
    <FeatureProvider value={features}>
      <App />
    </FeatureProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

```

App.tsx

```
import './App.css';
import { Feature, FeatureRequirement, useFeatureFlag } from 'react-feature-flag';

function App() {
  const featureManager = useFeatureFlag();
  if(featureManager.enabled("FeatureA")) {
    // do something
  }
  return (
    <div>
      <Feature when={"FeatureA"}>
        <p>This is feature A</p>
      </Feature>

      <Feature when={"FeatureB"} >
        <p>This is feature B</p>
      </Feature>

      <Feature when={["FeatureA", "FeatureB"]} requirement={FeatureRequirement.Any} negate={true}>
        <p>Negation sample</p>
      </Feature>

      <Feature when = {(fm) => fm.enabled("FeatureA")}>
        <p>Feature A is enabled</p>
      </Feature>
    </div>
  );
}

export default App;


```


### FeatureProps

| Property    | Type | Description |
| -------- | ------- | ----------- |
| when  | string \| string[] \| function: (featureManager) => boolean | if the value is function then requirement is ignored
| requirement | FeatureRequirement.All \| FeatureRequirement.Any  |
| negate    | boolean    | Negate the condition provided in `when`


## FeatureManager props


| Property    | Type | Description |
| -------- | ------- | ----------- |
| all  | IFeature : object | Provides all feature passed from provider
| enabled | function: (feature:string) => boolean | Takes feature name as argument and returns true if it is enabled else false