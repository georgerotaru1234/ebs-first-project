import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Card, Space, Button, Container, Row, Col, Loader } from 'ebs-design';
import { PostType } from 'types/types';
import { usePosts } from 'hooks/usePosts';
import { deletePost } from 'api/endpoints';
import ModalComp from './Modal';
import EditPostForm from './EditPostForm';
import AddNewPost from './AddNewPost';

const Posts = () => {
  const { data: postData, isLoading, error, isSuccess } = usePosts();
  const [post, setPost] = useState<PostType>();
  const [isModalVisible, setModalVisibility] = useState(false);
  const [formVisible, setFormVisibility] = useState(false);
  const { mutate } = useMutation(deletePost);
  const queryClient = useQueryClient();

  const addNewPost = () => {
    setModalVisibility(true);
    setFormVisibility(false);
  };

  const editPost = (post: PostType) => {
    setPost(post);
    setModalVisibility(true);
    setFormVisibility(true);
  };

  const removePost = (id: number) => {
    if (id) {
      mutate(id, {
        onSuccess: () => {
          queryClient.refetchQueries(['posts'], { stale: true, exact: true });
        },
      });
    }
  };

  const closeModal = () => {
    setModalVisibility(false);
    setFormVisibility(false);
  };

  return (
    <div>
      <div className="posts__header"></div>
      {error && <p>Error!</p>}
      <Container>
        <Row gy={4}>
          <Col size={12}>
            <Button onClick={() => addNewPost()}>NEW POST</Button>
          </Col>

          {isLoading && (
            <Col size={12}>
              <Loader.Inline />
            </Col>
          )}

          {isSuccess &&
            postData.map((item: PostType, index: number) => {
              const { id, createdAt, body, title } = item;
              return (
                <Col size={6} key={index}>
                  <Card>
                    <Card.Header bordered>
                      <Space align="center" justify="space-between">
                        <Space align="center">
                          <h4>{title}</h4>
                        </Space>
                        <Space>{createdAt}</Space>
                      </Space>
                    </Card.Header>
                    <Card.Body>
                      <p>{body}</p>
                    </Card.Body>
                    <Card.Footer bordered>
                      <Space align="center" justify="space-between">
                        <Button onClick={() => removePost(id!)}>REMOVE</Button>
                        <Button onClick={() => editPost(item)}>EDIT</Button>
                      </Space>
                    </Card.Footer>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </Container>
      <ModalComp open={isModalVisible} closeModal={closeModal} title={formVisible ? 'Edit Post' : 'Add New Post'}>
        {formVisible ? <EditPostForm post={post!} /> : <AddNewPost />}
      </ModalComp>
    </div>
  );
};

export default Posts;
