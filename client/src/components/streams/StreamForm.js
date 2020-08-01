import React from 'react';
import {Field, reduxForm} from 'redux-form';

class StreamForm extends React.Component {
    renderError({ error, touched }) {
        // Touched is a method housed in error that will return true when the user 
        // touches the particular field
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    }


    // Why does render input have to be an arrow function? This insures that "this" is binded
    // to the correct context when referenced within the function body (current class).
    // Recall that arrow functions implicitly bind "this" to this current class.
    renderInput = ({ input, label, meta }) => {
        // formProps is an object that is automatically passed to this function which
        // contains all the functions necessary to handle input change
        const className = `field ${meta.error && meta.touched ? 'error': ''}`;

        return (
            // <input onChange={formProps.input.onChange} value={formProps.input.value} />
            // This is a short bit of syntax which we can use so that each of the input prop
            // values are assigned the values corresponding to formProps (so onChange = formProps.
            // input.onChange)
            // <input {...formProps.input} />
            // Since we have destructured the input argument
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off"/>
                {/* Meta is an object that will return the error messages created in 
                validate. The link is created using the name fields, supplied to the Field
                tags created in the render call. */}
                {this.renderError(meta)}
            </div>
        );

    }

    onSubmit = (formValues) => {
        // Since we are utilizing a redux built-in function to take care of the form
        // submission, we dont have to add something like (event.preventdefault)

        // When we submit our form, we call the onSubmit action creator, with the form values
        this.props.onSubmit(formValues);
    }

    render() {
        return ( 
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                {/* Field denotes each fillable field within our redux form */}
                {/* The name property is the title for the property we will manage using
                redux forms */}
                {/* We also need to pass a component prop, which should contain a function
                or some form of JSX to actually return a component used to obtain user input */}
                <Field name="title" component={this.renderInput} label="Enter Title" />
                <Field name="description" component={this.renderInput} label="Enter Description"/>
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

const validate = (formValues) => {
    const errors = {};
    if (!formValues.title) {
        // If the user did not enter a title
        errors.title = 'You must enter a title';
    }

    if (!formValues.description) {
        errors.description = 'You must enter a description';
    }

    return errors;
};


// To hookup redux forms

// Essentially the name that we are supplying to reduxForm (streamCreate) will be used to create
// a seperate object which contains all the values that we enter under field

export default reduxForm({
    form: 'streamForm',
    validate
})(StreamForm);

















