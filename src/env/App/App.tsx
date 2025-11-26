import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from '../components/Layout';
import { BotonPage } from '../pages/BotonPage';
import CheckboxPage from '../pages/CheckboxPage';
import { FirmaManualPage } from '../pages/FirmaManualPage';
import HomePage from '../pages/HomePage';
import TextAreaPage from '../pages/TextAreaPage';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/boton' element={<BotonPage />} />
          <Route path='/textarea' element={<TextAreaPage />} />
          <Route path='/firma' element={<FirmaManualPage />} />
          <Route path='/checkbox' element={<CheckboxPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
