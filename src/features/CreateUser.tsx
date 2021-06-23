import CreateUserForm from 'components/CreateUserForm';
import { Container, Row, Col } from 'ebs-design';

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
