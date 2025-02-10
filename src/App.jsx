import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import UserReportView from './pages/user/UserReportView';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <>
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
