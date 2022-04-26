import React from 'react';
import { observer } from 'mobx-react-lite';
import { outcomesStore } from './../store/outcomes';
import { subsStore } from './../store/regulars';
import { incomesStore } from '../store/income';

const QuickSum = observer(() => {
    const outcomes = outcomesStore.getTotal() + subsStore.getTotal();
    const incomes = incomesStore.getTotal();

    console.log('i was rerender!');

    return (
        <React.Fragment>
            <div>
               Outcomes: {outcomes}
            </div>
            <div>
                Incomes: {incomes}
            </div>
        </React.Fragment>

    );
});

export default QuickSum;