import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { createUser } from 'api/endpoints';
import { RegisterType } from 'types/types';
import { Form, Input, Button, Alert, Icon as SVGIcon } from 'ebs-design';

const CreateUserForm = () => {
  const [alert, setAlert] = useState(false);
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation('user', createUser);

  const handleNewUserForm = (formData: RegisterType) => {
    mutate(
      {
        firstName: formData.firstName,
        lastName: formData.lastName,
        password: formData.password,
        email: formData.email,
      },
      {
        onSuccess: () => {
          queryClient.refetchQueries(['users'], { stale: true, exact: true });
          setAlert(true);
        },
      },
    );
  };

  return (
    <div>
      {alert && <Alert icon message="The user has successfully created!" />}
      <Form onFinish={handleNewUserForm}>
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

        <Button submit={true} prefix={<SVGIcon type="refresh" />} loading={isLoading && true}>
          Create new user account
        </Button>
      </Form>
    </div>
  );
};
export default CreateUserForm;
