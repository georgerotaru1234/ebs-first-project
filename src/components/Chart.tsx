import { LineChart, YAxis, XAxis, Tooltip, CartesianGrid, Line, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Container, Row, Col } from 'ebs-design';
import { useQuery } from 'react-query';
import { getUsers } from 'api/users';
import { getPosts } from 'api/posts';

const Chart = () => {
  const { data } = useQuery('users', getUsers);
  const { data: posts } = useQuery('posts', getPosts);

  return (
    <Container>
      <Row>
        <Col size={6}>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={posts}>
              <XAxis dataKey="createdAt" stroke="#494f7d" />
              <YAxis />
              <Tooltip />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Bar dataKey="id" fill="#3366ff" barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </Col>
        <Col size={6}>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart
              data={data}
              margin={{
                top: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="firstName" />
              <YAxis />
              <Tooltip />
              <Line connectNulls type="monotone" dataKey="id" stroke="#494f7d" fill="#3366ff" />
            </LineChart>
          </ResponsiveContainer>
        </Col>
      </Row>
    </Container>
  );
};
export default Chart;
