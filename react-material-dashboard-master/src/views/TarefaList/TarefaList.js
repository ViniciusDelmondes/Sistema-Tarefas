import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
    listar, 
    salvar, 
    deletar,
    alterarStatus
  } from '../../store/tarefasReducer'

import { TarefasToolbar, TarefasTable } from './components';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core'

import axios from 'axios'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const API_URL = 'https://minhastarefas-api.herokuapp.com/tarefas'


const TarefaList = (props) => {
  const classes = useStyles();

  const [tarefas, setTarefas] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [mensagem, setMensagem] = useState('')



  useEffect( () => {
    props.listar();
  }, [])
  

  return (
    <div className={classes.root}>
      <TarefasToolbar salvar={props.salvar}/>
      <div className={classes.content}>
        <TarefasTable alterarStatus={props.alterarStatus} 
                      deleteAction={props.deletar}
                      tarefas={props.tarefas} />
      </div>
      <Dialog open={openDialog} onClose={e => setOpenDialog(false)}>
        <DialogTitle> Aviso! </DialogTitle>
        <DialogContent> 
            {mensagem}
        </DialogContent>
        <DialogActions>
          <Button onClick={e => setOpenDialog(false)}> fechar </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}; 

const mapStateToProps = state => ({
    tarefas: state.tarefas.tarefas
})

const mapDispatchToProps = dispatch => 
  bindActionCreators({
    listar, 
    salvar, 
    deletar, 
    alterarStatus
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TarefaList);
