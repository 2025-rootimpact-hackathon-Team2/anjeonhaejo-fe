import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import UserReportView from './pages/user/UserReportView';
import Dashboard from './pages/Dashboard';
import Setting from './pages/Setting';
import Modal from './components/Modal';
import { useState } from 'react';
import MobileLayout from './components/mobile/MobileLayout';
import MonthReport from './pages/MonthReport';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/report" element={<MonthReport />} />
          <Route path="/setting" element={<Setting />} />
        </Route>
        <Route element={<MobileLayout />}>
          <Route path="/user" element={<UserReportView />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
