import React from "react";

// custom hook
const useTextField = (name) => {
  const [value, setValue] = React.useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    name,
    value,
    onChange,
    placeholder: name,
  };
};

// usage
// const InputDemoWithHooks = () => {
//   const nameField = useTextField("name");
//   return <input type="text" {...nameField} />;
// };

export default useTextField;
