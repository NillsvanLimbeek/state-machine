import { Component, Show } from "solid-js";
import { useStateMachine } from "./context/state-machine";

export const Example: Component = () => {
  const [state, { transition }] = useStateMachine();

  return (
    <>
      <div class="w-full flex justify-center gap-4 p-5">
        <button
          class="btn btn-outline btn-info"
          onClick={() => transition("LOADING")}
        >
          Loading
        </button>
        <button
          class="btn btn-outline btn-success"
          onClick={() => transition("IDLE")}
        >
          Success
        </button>
        <button
          class="btn btn-outline btn-error"
          onClick={() => transition("ERROR")}
        >
          Error
        </button>
      </div>

      <h1 class="text-center text-xl my-5">Current State: {state.state}</h1>

      <Show when={state.error}>
        <div class="text-center text-red-500">{state.error}</div>
      </Show>
    </>
  );
};
