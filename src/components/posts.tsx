import { useQueryClient } from 'react-query';
import { PostType } from 'types/types';
const Posts = () => {
  const queryClient = useQueryClient();
  const postsData: PostType[] = queryClient.getQueryData('Posts') || [];

  console.log('postsData232', postsData);
  return (
    <div className="post-wrapper">
      {postsData.map((item: PostType) => {
        return (
          <div className="card" key={item.id}>
            <h5 className="title">{item.title}</h5>
            <p className="description">{item.body}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Posts;
