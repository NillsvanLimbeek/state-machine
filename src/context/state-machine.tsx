import { ParentComponent, createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";

// STATE MACHINE TYPES
type State = "IDLE" | "LOADING" | "ERROR";

interface Transitions {
  [key: string]: string;
}

interface StateTransitions {
  [key: string]: Transitions;
}

// STATE MACHINE CONSTANTS
const transitions: StateTransitions = {
  IDLE: { LOADING: "LOADING" },
  LOADING: { ERROR: "ERROR", IDLE: "IDLE" },
  ERROR: {},
};

// CONTEXT TYPES
type ContextState = {
  state: State;
  error?: string;
};

type ContextValue = [
  state: ContextState,
  actions: {
    transition: (event: State) => void;
  },
];

// CONTEXT CONSTANTS
export const defaultState: ContextState = {
  state: "IDLE",
};

// CONTEXT
export const Context = createContext<ContextValue>([
  defaultState,
  {
    transition: () => undefined,
  },
]);

export const StateMachineProvider: ParentComponent<ContextState> = (props) => {
  const [store, setStore] = createStore<ContextState>({
    state: props.state ?? defaultState.state,
  });

  function isValidTransition(event: State): boolean {
    return !!transitions[store.state][event];
  }

  function transition(event: State): void {
    if (!isValidTransition(event)) {
      const error = `Event '${event}' not allowed in current state '${store.state}'.`;

      // optional for demo purposes
      setStore("error", error);
      throw new Error(error);
    }

    // optional for demo purposes
    setStore("error", undefined);
    setStore("state", event);
  }

  return (
    <Context.Provider value={[store, { transition }]}>
      {props.children}
    </Context.Provider>
  );
};

export const useStateMachine = () => useContext(Context);
