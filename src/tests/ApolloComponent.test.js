import React from "react";
import { MockedProvider } from "@apollo/client/testing";
import { create, act } from "react-test-renderer";
import { GET_DOG_QUERY, Dog } from "../app/ApolloComponent";

const mocks = [
  {
    request: {
      query: GET_DOG_QUERY,
      variables: {
        name: "Buck",
      },
    },
    result: {
      data: {
        dog: { id: "1", name: "Buck", breed: "bulldog" },
      },
    },
  },
];

describe("ApolloComponent", () => {
  it("should show error UI", async () => {
    const dogMock = {
      request: {
        query: GET_DOG_QUERY,
        variables: { name: "Buck" },
      },
      error: new Error("aw shucks"),
    };

    let component;
    act(() => {
      component = create(
        <MockedProvider mocks={[dogMock]} addTypename={false}>
          <Dog name="Buck" />
        </MockedProvider>
      );
    });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0)); // wait for response
      const tree = component.toJSON();
      expect(tree.children).toContain("Error!");
    });
    await new Promise((resolve) => setTimeout(resolve, 0)); // wait for response

    const tree = component.toJSON();
    expect(tree.children).toContain("Error!");
  });

  it("should render dog", async () => {
    const dogMock = {
      request: {
        query: GET_DOG_QUERY,
        variables: { name: "Buck" },
      },
      result: {
        data: { dog: { id: 1, name: "Buck", breed: "poodle" } },
      },
    };

    let component;
    act(() => {
      component = create(
        <MockedProvider mocks={[dogMock]} addTypename={false}>
          <Dog name="Buck" />
        </MockedProvider>
      );
    });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0)); // wait for response
      const p = component.root.findByType("p");
      expect(p.children.join("")).toBe("Buck is a poodle");
    });
  });

  it("renders without error", () => {
    create(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Dog name="Buck" />
      </MockedProvider>
    );
  });

  it("should render loading state initially", () => {
    const component = create(
      <MockedProvider mocks={[]}>
        <Dog />
      </MockedProvider>
    );

    const tree = component.toJSON();
    expect(tree.children).toContain("Loading...");
  });
});
