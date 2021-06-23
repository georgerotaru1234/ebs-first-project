import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Alert, Container, Space, Row, Col, Form, Input, Button, Icon as SVGIcon } from 'ebs-design';
import { RegisterType } from 'types/types';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import { registerUser } from 'api/endpoints';
import { isLoggedIn } from 'utils';

const Register = () => {
  let history = useHistory();
  const { mutate, isLoading, error } = useMutation(registerUser, {
    onSuccess: () => {
      setTimeout(() => {
        history.push('/');
      }, 2000);
    },
  });

  const [alert, setAlert] = useState(false);

  const handleForm = (registerData: RegisterType) => {
    mutate({
      firstName: registerData.firstName,
      lastName: registerData.lastName,
      email: registerData.email,
      password: registerData.password,
    });
    setAlert(true);
  };

  return (
    <Container>
      {isLoggedIn() && <Redirect to="/" />}
      <Row>
        <Col size={4} offset={4}>
          {error && <p>Error!</p>}
          {alert ? <Alert icon message="Your account has been registered!" /> : null}
          <Form onFinish={handleForm} className="mt-20">
            <Form.Field name="firstName" label="First Name" rules={[{ required: true }, { min: 3 }]}>
              <Input />
            </Form.Field>

            <Form.Field name="lastName" label="Last Name" rules={[{ required: true }, { min: 3 }]}>
              <Input />
            </Form.Field>
            <Form.Field name="email" label="E-mail" rules={[{ required: true }]}>
              <Input />
            </Form.Field>

            <Form.Field
              name="password"
              label="Password"
              rules={[
                { required: true },
                {
                  pattern: /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,}$/,
                  message:
                    'Password must contain minimum eight characters, at least one letter, at least one capital letter, at least one special character and one number!',
                },
              ]}
            >
              <Input />
            </Form.Field>

            <Form.Field
              name="confirmPassword"
              label="Confirm Password"
              rules={[
                { required: true },
                ({ getFieldValue }) => ({
                  async validator(_, value) {
                    const password = getFieldValue('password');
                    if (password && password !== value) {
                      return Promise.reject("Confirm Password and Password are'nt equal! ");
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input />
            </Form.Field>
            <Space align="center" justify="space-between">
              <Link to="/">
                <Button>Go to login page</Button>
              </Link>
              <Button type="primary" submit={true} prefix={<SVGIcon type="refresh" />} loading={isLoading && true}>
                Register
              </Button>
            </Space>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
