import Usuario from './Usuario/usuario';
import { useAtualizarPagina, useUsuarioStore } from '../../store/store';
import style from './ListaUsuarios.module.scss';
import { Button } from '@mui/material';
import { useEffect } from 'react';

const ListaUsuarios = () =>{ 
  const {paginaatualizada, atualizar, naoatualizar} = useAtualizarPagina();
  const [usuarios, setUsuarios] = useUsuarioStore(state =>[ state.usuarios, state.addToUsuario])

  window.onload = atualizarLista;
  
  function atualizarLista(){
    fetch('https://api-ebon-mu-47.vercel.app/lista')
        .then(resposta => resposta.json())
        .then(dados => {
          dados.forEach((usuario: any) => {
          setUsuarios(usuario)
        });
      });
  }

  useEffect(() =>{

    if(paginaatualizada === true){
      window.location.reload();
    }
    
  },[]);

  return (
    <div className={style.containerLista}>
      <h1>Lista de Usuarios</h1>
      <Button  type='button' variant="contained" color='success' onClick={() => window.location.reload()} sx={{width:150}}>Atualizar</Button>
        <ul className={style.lista}>
          {usuarios.length > 0 ? usuarios.map((usuario) => <Usuario key={usuario.id} usuario={usuario}/>) : null}   
        </ul>
    </div>
  );

};

export default ListaUsuarios;
