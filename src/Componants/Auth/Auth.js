import React, { Component } from 'react'
import { Formik } from 'formik';

import { auth } from '../../redux/authActionCreater';
import { connect } from 'react-redux';
import Spinner from '../BurgerBuilder/spinner/spinner';
import {Alert} from 'reactstrap'


const mapDispathchToProps = dispatch => {
    return {
        auth: (email, password, mode) => dispatch(auth(email, password, mode)),
    }
}

const mapStateToProps = (state) => {
    return {
        authLoading: state.authLoading,
        authFailmsg: state.authFailmsg,
    }
}


class Auth extends Component {
    state = {
        mode: "Sign Up"
    }

    switchModeHandler = () => {
        this.setState({
            mode: this.state.mode === "Sign Up" ? "Login" : "Sign Up"
        })
    }
    render() {
        let err=null;
        if(this.props.authFailmsg!==null){
           err=(<Alert color="danger" >{this.props.authFailmsg}</Alert>);
        }


        let form = null;

        if (this.props.authLoading) {
            form = (<Spinner />)
        }
        else {
            form = (
                <Formik initialValues={
                    {
                        email: '',
                        password: '',
                        passwordConfirm: '',
                    }
                }
                    onSubmit={
                        (values) => {
                            this.props.auth(values.email, values.password, this.state.mode)
                        }

                    }
                    validate={(values) => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Required';
                        }
                        else if (!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(values.email)) {
                            errors.email = "Invalid email address";
                        }

                        if (!values.password) {
                            errors.password = 'Required';
                        }
                        else if (values.password.length < 6) {
                            errors.password = 'Must be at least 6 characters';
                        }
                        if (this.state.mode === "Sign Up") {
                            if (!values.passwordConfirm) {
                                errors.passwordConfirm = 'Required';
                            }
                            else if (values.password !== values.passwordConfirm) {
                                errors.passwordConfirm = "Password field does no match";
                            }
                        }


                        // console.log(errors)
                        return errors;
                    }}
                >
                    {({ values, handleChange, handleSubmit, errors }) => (<div

                        style={{ border: "1px solid grey", padding: "15px", borderRadius: "5px" }}>

                        <button style={{
                            width: "100%",
                            backgroundColor: "#D70F64",
                            color: "white"
                        }}
                            className="btn btn-lg"
                            onClick={this.switchModeHandler}
                        >Switch To {this.state.mode === "Sign Up" ? "Login" : "Sign Up"}</button>
                        <br /> <br />
                        <form onSubmit={handleSubmit}>
                            <input name="email"
                                placeholder="Enter Your Email"
                                className="form-control"
                                value={values.email}
                                onChange={handleChange} />
                            <span style={{ color: "red" }}>{errors.email}</span>
                            <br />
                            <input name="password"
                                placeholder="password"
                                className="form-control"
                                value={values.password}
                                onChange={handleChange} />
                            <span style={{ color: "red" }}> {errors.password}</span>
                            <br />

                            {this.state.mode === "Sign Up" ? <div>
                                <input name="passwordConfirm"
                                    placeholder="Confirm Password"
                                    className="form-control"
                                    value={values.confirmpassword}
                                    onChange={handleChange} />
                                <span style={{ color: "red" }}>{errors.passwordConfirm}</span>
                                <br />
                            </div> : null}

                            <button type="submit" className="btn btn-success" >{this.state.mode === "Sign Up" ? "Sign Up" : "Login"}</button>
                        </form>
                    </div>)

                    }

                </Formik>
                
            )
        }
        return (
            <div>
                {err}
              {form}
            </div>
        )
    }
}
export default connect(mapStateToProps, mapDispathchToProps)(Auth);