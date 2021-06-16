import { PostType } from 'types/types';
import { usePosts } from 'hooks/usePosts';
import Loader from './Loader';
const Posts = () => {
  const { data: postData, status } = usePosts();
  return (
    <div className="post-wrapper">
      {status === 'loading' && <Loader />}
      {status === 'error' && <p>Error!</p>}
      {status === 'success' &&
        postData.map((item: PostType) => {
          return (
            <div className="card" key={item.id}>
              <div className="image">
                <button className="btn btn--secondary btn--small">Edit Post</button>
                <img src={item.image} alt={item.title} />
              </div>
              <div className="content-wrapper">
                <div className="post-content">
                  <h5 className="title">{item.title}</h5>
                  <p className="description">{item.body}</p>
                </div>
                <div className="post-footer">
                  <div className="date">
                    <span>Date:</span>
                    <span>{item.createdAt}</span>
                  </div>
                  <div className="categories">
                    <span>Categories: </span>
                    {item.categories.map((category) => {
                      return <span>{category} </span>;
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Posts;
