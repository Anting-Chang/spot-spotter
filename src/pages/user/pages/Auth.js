import React, { useContext, useState, useReducer } from 'react';
import { Form, Input, Button, Checkbox, Switch } from 'antd';

import styles from './Auth.module.css'
import { AuthContext } from "../../../shared/context/auth-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import {useHistory} from "react-router-dom";
import {useAuth} from "../../../shared/hooks/auth-hook";

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'switch':
            if (state.isSignup === false) {
                return {
                    isSignup: true,
                    authTitle: 'Sign Up',
                    submitBtn: 'Sign Up',
                    sideBtn: 'Login'
                }
            } else {
                return {
                    isSignup: false,
                    authTitle: 'Login',
                    submitBtn: 'Login',
                    sideBtn: 'Sign Up',
                }
            }
    }
}

const Auth = () => {
    const auth = useContext(AuthContext)
    const history = useHistory()
    const { isLoading, error, sendRequest, clearError } = useHttpClient()

    const [authState, dispatch] = useReducer(reducer, {
        isSignup: false,
        authTitle: 'Login',
        submitBtn: 'Login',
        sideBtn: 'Sign Up',
    })

    const [isSignup, setIsSignup] = useState(false)

    const onFinish = (values) => {
        console.log('Success:', values);
        if (authState.isSignup) {
            signupHandler(values)
        } else {
            loginHandler(values)
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const loginHandler = async (values) => {
        try {
            const responseData = await sendRequest('users/login', 'POST',
                JSON.stringify({
                    email: values.email,
                    password: values.password
                }),
                {'Content-Type': 'application/json'}
            )
            auth.login(responseData.userId, responseData.token)
            // console.log('signing in', responseData.weekObj)

            // console.log(auth.userId)
        } catch (e) {
            console.log(e)
            setTimeout(() => {
                clearError()
            },5000)
        }
    }

    const switchState = () => {
        dispatch({type: 'switch'})
    }

    const signupHandler = async (values) => {
        try {
            const responseData = await sendRequest('users/signup', 'POST',
                JSON.stringify({
                    name: values.name,
                    email: values.email,
                    password: values.password
                }),
                {'Content-Type': 'application/json'}
            )
        } catch (e) {
            console.log(e)
            setTimeout(() => {
                clearError()
            },5000)
        }
        await loginHandler(values)
    }

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.formWrapper}>
                <div className={styles.formTitle}>{authState.authTitle}</div>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >

                    {authState.isSignup && <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please give your account a name!',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>}

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button loading={isLoading} style={{marginRight: '10px'}} type="primary" htmlType="submit">
                            {authState.submitBtn}
                        </Button>
                        <Button type="dark" onClick={switchState} >
                            {authState.sideBtn}
                        </Button>
                    </Form.Item>
                </Form>
            </div>

        </div>

    );
};

export default Auth;
