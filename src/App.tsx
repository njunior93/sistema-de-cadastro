import './App.css';
import ListaUsuarios from './componentes/Lista/ListaUsuarios';
import Home from './componentes/Home/Home'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Formulario from './componentes/Formulario/Formulario';
import MenuIcon from '@mui/icons-material/Menu';
import { useMenuStore } from './store/store';
import { useEffect, useRef } from 'react';


function App() {

  const {MenuAberto, abrirMenu, fecharMenu} = useMenuStore();
  const botaoMenu = useRef<HTMLButtonElement>(null);
  const opcoesMenu = useRef<HTMLButtonElement>(null);

  function cliquefora(event:MouseEvent){

    if(opcoesMenu.current && opcoesMenu.current.contains(event.target as Node)){
      abrirMenu();
    }else{
      fecharMenu();
    }

    /*if(botaoMenu.current && !botaoMenu.current.contains(event.target as Node)){
      fecharMenu();
    }*/
  };

  useEffect(()=>{
    document.addEventListener('mousedown', cliquefora);

    return () => {
      document.removeEventListener('mousedown', cliquefora);
    };
  },[botaoMenu, fecharMenu]);
  
  return (
    <BrowserRouter>
    
      <header >
        {/* menu */}
        <div className="-mr-2 flex md:hidden">
          <button ref={botaoMenu} onClick={abrirMenu} type='button' className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-300 ease-in-out">
            <MenuIcon color='info'/>
          </button>
        </div>
        {/* ------------------ */}
        {/* opcoes responsivas */}
        <nav  ref={opcoesMenu} className={`${MenuAberto ? '' :'hidden'} md:hidden`}>
          <ul className='menu_responsivo'>
            <li><NavLink to='/'>Inicio</NavLink></li>
            <li><NavLink to='/ListaUsuarios'>Usuarios Cadastrados</NavLink></li>
            <li><NavLink to='/Formularionovo'>Cadastro Usuario</NavLink></li>
          </ul>
        </nav>
        {/* ----------------------------- */}
        <nav className="hidden md:block">
          <ul>
            <li><NavLink to='/'>Inicio</NavLink></li>
            <li><NavLink to='/ListaUsuarios'>Usuarios Cadastrados</NavLink></li>
            <li><NavLink to='/Formularionovo'>Cadastro Usuario</NavLink></li>
          </ul>
        </nav>
      </header>


      <main>
        <Routes>
          <Route path='/' element={<Home/> }/>
          <Route path='/Formularionovo' element={<Formulario/> }/>
          <Route path='/ListaUsuarios' element={<ListaUsuarios/>}/>
          <Route path='*' element={<PaginaNaoEncontrada/>}/>       
        </Routes>    
      </main>
    </BrowserRouter> 
  );

  
}

function PaginaNaoEncontrada(){
  return (
    <>
      <h1>404</h1>
      <p>Pagina não encontrada</p>
    </>
  )
}

export default App;
