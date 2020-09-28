import React from "react";
import { mount } from "enzyme";
import FlexGrid from "./";
import FlexGridColumn from "./Column";
import { data as testdata } from "./testdata";

describe("FlexGrid component", () => {
	let component;

	beforeAll(() => {
		FlexGridColumn.prototype.getRowHeight = jest.fn(() => {
			return 0;
		});

		FlexGridColumn.prototype.getContainerWidth = jest.fn(() => {
			return 0;
		});
		FlexGridColumn.prototype.getColumnWidth = jest.fn(() => {
			return 0;
		});
	});

	describe("when data is supplied", () => {
		it("renders a column for each datapoint", () => {
			component = mount(<FlexGrid data={testdata} />);
			expect(component.find(".FlexGrid--container-column").length).toBe(testdata.length);
		});
	});
});
