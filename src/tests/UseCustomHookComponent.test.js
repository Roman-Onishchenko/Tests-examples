import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import useTextField from "../app/UseCustomHookComponent";

// test hook - it is reusable for custom hooks
const TestHook = ({ callback }) => {
  callback();
  return null;
};

const testHook = (callback) => {
  mount(<TestHook callback={callback} />);
};

// test custom hook
let nameField;
beforeEach(() => {
  testHook(() => {
    nameField = useTextField("name");
  });
});

describe("useTextField", () => {
  test("should have an onChange function", () => {
    expect(nameField.onChange).toBeInstanceOf(Function);
  });

  test("should have correct name", () => {
    expect(nameField.name).toBe("name");
  });

  test("should update the value when onChange is called", () => {
    act(() => {
      nameField.onChange({ target: { value: "nitin" } });
    });
    expect(nameField.value).toBe("nitin");
  });
});
