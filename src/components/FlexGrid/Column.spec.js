import React from "react";
import { mount, shallow } from "enzyme";
import FlexGridColumn from "./Column";
import { data as testdata, heights as testheights } from "./testdata";

describe("FlexGridColumn component", () => {
	let component,defaultProps;

	beforeAll(() => {
		FlexGridColumn.prototype.getRowHeight = jest.fn(() => {
			return 0;
		});
		defaultProps = {
			updateMaxHeights: jest.fn(),
			index: 0
		};
	});

	it("renders a header and rows totally the number of items in the array", () => {
		const props = {
			...defaultProps,
			data: testdata[0]
		}
		component = mount(<FlexGridColumn {...props} />);
		expect(component.find(".FlexGrid--main-column-header").exists()).toBe(true);
		expect(component.find(".FlexGrid--main-column-row").length).toBe(props.data.length-1);
		expect(component.find(".FlexGrid--main-column-row").at(0).text()).toBe(props.data[1]);
	});

	it("renders a header and rows with defined heights", () => {
		const props = {
			...defaultProps,
			data: testdata[0],
			rowHeights: testheights[0]
		}
		component = mount(<FlexGridColumn {...props} />);
		const header = component.find(".FlexGrid--main-column-header");
		expect(header.exists()).toBe(true);
		expect( header.props().style.height ).toBe(testheights[0][0]);

		const rows = component.find(".FlexGrid--main-column-row");
		expect(rows.length).toBe(props.data.length-1);
		expect(rows.at(0).text()).toBe(props.data[1]);
		expect(rows.at(0).props().style.height).toBe(testheights[0][1]);
	});
});
