import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { PostType } from 'types/types';
import { addNewPost } from 'api/endpoints';
import { getCurrentDate } from 'utils';
import Loader from 'components/Loader';
interface NewPostProps {
  closeModal: () => void;
}
const AddNewPost = ({ closeModal }: NewPostProps) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useMutation(addNewPost);
  const [newPost, setNewPost] = useState<PostType>({
    title: '',
    body: '',
    createdAt: getCurrentDate(),
  });

  const submitNewPost = (e: React.FormEvent<EventTarget>) => {
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
      <form onSubmit={submitNewPost}>
        <div className="input-wrapper">
          <label className="input-label">Title:</label>
          <textarea
            className="textarea textarea--title"
            value={newPost.title}
            onChange={(e) =>
              setNewPost((prevData: any) => ({
                ...prevData,
                title: e.target.value,
              }))
            }
          ></textarea>
        </div>
        <div className="input-wrapper">
          <label className="input-label">Description:</label>
          <textarea
            className="textarea textarea--description"
            value={newPost.body}
            onChange={(e) =>
              setNewPost((prevData: any) => ({
                ...prevData,
                body: e.target.value,
              }))
            }
          ></textarea>
        </div>
        <button className="btn btn--secondary btn--small">Save</button>
      </form>
    </div>
  );
};

export default AddNewPost;
