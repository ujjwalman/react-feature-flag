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
