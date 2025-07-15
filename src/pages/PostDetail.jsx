import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext'; // ✅ 추가: 로그인 정보 전역 관리

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const { username } = useAuth(); // ✅ 현재 로그인된 사용자 정보

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const res = await api.get(`/api/posts/${id}`);
      setPost(res.data);
    } catch (err) {
      console.error(err);
      alert('게시글을 불러오지 못했습니다.');
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    try {
      await api.post(`/api/posts/${id}/comments`, {
        text: comment,
        author: username, // ✅ localStorage 대신 useAuth 사용
      });
      setComment('');
      fetchPost();
    } catch (err) {
      console.error(err);
      alert('댓글 등록 실패');
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('댓글을 삭제하시겠습니까?')) return;
    try {
      await api.delete(`/api/posts/${id}/comments/${commentId}`, {
        params: { username }, // ✅ localStorage 대신 useAuth 사용
      });
      fetchPost();
    } catch (err) {
      console.error(err);
      alert('댓글 삭제 실패');
    }
  };

  if (!post) return <div>로딩 중...</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{post.title}</h2>
      <p><em>조회수: {post.views}</em></p>
      <p>{post.content}</p>

      <h3>댓글</h3>
      <ul>
        {post.comments?.map((c, i) => (
          <li key={i}>
            {c.text} ({c.author}, {new Date(c.createdAt).toLocaleString()})
            {c.author === username && (
              <button onClick={() => handleDeleteComment(c.id)}>삭제</button>
            )}
          </li>
        ))}
      </ul>

      {username && ( // ✅ 로그인된 사용자만 댓글 작성 가능
        <form onSubmit={handleCommentSubmit}>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="댓글 입력"
            required
          />
          <button type="submit">댓글 작성</button>
        </form>
      )}

      <br />
      <Link to="/">← 목록으로</Link>
    </div>
  );
}

export default PostDetail;
