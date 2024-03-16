import { type Component } from "solid-js";

import { StateMachineProvider, defaultState } from "./context/state-machine";

import { Example } from "./Example";
import { ExampleWithPromise } from "./ExampleWithPromise";

const App: Component = () => {
  return (
    <StateMachineProvider {...defaultState}>
      {/* <Example /> */}
      <ExampleWithPromise />
    </StateMachineProvider>
  );
};

export default App;
