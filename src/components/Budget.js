import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, expenses, dispatch, currency } = useContext(AppContext);
    const [editableBudget, setEditableBudget] = useState(budget);

    const handleInputChange = (event) => {
        
        const totalExpenses = expenses.reduce((total, item) => {
            return (total += item.cost);
        }, 0);

        const newBudget = parseInt(event.target.value, 10);
        setEditableBudget(newBudget);

        // raise error message when budget is > 20000
        if (newBudget > 20000) {
            alert("The value can not be greater than 20,000");
        }

        // raise error message when budget ist smaller than spent
        if (newBudget < totalExpenses) {
            alert("You cannot reduce the budget value lower than the spending");
        }

        dispatch({
            type: 'SET_BUDGET',
            payload: newBudget,
        });
    };

    return (
        <div className='alert alert-secondary'>
            <div>
                <span>Budget: {currency} </span>
                <input 
                    min='0' 
                    max='20010'
                    id='budget'
                    defaultValue={budget} 
                    step='10'
                    type='number'
                    value={editableBudget}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    );
};

export default Budget;