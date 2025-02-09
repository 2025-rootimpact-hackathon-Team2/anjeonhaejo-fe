import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import UserReportView from './pages/user/UserReportView';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/user" element={<UserReportView />} />
      </Routes>
    </>
  );
}

export default App;
