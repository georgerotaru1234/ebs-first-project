import { Container, Row, Col } from 'ebs-design';
import CreateUserForm from 'features/users/user/CreateUserForm';

const CreateUser = () => {
  return (
    <Container>
      <Row>
        <Col size={4}>
          <CreateUserForm />
        </Col>
      </Row>
    </Container>
  );
};

export default CreateUser;
