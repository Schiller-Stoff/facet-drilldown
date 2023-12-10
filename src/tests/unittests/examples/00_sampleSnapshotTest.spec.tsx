import React from "react";
import renderer from "react-test-renderer";
import App from "../../../components/App/Demo";

// NOT RECOMMENDED
// Example for a simple snapshot test
// WITHOUT USING ENYZME -> just Jest + Typescript

test("00_simpleSnapshotTest (no need for Enzyme): Snapshot tests are not recommended - Tests via Enzyme are better!", () => {
  // snapshots are created in first test run
  // then renderring is compared to previous generated snapshot
  // snapshot folder is mostly created in folder where testfiles are.
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
