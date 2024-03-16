import { Component, Switch, Match } from "solid-js";

import { useStateMachine } from "./context/state-machine";

export const ExampleWithPromise: Component = () => {
  const [state, { transition }] = useStateMachine();

  function fetchRandomData(timeout = 1000): Promise<void> {
    transition("LOADING");

    return new Promise((resolve, reject) => {
      const shouldResolve = Math.random() >= 0.5; // 50% chance of resolving

      setTimeout(() => {
        if (shouldResolve) {
          resolve();
          transition("IDLE");
        } else {
          reject(new Error("Random error occurred!"));
          transition("ERROR");
        }
      }, timeout);
    });
  }
  return (
    <>
      <div class="w-full flex justify-center p-5">
        <button class="btn btn-outline" onclick={() => fetchRandomData()}>
          Fetch
        </button>
      </div>

      <Switch>
        <Match when={state.state === "LOADING"}>
          <h2 class="text-center text-blue-500">Loading...</h2>
        </Match>

        <Match when={state.state === "ERROR"}>
          <h2 class="text-center text-red-500">Error...</h2>
        </Match>

        <Match when={state.state === "IDLE"}>
          <h2 class="text-center text-green-500">Yay!</h2>
        </Match>
      </Switch>
    </>
  );
};
