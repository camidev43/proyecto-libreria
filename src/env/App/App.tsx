import { useState } from 'react';

import styles from './App.module.css';

const App = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const toggleTheme = () => {
        setIsDarkTheme(prev => !prev);
        document.documentElement.classList.toggle('dark_theme');
    };

    return (
        <div className={styles.contenedor_app}>
            <header className={styles.cabecera}>
                <button onClick={toggleTheme} className={styles.boton_tema}>
                    {isDarkTheme ? '🌞 Light Mode' : '🌕 Dark Mode'}
                </button>
            </header>

            <main className={styles.area_prueba}>{/* Aquí van tus componentes de prueba */}</main>
        </div>
    );
};

export default App;
