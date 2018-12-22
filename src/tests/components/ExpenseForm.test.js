import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import  ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';

test('should render the Expense form component correctly', () => {
    const wrapper = shallow(<ExpenseForm/>);
    expect(wrapper).toMatchSnapshot();
});

test('should render the Expense form component with data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[0]}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should render the error message on no form submission', () => {
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    expect(wrapper.state('err').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});

test('should set description on input change', () => {
    const wrapper = shallow(<ExpenseForm />);
    const value = 'Brand New Description';
    wrapper.find('input').first().simulate('change', {
        target: {value}
    });
    expect(wrapper.state('description')).toBe(value);
    expect(wrapper).toMatchSnapshot();
});

test('should set note on input change', () => {
    const wrapper = shallow(<ExpenseForm />);
    const value = 'This is a new note within the text area provided';
    wrapper.find('textarea').first().simulate('change', {
        target: {value}
    });
    expect(wrapper.state('note')).toBe(value);
    expect(wrapper).toMatchSnapshot();
});

test('should set amount on input change', () => {
    const wrapper = shallow(<ExpenseForm />);
    const value = '50.50';
    wrapper.find('input').at(1).simulate('change', {
        target: {value}
    });
    expect(wrapper.state('amount')).toBe(value);
    expect(wrapper).toMatchSnapshot();
});

test('should not set any amount if amount is not valid on input change', () => {
    const wrapper = shallow(<ExpenseForm />);
    const value = '50.5011';
    wrapper.find('input').at(1).simulate('change', {
        target: {value}
    });
    expect(wrapper.state('amount')).not.toBe(value);
    expect(wrapper).toMatchSnapshot();
});

test('should call onSubmit with valid form submission data', () => {
    const spy = jest.fn();
    const wrapper = shallow(<ExpenseForm expense={expenses[0]}
        onSubmit={spy}/>);

    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });

    expect(wrapper.state('err')).toBe('');
    expect(spy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        note: expenses[0].note,
        createdAt: expenses[0].createdAt,
        amount: expenses[0].amount
    });
});

test('should set new date on date change', () => {
    const wrapper = shallow(<ExpenseForm/>);
    const now = moment();
    wrapper.find('SingleDatePicker').prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);
})

test('should set calendar focus on change', () => {
    const wrapper = shallow(<ExpenseForm />);
    const focused = true;
    wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused })
    expect(wrapper.state('calendarFocused')).toBe(focused);
});

