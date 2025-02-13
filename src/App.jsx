import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import UserReportView from './pages/user/UserReportView';
import Dashboard from './pages/Dashboard';
import Setting from './pages/Setting';
import MobileLayout from './components/mobile/MobileLayout';
import MonthReport from './pages/MonthReport';
import Login from './pages/Login';
import HeaderLayout from './components/HeaderLayout';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/report" element={<MonthReport />} />
          <Route path="/setting" element={<Setting />} />
        </Route>
        <Route element={<HeaderLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<MobileLayout />}>
          <Route path="/user" element={<UserReportView />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
