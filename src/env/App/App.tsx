import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from '../components/Layout';
import { BotonPage } from '../pages/BotonPage';
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
                </Routes>
            </Layout>
        </Router>
    );
};

export default App;
