import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useState } from 'react'
import Login from './Login'
import Registo from './Registo'
import Tarefas from './Tarefas'

function App(){
    const [autenticado, setAutenticado] = useState(false)

    return (
        <Router>
            <Routes>
                <Route path='/' element={<Login setAutenticado={setAutenticado} />} />
                <Route path='/registo' element={<Registo />} />
                <Route path='/tarefas' element={autenticado ? <Tarefas /> : <Login setAutenticado={setAutenticado} />}/>
            </Routes>
        </Router>
        )
}



export default App
