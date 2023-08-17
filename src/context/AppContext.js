import React, { createContext, useReducer, useMemo } from 'react';

export const AppReducer = (state, action) => {

    switch (action.type) {
        case 'ADD_EXPENSE':
            const updatedExpensesAdd = state.expenses.map(expense =>
                expense.name === action.payload.name
                    ? { ...expense, cost: expense.cost + action.payload.cost }
                    : expense
            );
            return {
                ...state,
                expenses: updatedExpensesAdd
            };

        case 'RED_EXPENSE':
            const updatedExpensesRed = state.expenses.map(expense =>
                expense.name === action.payload.name && expense.cost >= action.payload.cost
                    ? { ...expense, cost: expense.cost - action.payload.cost }
                    : expense
            );
            return {
                ...state,
                expenses: updatedExpensesRed
            };

        case 'DELETE_EXPENSE':
            const updatedExpensesDelete = state.expenses.map(expense =>
                expense.name === action.payload
                    ? { ...expense, cost: 0 }  // set cost to 0 instead of deleting
                    : expense
            );
            return {
                ...state,
                expenses: updatedExpensesDelete
            };
        case 'SET_BUDGET':
            action.type = "DONE";
            state.budget = action.payload;

            return {
                ...state,
            };
        case 'CHG_CURRENCY':
            action.type = "DONE";
            state.currency = action.payload;
            return {
                ...state
            }

        default:
            return state;
    }
};

// 1. Sets the initial state when the app loads
const initialState = {
    budget: 2000,
    expenses: [
        { id: "Marketing", name: 'Marketing', cost: 50 },
        { id: "Finance", name: 'Finance', cost: 300 },
        { id: "Sales", name: 'Sales', cost: 70 },
        { id: "Human Resource", name: 'Human Resource', cost: 40 },
        { id: "IT", name: 'IT', cost: 500 },
    ],
    currency: '$'
};

export const AppContext = createContext();

export const AppProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    const remaining = useMemo(() => {
        if (state.expenses) {
            const totalExpenses = state.expenses.reduce((total, item) => {
                return (total += item.cost);
            }, 0);
            return state.budget - totalExpenses;
        }
        return 0;
    }, [state.expenses, state.budget]);

    const contextValue = useMemo(() => ({
        expenses: state.expenses,
        budget: state.budget,
        remaining: remaining,
        dispatch,
        currency: state.currency
    }), [state.expenses, state.budget, remaining, dispatch, state.currency]);

    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    );
};
