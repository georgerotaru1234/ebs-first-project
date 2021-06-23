import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Input, Button, Alert, Container, Row, Col, Loader, Icon as SVGIcon } from 'ebs-design';
import { useQuery, useMutation } from 'react-query';
import { getSingleUser, updateUser } from 'api/endpoints';
import { RegisterType } from 'types/types';

const EditUserForm = () => {
  const { id } = useParams<{ id: string }>();
  const { data: prevUser, isLoading, error, isSuccess } = useQuery('user', () => getSingleUser(id), { enabled: !!id });
  const { mutate } = useMutation(updateUser);

  const [alert, setAlert] = useState(false);

  const handleNewUserForm = (formValue: RegisterType) => {
    mutate({
      id: formValue.id,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      email: formValue.email,
      password: formValue.password,
    });

    setAlert(true);
  };

  return (
    <Container>
      <Row>
        <Col size={4}>
          {isLoading && <Loader.Inline />}
          {error && <p>Error!!</p>}
          {alert && <Alert icon message="The user data was changed successfully!" />}
          {isSuccess && (
            <Form initialValues={prevUser} onFinish={handleNewUserForm}>
              <Form.Field name="id" label="Id">
                <Input disabled />
              </Form.Field>

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

              <Button className="mr-15" submit={true} prefix={<SVGIcon type="refresh" />} loading={isLoading && true}>
                save
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};
export default EditUserForm;
