import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import InterstateTrade from './pages/InterstateTrade'
import Login from './pages/Login'
import Signup from './pages/Signup'
import StateEconomySearch from './pages/StateEconomySearch'
import StateSearch from './pages/StateSearch'

function App() {
    return (
        <Router>
            <div className="App" style={{ margin: '1rem' }}>
                <header className="App-header">
                    <h1>Focus Fullstack Interview Exercise</h1>
                </header>
                <nav
                    style={{
                        borderBottom: 'solid 1px',
                        paddingBottom: '1rem',
                        marginBottom: '1rem',
                    }}
                >
                    <Link to="/">Home</Link> |
                    <Link to="/states">States Search Example</Link> |{' '}
                    <Link to="/trade">Interstate Trade Search</Link> |{' '}
                    <Link to="/economy">State Economy Search</Link> |{' '}
                    <Link to="/login">Login</Link> |{' '}
                    <Link to="/signup">Signup</Link> |{' '}
                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/states" element={<StateSearch />} />
                    <Route path="/trade" element={<InterstateTrade />} />
                    <Route path="/economy" element={<StateEconomySearch />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
