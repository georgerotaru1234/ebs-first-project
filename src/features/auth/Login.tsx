import React, { useState } from 'react';
import { useHistory, Redirect, Link } from 'react-router-dom';
import { Alert, Form, Input, Container, Space, Button, Icon as SVGIcon } from 'ebs-design';
import { RegisterType } from 'types/types';
import { useUsers } from 'hooks/useUsers';
import { isLoggedIn } from 'utils';

const Login = () => {
  const history = useHistory();
  const [loginError, setLoginError] = useState(false);
  const { data: users, isLoading, error, isError } = useUsers();

  return (
    <Container>
      <Space align="center" justify="center" direction="vertical" className="mt-20">
        {isLoggedIn() ? <Redirect to="/dashboard/users" /> : null}
        {isError && <p>Error: {error}</p>}
        <Form
          onFinish={(values) => {
            users &&
              users.filter((item: RegisterType) => {
                if (item.email === values.email && item.password === values.password) {
                  for (let element in item) {
                    if (element === 'password') {
                      continue;
                    }
                    localStorage.setItem(element, item[element as keyof RegisterType] + '');
                  }
                  setLoginError(false);
                  history.push('/dashboard/users');
                }
                setLoginError(true);
                return false;
              });
          }}
        >
          {loginError && <Alert icon message="Your E-mail or password are incorect!" type="error" />}
          <Form.Field name="email" label="email" extra="This field is required" rules={[{ required: true }]}>
            <Input />
          </Form.Field>

          <Form.Field name="password" label="password" extra="This field is required" rules={[{ required: true }]}>
            <Input type="password" />
          </Form.Field>
          <Space align="center" justify="space-between">
            <Link to="/register">
              <Button>GO TO REGISTER PAGE</Button>
            </Link>
            <Button type="primary" submit={true} prefix={<SVGIcon type="refresh" />} loading={isLoading}>
              Login
            </Button>
          </Space>
        </Form>
      </Space>
    </Container>
  );
};

export default Login;
