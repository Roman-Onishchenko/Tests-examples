import React from "react";
import { shallow } from "enzyme";
import withConditional from "../app/HOC";

const Component = () => <div />;

describe("HOC", () => {
  it("should render the component only when the condition passes", () => {
    const ConditionalComponent = withConditional(Component);
    const wrapper = shallow(<ConditionalComponent condition={true} />);
    expect(wrapper.html()).not.toBe(null);
  });

  it("should return null when the condition fails", () => {
    const ConditionalComponent = withConditional(Component);
    const wrapper = shallow(<ConditionalComponent condition={false} />);
    expect(wrapper.html()).toBe(null);
  });
});
