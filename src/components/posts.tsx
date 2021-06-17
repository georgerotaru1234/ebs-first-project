import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { PostType } from 'types/types';
import { usePosts } from 'hooks/usePosts';
import { PlusIcon } from 'icons';
import { deletePost } from 'api/endpoints';
import Loader from './Loader';
import Modal from './Modal';
import EditPostForm from './EditPostForm';
import AddNewPost from './AddNewPost';
import { TrashIcon, EditIcon } from 'icons';
const Posts = () => {
  const { data: postData, isLoading, error, isSuccess } = usePosts();
  const [post, setPost] = useState<PostType>();
  const [isModalVisible, setModalVisibility] = useState<boolean>(false);
  const [formVisible, setFormVisibility] = useState<boolean>(false);
  const { mutate } = useMutation(deletePost);
  const queryClient = useQueryClient();
  const addNewPost = () => {
    setModalVisibility(true);
  };
  const changePost = (post: PostType) => {
    setPost(post);
    setModalVisibility(true);
    setFormVisibility(true);
  };
  const removePost = (id: number) => {
    mutate(id, {
      onSuccess: () => {
        queryClient.refetchQueries(['posts'], { stale: true, exact: true });
      },
    });
  };
  const closeModal = () => {
    setModalVisibility(false);
    setFormVisibility(false);
  };
  return (
    <div className="post-wrapper">
      <div className="posts-header">
        <button className="btn btn--secondary btn--small btn--icon" onClick={() => addNewPost()}>
          <PlusIcon />
          <span>NEW POST</span>
        </button>
      </div>
      {isLoading && <Loader />}
      {error && <p>Error!</p>}
      {isSuccess &&
        postData.map((item: PostType) => {
          return (
            <div className="card" key={item.id}>
              <div className="content-wrapper">
                <div className="post-content">
                  <h5 className="title">{item.title}</h5>
                  <p className="description">{item.body}</p>
                </div>
                <div className="post-footer">
                  <div className="date">
                    <span>Date: </span>
                    <span>{item.createdAt}</span>
                  </div>
                  <button className="btn btn--secondary btn--small btn--icon" onClick={() => changePost(item)}>
                    <EditIcon />
                    Edit Post
                  </button>
                  <button className="btn btn--secondary btn--small btn--icon" onClick={() => removePost(item.id!)}>
                    <TrashIcon />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      {isModalVisible && (
        <Modal closeModal={closeModal}>
          {formVisible ? <EditPostForm post={post!} closeModal={closeModal} /> : <AddNewPost closeModal={closeModal} />}
        </Modal>
      )}
    </div>
  );
};

export default Posts;
