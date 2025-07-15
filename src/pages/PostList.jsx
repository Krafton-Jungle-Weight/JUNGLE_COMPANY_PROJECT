import { useEffect, useState } from 'react';
import { getPosts } from '../api/posts';
import { Link } from 'react-router-dom';
import api from '../api/axios';

function PostList() {
  const [posts, setPosts] = useState([]);

  const handleDelete = async (id) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    try {
      await api.delete(`/api/posts/${id}`);
      setPosts(posts.filter(post => post.id !== id)); // 삭제된 항목 제외
    } catch (err) {
      console.error(err);
      alert('삭제 실패');
    }
  };

  useEffect(() => {
    getPosts().then(setPosts).catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>게시글 목록</h1>
      {posts.length === 0 && <p>게시글이 없습니다.</p>}
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>
              <strong>{post.title}</strong>
            </Link>
            {' '}
            <Link to={`/edit/${post.id}`}>
              <button>수정</button>
            </Link>
            <button onClick={() => handleDelete(post.id)}>삭제</button>
          </li>
        ))}
      </ul>
      <a href="/create">글 작성하기</a>
    </div>
  );
}


export default PostList;
