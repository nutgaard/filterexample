import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, Fields, reduxForm } from "redux-form";
import { setFilter } from './../reducers/filter';

function renderFields({ names, ...fields }) {
    const fieldElements = Object.values(fields).map((field) => {
        return (
            <div key={field.input.name}>
                <Field id={field.input.name} {...field.input} component="input" type="checkbox"/>
                <label htmlFor={field.input.name}>{field.input.name}</label>
            </div>
        )
    });
    return (
        <div>
            {fieldElements}
        </div>
    );
}

function prepSubmit(name, fn, close) {
    return (values) => {
        fn(name, values);
        close();
    }
}

function Checkboxform({ pristine, handleSubmit, choices, form, actions, closeDropdown }) {
    const submit = pristine ? (
        <button type="button" onClick={closeDropdown}>Close</button>
    ) : (
        <button type="submit">Save</button>
    );

    return (
        <form onSubmit={handleSubmit(prepSubmit(form, actions.setFilter, closeDropdown))}>
            <Fields names={choices} component={renderFields}/>
            <div>
                {submit}
            </div>
        </form>
    );
}

Checkboxform.propTypes = {};

const mapStateToProps = (state, ownProps) => {
    const name = ownProps.form;
    const initialValues = state.filter[name];
    return { initialValues };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ setFilter }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm()(Checkboxform));
