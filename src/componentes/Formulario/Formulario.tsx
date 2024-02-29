import { Button, FormControlLabel, FormLabel, Grid, MenuItem, Radio, RadioGroup } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import { useUsuarioStore } from '../../store/store';
import { v4 as uuidv4 } from 'uuid';
import TextField from '@mui/material/TextField';
import style from './Formulario.module.scss';
import { Formik } from 'formik';
import * as yup from 'yup';

const Formulario = () =>{

  const esquema = yup.object({
    nome: yup
      .string()
      .required('O nome é obrigatorio')
      .min(10, 'O nome deve ter no mínimo 10 caracteres')
      .max(30,'O nome deve ter no maximo 30 caracteres'),
    email: yup
      .string()
      .required('email é obrigatorio')
      .email('O email é invalido'),   
    data: yup.date()
      .required('data é obrigatorio')
      .max(new Date(), 'Você não pode ter nascido no futuro...')
      .min(new Date('1900-01-01'), 'Data invalida'),
    sexo: yup
      .string()
      .required('sexo é obrigatorio'),
  });


  return (
    <>
      <Formik initialValues={{nome: '', email:'',data:'',sexo:''}}
      onSubmit={(valores) => 
        { 
          const cadastro = {id: uuidv4(), nome: valores.nome, email: valores.email, data: valores.data, sexo: valores.sexo}
          fetch('http://localhost:3333/cadastrar',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(cadastro)
          })
          .then(resposta => resposta.json())
          .then(dados => {
          })
          .catch(erro => {
            console.error('Erro ao cadastrar usuario: ', erro)
          });
  
          window.alert('Cadastro realizado com sucesso')
          window.location.reload();    
  
        }
      
      } validationSchema={esquema}>
        {(props) => (
          <form onSubmit={props.handleSubmit} className={style.formulario} noValidate>
            <h1>Cadastro de Usuarios</h1>
            <fieldset className={style.campos}>
              <div className={style.botoes}>
                <Button  type='submit' variant="contained" color='success' startIcon={<SaveIcon/>} sx={{width:150}}>Cadastrar</Button>
                <Button type='reset' variant="contained" color='warning' startIcon={<ClearIcon/>} sx={{width:150}}>Cancelar</Button>
              </div>
              <TextField fullWidth variant="standard" margin='normal' required label='Nome completo' name='nome' onChange={props.handleChange} onBlur={props.handleBlur}/>
              {props.errors.nome && props.touched.nome ? (<div className={style.erro}>{props.errors.nome}</div>) : null}
              <TextField fullWidth variant="standard" margin='normal' required label="Email" name='email' onChange={props.handleChange} onBlur={props.handleBlur}/>
              {props.errors.email && props.touched.email ? (<div className={style.erro}>{props.errors.email}</div>) : null}
              <div className={style.genero_data}>
                <FormLabel  id="opcoes-genero">Gênero</FormLabel>
                <RadioGroup
                    onChange={props.handleChange}
                    row
                    aria-labelledby="opcoes-genero"
                    defaultValue="Feminino"
                    name="sexo"
                  >
                    <FormControlLabel value="Feminino" control={<Radio />} label="Feminino" />
                    <FormControlLabel value="Masculino" control={<Radio />} label="Masculino" />
                </RadioGroup>
                <TextField  type='date' fullWidth required label="Data de Nascimento" className={style.campo} InputLabelProps={{ shrink: true}} name='data' onChange={props.handleChange} onBlur={props.handleBlur}/>
                {props.errors.data && props.touched.data ? (<div className={style.erro}>{props.errors.data}</div>) : null}
              </div>
              
            </fieldset>

          </form>
        )}

      </Formik>
    </>
  )



}

export default Formulario;