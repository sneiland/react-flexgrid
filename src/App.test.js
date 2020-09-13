import React from 'react';
import { mount } from 'enzyme';
import App from './App';

/*
import { render } from '@testing-library/react';
test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
*/

describe("test",()=>{

	let component;

	xit("hello",()=>{
		component = mount(<App/>);

		console.log( component.debug() );
		expect(true).toBe(true);
	})
});