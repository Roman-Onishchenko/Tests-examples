import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount } from "enzyme";
import Todo from "../app/UseStateComponent";

describe("UseStateComponent", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Todo />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("displays initial to-dos", () => {
    const wrapper = shallow(<Todo />);
    expect(wrapper.find("li")).toHaveLength(2);
  });

  it("renders correct title", () => {
    const props = {
      title: "Modal Title",
    };
    const wrapper = shallow(<Todo {...props} />);
    expect(wrapper.find("h2").props().children).toEqual("Modal Title");
  });

  it("should have the login disabled by default", () => {
    const wrapper = shallow(<Todo />);
    expect(wrapper.find('input[type="button"]').prop("disabled")).toBeTruthy();
  });

  it("should have proper props for email field", () => {
    const wrapper = shallow(<Todo />);
    expect(wrapper.find('button[type="submit"]').props()).toMatchObject({
      className: "btn btn-primary",
      children: "Add Task",
      onClick: expect.any(Function),
      type: "submit",
    });
  });

  it("adds a new item", () => {
    const wrapper = mount(<Todo />);
    wrapper.find('input[type="text"]').instance().value = "Fix failing test";
    expect(wrapper.find('input[type="text"]').instance().value).toEqual(
      "Fix failing test"
    );
    wrapper.find('[type="submit"]').simulate("click");
    expect(wrapper.find("li")).toHaveLength(3);
    expect(
      wrapper
        .find("li div span")
        .last()
        .text()
    ).toEqual("Fix failing test");
  });

  it("removes an item", () => {
    const wrapper = shallow(<Todo />);
    wrapper
      .find("li button")
      .first()
      .simulate("click");
    expect(wrapper.find("li")).toHaveLength(1);
    expect(wrapper.find("li span").map((item) => item.text())).toEqual([
      "Take out the trash",
    ]);
  });

  it("should set the password value on change event with trim", () => {
    const wrapper = shallow(<Todo />);
    wrapper.find('input[type="password"]').simulate("change", {
      target: {
        value: "somenewpassword  ",
      },
    });
    expect(wrapper.find('input[type="password"]').prop("value")).toEqual(
      "somenewpassword"
    );
  });
});
