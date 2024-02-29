import Usuario from './Usuario/usuario';
import { useUsuarioStore } from '../../store/store';
import style from './ListaUsuarios.module.scss';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from 'react';
import { IUsuario } from '../../type/IUsuario';
import { WindowSharp } from '@mui/icons-material';

const ListaUsuarios = () =>{ 
  const [usuarios, setUsuarios] = useUsuarioStore(state =>[ state.usuarios, state.addToUsuario])

  window.onload = atualizarLista;
  
  function atualizarLista(){
    fetch('http://localhost:3333/lista')
        .then(resposta => resposta.json())
        .then(dados => {
          dados.forEach((usuario: any) => {
          setUsuarios(usuario)
        });
      });
  }

  return (
    <div className={style.containerLista}>
      <h1>Lista de Usuarios</h1>
      <Button  type='button' variant="contained" color='success' onClick={() => window.location.reload()} sx={{width:150}}>Atualizar</Button>
        <ul className={style.lista}>
          {usuarios.length > 0 ? usuarios.map((usuario) => <Usuario key={usuario.id} usuario={usuario}/>) : <p>Lista Vazia</p>}   
        </ul>
    </div>
  );

};

export default ListaUsuarios;