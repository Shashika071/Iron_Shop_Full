import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import AdminInvoices from './components/AdminInvoices';
import AdminQuotations from './components/AdminQuotations';
import JobManagement from './components/Jobs';
import PaymentManagement from './components/PaymentManagement';
import Sidebar from './components/Sidebar';

const App = () => {
  return (
    <Router>
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <div className="col-md-9 main-content">
            <Routes>
            
              <Route path="/invoices" element={<AdminInvoices />} />
              <Route path="/paymentManagement" element={<PaymentManagement />} />
              <Route path='/quotations' element={<AdminQuotations/>}/>
              <Route path="/jobs" element={<JobManagement />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
