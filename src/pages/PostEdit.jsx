import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

function PostEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: '', content: '' });

  // 기존 글 불러오기
  useEffect(() => {
    api.get(`/api/posts`)
      .then(res => {
        const found = res.data.find(p => p.id === id);
        if (found) setPost(found);
        else alert('글을 찾을 수 없습니다.');
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/posts/${id}`, post);
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('수정 실패');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>게시글 수정</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={post.title}
          onChange={handleChange}
          required
        />
        <br />
        <textarea
          name="content"
          value={post.content}
          onChange={handleChange}
          required
        ></textarea>
        <br />
        <button type="submit">수정 완료</button>
      </form>
    </div>
  );
}

export default PostEdit;
