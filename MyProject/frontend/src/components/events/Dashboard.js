import React, { Fragment } from 'react';
import ChooseMovies from './ChooseMovies'
import Form from './Form';
import Events from './Events';

export default function Dashboard() {
    return (
        <Fragment>
            <Form />
            <Events />
            <ChooseMovies />
        </Fragment>
    )
}
