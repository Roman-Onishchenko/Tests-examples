import React from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import App from "../app/UseEffectMountComponent";

describe("UseEffectMountComponent", () => {
  test("should fetch data on mount", () => {
    let component;
    act(() => {
      component = mount(<App />);
    });

    expect(component.text()).toBe("Hi Yusinto Ngadiman React Junkie!");
  });
});
