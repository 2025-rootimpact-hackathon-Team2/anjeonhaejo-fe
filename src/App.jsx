import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import UserReportView from './pages/user/UserReportView';
import Dashboard from './pages/Dashboard';
import MobileLayout from './components/mobile/MobileLayout';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
        <Route element={<MobileLayout />}>
          <Route path="/user" element={<UserReportView />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
