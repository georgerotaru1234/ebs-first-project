import { Form, Textarea, Button, DatePicker, Alert, Icon as SVGIcon } from 'ebs-design';
import { useMutation, useQueryClient } from 'react-query';
import { updatePost } from 'api/posts';
import { PostType } from 'types/types';
interface PostProps {
  post: PostType;
}
const EditPostForm = ({ post }: PostProps) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError, error, isSuccess } = useMutation(updatePost);

  const submitPost = (newPost: PostType) => {
    mutate(
      { id: post.id, ...newPost },
      {
        onSuccess: () => {
          queryClient.refetchQueries(['posts'], { stale: true, exact: true });
        },
      },
    );
  };

  return (
    <div>
      {isError && <p>Error: {error}</p>}
      {isSuccess && <Alert icon message="The post was successfully changed!" />}
      <Form initialValues={post} onFinish={submitPost}>
        <Form.Field name="title" label="Post Title:" extra="This field is required">
          <Textarea />
        </Form.Field>
        <Form.Field name="body" label="Post Description:" extra="This field is required">
          <Textarea />
        </Form.Field>
        <Form.Field name="createdAt" label="Date:" rules={[{ required: true }]}>
          <DatePicker placeholderText="Birthday" isClearable dateFormat="dd-MM-yyyy" />
        </Form.Field>
        <Button className="mr-15" submit={true} prefix={<SVGIcon type="refresh" />} loading={isLoading && true}>
          save
        </Button>
      </Form>
    </div>
  );
};
export default EditPostForm;