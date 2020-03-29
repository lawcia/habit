import React from 'react'
import AddHabit from './AddHabit'
import { shallow } from 'enzyme'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });


describe('renders without crushing', () => {
    it('Has a nav element', () => {
        const component = shallow(
            <AddHabit />
        )
        expect(component.exists('Habit')).toBe(true)

    })
})