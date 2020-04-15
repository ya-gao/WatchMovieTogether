import React, { Fragment } from 'react';
import ChooseMovies from '../movies/ChooseMovies'
import Form from '../movies/Form';
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
