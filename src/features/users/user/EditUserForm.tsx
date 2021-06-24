import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { updateUser } from 'api/users';
import { RegisterType } from 'types/types';
import { Form, Input, Button, Container, Row, Col, Alert, Icon as SVGIcon } from 'ebs-design';

interface ModalProps {
  item: RegisterType;
  closeModal?: () => void;
}

const EditUserForm: React.FC<ModalProps> = ({ item }) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError, error, isSuccess } = useMutation(updateUser);

  const editForm = (data: RegisterType) => {
    mutate(
      {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        email: data.email,
      },
      {
        onSuccess: () => {
          queryClient.refetchQueries(['users'], { stale: true, exact: true });
        },
      },
    );
  };

  return (
    <Container>
      <Row>
        <Col size={12}>
          {isError && <p>Error: {error}</p>}
          {isSuccess && <Alert icon message="The user data was changed successfully!" />}
          <Form initialValues={item} onFinish={editForm}>
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
        </Col>
      </Row>
    </Container>
  );
};

export default EditUserForm;
