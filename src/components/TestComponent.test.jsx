import React from 'react';
import { shallow } from 'enzyme';
import TestComponent from './TestComponent';

test('1+1=2', () => {
  expect(1 + 1).toBe(2);
});

test('says hi', () => {
  const wrapper = shallow(<TestComponent />);
  expect(wrapper.text()).toContain('hi');
});
