import { useMutation, useQueryClient } from 'react-query';
import { Form, Textarea, Button, DatePicker, Alert, Icon as SVGIcon } from 'ebs-design';
import { PostType } from 'types/types';
import { addNewPost } from 'api/posts';

const AddNewPost = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error, isError, isSuccess } = useMutation(addNewPost);

  const submitNewPost = (newPost: PostType) => {
    mutate(newPost, {
      onSuccess: () => {
        queryClient.refetchQueries(['posts'], { stale: true, exact: true });
      },
    });
  };

  return (
    <div>
      {isError && <p>Error: {error}</p>}
      {isSuccess && <Alert icon message="The post was successfully created!" />}
      <Form onFinish={submitNewPost}>
        <Form.Field name="title" label="Post Title:" extra="This field is required">
          <Textarea />
        </Form.Field>
        <Form.Field name="body" label="Post Description:" extra="This field is required">
          <Textarea />
        </Form.Field>
        <Form.Field name="createdAt" label="Date:" rules={[{ required: true }]}>
          <DatePicker placeholderText="Birthday" isClearable dateFormat="dd-MM-yyyy" />
        </Form.Field>
        <Button submit={true} prefix={<SVGIcon type="refresh" />} loading={isLoading && true}>
          Create new post
        </Button>
      </Form>
    </div>
  );
};

export default AddNewPost;
