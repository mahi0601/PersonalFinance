// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { AuthProvider } from './contexts/AuthContext';
// import { ThemeProvider } from './contexts/ThemeContext';
// import LoginPage from './pages/LoginPage';
// import SignupPage from './pages/SignupPage';
// import DashboardPage from './pages/DashboardPage/DashboardPage';
// import TransactionsPage from './pages/TransactionsPage/TransactionsPage';
// import NavBar from './components/NavBar';
// import Footer from './components/Footer';

// function App() {
//     return (
//         <AuthProvider>
//             <ThemeProvider>
//                 <Router>
//                     <NavBar />
//                     <Routes>
//                         <Route path="/login" element={<LoginPage />} />
//                         <Route path="/signup" element={<SignupPage />} />
//                         <Route path="/dashboard" element={<DashboardPage />} />
//                         <Route path="/transactions" element={<TransactionsPage />} />
//                     </Routes>
//                     <Footer />
//                 </Router>
//             </ThemeProvider>
//         </AuthProvider>
//     );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import TransactionsPage from './pages/TransactionsPage/TransactionsPage';
import LoginRoute from './routes/LoginRoute';
import SignupRoute from './routes/SignupRoute';
import DashboardRoute from './routes/DashboardRoute';
import TransactionsRoute from './routes/TransactionsRoute';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import CsvPage from './pages/TransactionsPage/CsvPage';
// import Logout from './pages/LogoutPage';
import LogoutRoute from './routes/LogoutRoute';

function App() {
    return (
        <AuthProvider>
            <ThemeProvider>
                <Router>
                    <NavBar />
                    <Routes>
                        {/* Public Routes */}
                        <Route element={<LoginRoute />}>
                            <Route path="/login" element={<LoginPage />} />
                        </Route>
                        <Route element={<SignupRoute />}>
                            <Route path="/signup" element={<SignupPage />} />
                        </Route>

                        {/* Protected Routes */}
                        <Route element={<DashboardRoute />}>
                            <Route path="/dashboard" element={<DashboardPage />} />
                        </Route>
                        <Route element={<TransactionsRoute />}>
                            <Route path="/transactions" element={<TransactionsPage />} />
                        </Route>
                        <Route element={<CsvPage/>}>
                            <Route path="/csv" element={<CsvPage />} />
                        </Route>
                        <Route element={<LoginPage />}>
                            <Route path="/logout" element={<LogoutRoute/>} />
                        </Route>
                    </Routes>
                    
                    <Footer />
                </Router>
            </ThemeProvider>
        </AuthProvider>
    );
}

export default App;
