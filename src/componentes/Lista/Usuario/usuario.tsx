import { Button, Grid, MenuItem } from '@mui/material';
import { IUsuario } from "../../../type/IUsuario"
import './usuario.css';
import DeleteIcon from '@mui/icons-material/Delete';
import { useUsuarioStore } from '../../../store/store';
import { error } from 'console';


interface Props{
  usuario: IUsuario;
}

const Usuario = ({usuario}:Props) =>{

  function excluiUsuario(usuario: IUsuario){

    if(window.confirm(`Deseja excluir o usuario${usuario.nome}`)){

      fetch(`http://localhost:3333/lista/${usuario.id}`,{
        method: 'DELETE',
        headers: {'Content-Type': 'application/json',},
      })
      .then(resposta => {
        console.log('A solicitação foi iniciada');
        
        if(resposta.ok){
          console.log('Exclusão concluida')
        }else{
          return resposta.json();
        }

      }) 
      .then(dados => {
        console.log('A solicitação foi concluida')
      })  
      .catch(error => {
        console.error('Erro ao processar solicitação: ',error);
      }) 

      window.location.reload();
    } 
      
  }

  const formatoData = new Date(usuario.data);
  const data = new Intl.DateTimeFormat('pt-BR').format(formatoData)

  return(
    <li className= 'usuario text-xs md:text-base w-11/12 sm:w-full flex-col sm:flex-row'>
      <strong>Nome: </strong>{usuario.nome}
      <strong>Email: </strong>{usuario.email}
      <strong>Data: </strong>{data}
      <strong>Sexo: </strong>{usuario.sexo}
      <button onClick={() => excluiUsuario(usuario)}>&times;</button>
    </li>
  )

}



export default Usuario