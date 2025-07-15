import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostList from './pages/PostList';
import PostCreate from './pages/PostCreate';
import PostEdit from './pages/PostEdit';
import PostDetail from './pages/PostDetail';

import LoginStatus from './components/LoginStatus';

function App() {
  return (
    <Router>
      <div style={{ padding: '1rem' }}>
        <LoginStatus />
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/create" element={<PostCreate />} />
          <Route path="/edit/:id" element={<PostEdit />} />
          <Route path="/posts/:id" element={<PostDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


