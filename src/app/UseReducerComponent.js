import React, { useReducer } from "react";

export function FooReducer(state, action) {
  switch (action.type) {
    case "update": {
      return action.newState;
    }
    // ... other actions
    default:
      throw new Error("Unknown action type");
  }
}

export default function BarComponent() {
  const [state, dispatch] = useReducer(FooReducer, []);

  const handleUpdate = () => dispatch({ type: "update", newState: [1, 2, 3] });

  return (
    <>
      {state.map((item, i) => (
        <div key={i} />
      ))}
      <button onClick={handleUpdate}>Click to update state</button>
    </>
  );
}
