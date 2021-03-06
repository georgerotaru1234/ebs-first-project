import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { updatePost } from 'api/endpoints';
import { PostType } from 'types/types';
import Loader from 'components/Loader';
interface PostProps {
  closeModal: () => void;
  post: PostType;
}
const EditPostForm = ({ post, closeModal }: PostProps) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useMutation(updatePost);
  const [newPost, setNewPost] = useState<PostType>({
    id: post.id,
    title: post.title,
    body: post.body,
    createdAt: post.createdAt,
  });
  const submitPost = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    mutate(newPost, {
      onSuccess: () => {
        queryClient.refetchQueries(['posts'], { stale: true, exact: true });
        closeModal();
      },
    });
  };
  return (
    <div>
      {isLoading && <Loader />}
      {error && <p>Error!</p>}
      <form className="form" onSubmit={submitPost}>
        <div className="form__group">
          <label className="form__label">Title:</label>
          <textarea
            className="form__textarea form__textarea--title"
            defaultValue={newPost.title}
            onChange={(e) =>
              setNewPost((prevData: any) => ({
                ...prevData,
                title: e.target.value,
              }))
            }
          ></textarea>
        </div>
        <div className="form__group">
          <label className="form__label">Description:</label>
          <textarea
            className="form__textarea form__textarea--description"
            defaultValue={newPost.body}
            onChange={(e) =>
              setNewPost((prevData: any) => ({
                ...prevData,
                body: e.target.value,
              }))
            }
          ></textarea>
        </div>
        <div className="form__group">
          <label className="form__label">Date:</label>
          <input
            type="Date"
            className="form__input"
            defaultValue={newPost.createdAt}
            onChange={(e) =>
              setNewPost((prevData: any) => ({
                ...prevData,
                createdAt: e.target.value,
              }))
            }
          />
        </div>
        <button className="btn btn--gray btn--small">Save</button>
      </form>
    </div>
  );
};
export default EditPostForm;
