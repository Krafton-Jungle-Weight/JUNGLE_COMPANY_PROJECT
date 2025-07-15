import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

function PostCreate() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/posts', { title, content });
      navigate('/'); // 작성 후 목록으로 이동
    } catch (err) {
      console.error(err);
      alert('글 작성 실패');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>게시글 작성</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <textarea
            placeholder="내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">작성</button>
      </form>
    </div>
  );
}

export default PostCreate;
