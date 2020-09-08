import React from "react";
import { mount } from "enzyme";
import BarComponent from "../app/UseReducerComponent";

describe("UseReducerComponent", () => {
  it("should render as many divs as there are items", () => {
    const wrapper = mount(<BarComponent />);
    expect(wrapper.find("div")).toHaveLength(0);
    wrapper.find("button").simulate("click");
    expect(wrapper.find("div")).toHaveLength(3);
  });
});
