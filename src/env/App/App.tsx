import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from '../components/Layout';
import { BotonPage } from '../pages/BotonPage';
import HomePage from '../pages/HomePage';

const App = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/boton' element={<BotonPage />} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default App;
