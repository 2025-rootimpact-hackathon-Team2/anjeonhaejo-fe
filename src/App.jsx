import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import UserReportView from './pages/user/UserReportView';
import Dashboard from './pages/Dashboard';
import Modal from './components/Modal';
import { useState } from 'react';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <>
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
      <Routes>
        <Route element={<Layout />}>
          <Route path="/user" element={<UserReportView />} />
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
