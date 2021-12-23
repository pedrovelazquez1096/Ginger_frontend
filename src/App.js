import React, { Component } from 'react';

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import axiosInstance from './AxiosInstance.js';


class App extends Component {
state={
  sensores: [],
  luces: [],
  actuadores: [],
  sensoresRegistros: [],
  lucesRegistros: [],
  actuadoresRegistros: [],
  modalInsertarLuz: false,
  modalInsertarSensor: false,
  modalInsertarActuador: false,
  modalEliminarLuz: false,
  modalEliminarSensor: false,
  modalEliminarActuador: false,
  formLuz:{
    id: '',
    nombre: '',
    descripcion: '',
    tipoLuz: '',
    ubicacion: '',
    unidades: '',
    tipoModal: ''
  },
  formSensor:{
    id: '',
    nombre: '',
    descripcion: '',
    tipoSensor: '',
    ubicacion: '',
    unidades: '',
    tipoModal: ''
  },
  formActuador:{
    id: '',
    nombre: '',
    descripcion: '',
    tipoActuador: 'a',
    ubicacion: '',
    unidades: '',
    tipoModal: ''
  }
}

peticionGetLuces=()=>{
  axiosInstance.get('/luz/luces').then(response=>{
    this.setState({luces: response.data}, () => {
      console.log(this.state.luces);
    });
  }).catch(error=>{
    console.log(error.message);
  })
}

peticionGetSensores=()=>{
  axiosInstance.get('/sensor/sensores').then(response=>{
    this.setState({sensores: response.data});
  }).catch(error=>{
    console.log(error.message);
  })
}

peticionGetActuadores=()=>{
  axiosInstance.get('/actuador/acturadores').then(response=>{
    this.setState({actuadores: response.data});
  }).catch(error=>{
    console.log(error.message);
  })
}

peticionGetLucesRegistros=()=>{
  axiosInstance.get('/luzregistro/registros').then(response=>{
    this.setState({lucesRegistros: response.data});
  }).catch(error=>{
    console.log(error.message);
  })
}

peticionGetSensoresRegistros=()=>{
  axiosInstance.get('/sensorregistro/registros').then(response=>{
    this.setState({sensoresRegistros: response.data});
  }).catch(error=>{
    console.log(error.message);
  })
}

peticionGetActuadoresRegistros=()=>{
  axiosInstance.get('/actuadorregistro/registros').then(response=>{
    this.setState({actuadoresRegistros: response.data});
  }).catch(error=>{
    console.log(error.message);
  })
}

modalInsertarLuz=()=>{
  this.setState({modalInsertarLuz: !this.state.modalInsertarLuz});
}
modalInsertarSensor=()=>{
  this.setState({modalInsertarSensor: !this.state.modalInsertarSensor});
}
modalInsertarActuador=()=>{
  this.setState({modalInsertarActuador: !this.state.modalInsertarActuador});
}

modalEliminarLuz=()=>{
  this.setState({modalInsertarLuz: !this.state.modalInsertarLuz});
}
modalEliminarSensor=()=>{
  this.setState({modalEliminarSensor: !this.state.modalEliminarSensor});
}
modalEliminarActuador=()=>{
  this.setState({modalEliminarActuador: !this.state.modalEliminarActuador});
}

handleChangeLuzForm=async e=>{
  e.persist();
  await this.setState({
    formLuz:{
      ...this.state.formLuz,         //Esta linea sirve para heredar todo lo que ya hay en el form y no se borre cuando el usuario escriba
      [e.target.name]: e.target.value
    }
  });
  console.log(this.state.formLuz);
}

handleChangeSensorForm=async e=>{
  e.persist();
  await this.setState({
    formSensor:{
      ...this.state.formSensor,         //Esta linea sirve para heredar todo lo que ya hay en el form y no se borre cuando el usuario escriba
      [e.target.name]: e.target.value
    }
  });
  console.log(this.state.formSensor);
}

handleChangeActuadorForm=async e=>{
  e.persist();
  await this.setState({
    formActuador:{
      ...this.state.formActuador,         //Esta linea sirve para heredar todo lo que ya hay en el form y no se borre cuando el usuario escriba
      [e.target.name]: e.target.value
    }
  });
  console.log(this.state.formActuador);
}

peticionPostLuz=async()=>{
  delete this.state.formLuz.id;
  await axiosInstance.post("/luz",this.state.formLuz).then(response=>{
    this.modalInsertarLuz();
    this.peticionGetLuces();
  }).catch(error=>{
    console.log(error.message);
  })
}

peticionPostSensor=async()=>{
  delete this.state.formSensor.id;
  await axiosInstance.post("/sensor",this.state.formSensor).then(response=>{
    this.modalInsertarSensor();
    this.peticionGetSensores();
  }).catch(error=>{
    console.log(error.message);
  })
}

peticionPostActuador=async()=>{
  delete this.state.formActuador.id;
  await axiosInstance.post("/actuador",this.state.formActuador).then(response=>{
    this.modalInsertarActuador();
    this.peticionGetActuadores();
  }).catch(error=>{
    console.log(error.message);
  })
}

seleccionarLuz=(luz)=>{
  this.setState({
    formLuz: {
      tipoModal: 'actualizar',
      id: luz.id,
      nombre: luz.nombre,
      descripcion: luz.descripcion,
      tipoLuz: luz.tipoLuz,
      ubicacion: luz.ubicacion,
      unidades: luz.unidades
    }
  })
}

seleccionarSensor=(sensor)=>{
  this.setState({
    formSensor: {
      tipoModal: 'actualizar',
      id: sensor.id,
      nombre: sensor.nombre,
      descripcion: sensor.descripcion,
      tipoSensor: sensor.tipoSensor,
      ubicacion: sensor.ubicacion,
      unidades: sensor.unidades
    }
  })
}

seleccionarActuador=(actuador)=>{
  this.setState({
    formActuador: {
      tipoModal: 'actualizar',
      id: actuador.id,
      nombre: actuador.nombre,
      descripcion: actuador.descripcion,
      tipoActuador: actuador.tipoActuador,
      ubicacion: actuador.ubicacion,
      unidades: actuador.unidades
    }
  })
}

peticionPutLuz=()=>{
  console.log(this.state.formLuz);
  delete this.state.formLuz.tipoModal;
  axiosInstance.put("/luz/"+this.state.formLuz.id, this.state.formLuz).then(response=>{
    this.modalInsertarLuz();
    this.peticionGetLuces();
  })
}

peticionPutSensor=()=>{
  console.log(this.state.formSensor);
  delete this.state.formSensor.tipoModal;
  axiosInstance.put("/sensor/"+this.state.formSensor.id, this.state.formSensor).then(response=>{
    this.modalInsertarSensor();
    this.peticionGetSensores();
  })
}

peticionPutActuador=()=>{
  console.log(this.state.formActuador);
  delete this.state.formActuador.tipoModal;
  axiosInstance.put("/actuador/"+this.state.formActuador.id, this.state.formActuador).then(response=>{
    this.modalInsertarActuador();
    this.peticionGetActuadores();
  })
}

peticionDeleteLuz=()=>{
  axiosInstance.delete("/luz/"+this.state.formLuz.id).then(response=>{
    this.setState({modalEliminarLuz: false});
    this.peticionGetLuces();
  })
}

peticionDeleteSensor=()=>{
  axiosInstance.delete("/sensor/"+this.state.formSensor.id).then(response=>{
    this.setState({modalEliminarSensor: false});
    this.peticionGetSensores();
  })
}

peticionDeleteActuador=()=>{
  axiosInstance.delete("/actuador/"+this.state.formActuador.id).then(response=>{
    this.setState({modalEliminarActuador: false});
    this.peticionGetActuadores();
  })
}

/////////////////////////////////////////////////////////////////////////

  componentDidMount() {
    this.peticionGetLuces();
    this.peticionGetSensores();
    this.peticionGetActuadores();

    this.peticionGetLucesRegistros();
    this.peticionGetSensoresRegistros();
    this.peticionGetActuadoresRegistros();
  }
  

  render(){
    const {formLuz}=this.state;
    const {formSensor}=this.state;
    const {formActuador}=this.state;
  return (
    <div className="App">
    <br /><br /><br />
    <button className="btn btn-success" onClick={()=>{this.setState({formLuz: null, tipoModal: 'insertar'}); this.modalInsertarLuz()}}>Agregar Luz</button>
    <button className="btn btn-success" onClick={()=>{this.setState({formSensor: null, tipoModal: 'insertar'}); this.modalInsertarSensor()}}>Agregar Sensor</button>
    <button className="btn btn-success" onClick={()=>{this.setState({formActuador: null, tipoModal: 'insertar'}); this.modalInsertarActuador()}}>Agregar Actuador</button>
    <br /><br />
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Descripcion</th>
          <th>Tipo de Luz</th>
          <th>Ubicacion</th>
          <th>Unidades</th>
        </tr>
      </thead>
      <tbody>
        {this.state.luces.map(luz=>{
          return(
          <tr>
            <td>{luz.id}</td>
            <td>{luz.nombre}</td>
            <td>{luz.descripcion}</td>
            <td>{luz.tipoLuz}</td>
            <td>{luz.ubicacion}</td>
            <td>{luz.unidades}</td>
            <td>
              <button className="btn btn-primary" onClick={()=>{this.seleccionarLuz(luz); this.modalInsertarLuz()}}><FontAwesomeIcon icon={faEdit}/></button>
              {"   "}
              <button className="btn btn-danger" onClick={() =>{this.seleccionarLuz(luz); this.setState({modalEliminarLuz: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
            </td>
          </tr>
          )
        })}
      </tbody>
    </table>
    <br /><br />
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Descripcion</th>
          <th>Tipo de sensor</th>
          <th>Ubicacion</th>
          <th>Unidades</th>
        </tr>
      </thead>
      <tbody>
        {this.state.sensores.map(sensor=>{
          return(
          <tr>
            <td>{sensor.id}</td>
            <td>{sensor.nombre}</td>
            <td>{sensor.descripcion}</td>
            <td>{sensor.tipoSensor}</td>
            <td>{sensor.ubicacion}</td>
            <td>{sensor.unidades}</td>
            <td>
              <button className="btn btn-primary" onClick={()=>{this.seleccionarSensor(sensor); this.modalInsertarSensor()}}><FontAwesomeIcon icon={faEdit}/></button>
              {"   "}
              <button className="btn btn-danger" onClick={() =>{this.seleccionarSensor(sensor); this.setState({modalEliminarSensor: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
            </td>
          </tr>
          )
        })}
      </tbody>
    </table>
    
    <br /><br />
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Descripcion</th>
          <th>Tipo de actuador</th>
          <th>Ubicacion</th>
          <th>Unidades</th>
        </tr>
      </thead>
      <tbody>
        {this.state.actuadores.map(actuador=>{
          return(
          <tr>
            <td>{actuador.id}</td>
            <td>{actuador.nombre}</td>
            <td>{actuador.descripcion}</td>
            <td>{actuador.tipoActuador}</td>
            <td>{actuador.ubicacion}</td>
            <td>{actuador.unidades}</td>
            <td>
              <button className="btn btn-primary" onClick={()=>{this.seleccionarActuador(actuador); this.modalInsertarActuador()}}><FontAwesomeIcon icon={faEdit}/></button>
              {"   "}
              <button className="btn btn-danger" onClick={() =>{this.seleccionarActuador(actuador); this.setState({modalEliminarActuador: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
            </td>
          </tr>
          )
        })}
      </tbody>
    </table>
    
    <br /><br />
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>ID de la luz</th>
          <th>Timestamp</th>
          <th>valor</th>
          <th>Ya fue aplicado?</th>
        </tr>
      </thead>
      <tbody>
        {this.state.lucesRegistros.map(luz=>{
          return(
          <tr>
            <td>{luz.id}</td>
            <td>{luz.idLuz}</td>
            <td>{luz.timeStamp}</td>
            <td>{luz.valor}</td>
            <td>{luz.aplicado}</td>
            <td>
              <button className="btn btn-primary" ><FontAwesomeIcon icon={faEdit}/></button>
              {"   "}
              <button className="btn btn-danger" ><FontAwesomeIcon icon={faTrashAlt}/></button>
            </td>
          </tr>
          )
        })}
      </tbody>
    </table>
    <br /><br />
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>ID del Sensor</th>
          <th>Timestamp</th>
          <th>valor</th>
          <th>Ya fue aplicado?</th>
        </tr>
      </thead>
      <tbody>
        {this.state.sensoresRegistros.map(sensor=>{
          return(
          <tr>
            <td>{sensor.id}</td>
            <td>{sensor.idSensor}</td>
            <td>{sensor.timeStamp}</td>
            <td>{sensor.valor}</td>
            <td>{sensor.aplicado}</td>
            <td>
              <button className="btn btn-primary" ><FontAwesomeIcon icon={faEdit}/></button>
              {"   "}
              <button className="btn btn-danger" ><FontAwesomeIcon icon={faTrashAlt}/></button>
            </td>
          </tr>
          )
        })}
      </tbody>
    </table>
    <br /><br />
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>ID del Actuador</th>
          <th>Timestamp</th>
          <th>valor</th>
          <th>Ya fue aplicado?</th>
        </tr>
      </thead>
      <tbody>
        {this.state.actuadoresRegistros.map(actuador=>{
          return(
          <tr>
            <td>{actuador.id}</td>
            <td>{actuador.idActuador}</td>
            <td>{actuador.timeStamp}</td>
            <td>{actuador.valor}</td>
            <td>{actuador.aplicado}</td>
            <td>
              <button className="btn btn-primary" ><FontAwesomeIcon icon={faEdit}/></button>
              {"   "}
              <button className="btn btn-danger" ><FontAwesomeIcon icon={faTrashAlt}/></button>
            </td>
          </tr>
          )
        })}
      </tbody>
    </table>

    <Modal isOpen={this.state.modalInsertarLuz}>
      <ModalHeader style={{display: 'block'}}>
        <span style={{float: 'right'}} onClick={()=>this.modalInsertarLuz()}>x</span>
      </ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input className="form-control" type="text" placeholder='Lampara buro' name="nombre" id="nombre" onChange={this.handleChangeLuzForm} value={formLuz?formLuz.nombre: ''}/>
          <br />
          <label htmlFor="nombre">Descripcion</label>
          <input className="form-control" type="text" placeholder='Lampara buro del cuarto' name="descripcion" id="descripcion" onChange={this.handleChangeLuzForm} value={formLuz?formLuz.descripcion: ''}/>
          <br />
          <label htmlFor="capital_bursatil">Tipo de Luz</label>
          <input className="form-control" type="text" placeholder='WRGB' name="tipoLuz" id="tipoLuz" onChange={this.handleChangeLuzForm} value={formLuz?formLuz.tipoLuz: ''}/>
          <br />
          <label htmlFor="nombre">Ubicacion</label>
          <input className="form-control" type="text" placeholder='Sala' name="ubicacion" id="ubicacion" onChange={this.handleChangeLuzForm} value={formLuz?formLuz.ubicacion: ''}/>
          <br />
          <label htmlFor="nombre">Unidades</label>
          <input className="form-control" type="text" placeholder='% PWM' name="unidades" id="unidades" onChange={this.handleChangeLuzForm} value={formLuz?formLuz.unidades: ''}/>
        </div>
      </ModalBody> 

      <ModalFooter>
        {this.state.tipoModal === 'insertar' ?
          <button className="btn btn-success" onClick={()=>this.peticionPostLuz()}>
            Crear Luz
          </button>: <button className="btn btn-primary" onClick={()=>this.peticionPutLuz()}>
            Cambiar
          </button>
        }
          
          <button className="btn btn-danger" onClick={()=>this.modalInsertarLuz()}>Cancelar</button>
      </ModalFooter>
    </Modal>
    
    <Modal isOpen={this.state.modalInsertarSensor}>
      <ModalHeader style={{display: 'block'}}>
        <span style={{float: 'right'}} onClick={()=>this.modalInsertarSensor()}>x</span>
      </ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input className="form-control" type="text" placeholder='Sensor de humo' name="nombre" id="nombre" onChange={this.handleChangeSensorForm} value={formSensor?formSensor.nombre: ''}/>
          <br />
          <label htmlFor="nombre">Descripcion</label>
          <input className="form-control" type="text" placeholder='Sensor de humo de la sala' name="descripcion" id="descripcion" onChange={this.handleChangeSensorForm} value={formSensor?formSensor.descripcion: ''}/>
          <br />
          <label htmlFor="capital_bursatil">Tipo de Sensor</label>
          <input className="form-control" type="text" placeholder='Humo' name="tipoSensor" id="tipoSensor" onChange={this.handleChangeSensorForm} value={formSensor?formSensor.tipoSensor: ''}/>
          <br />
          <label htmlFor="nombre">Ubicacion</label>
          <input className="form-control" type="text" placeholder='Sala' name="ubicacion" id="ubicacion" onChange={this.handleChangeSensorForm} value={formSensor?formSensor.ubicacion: ''}/>
          <br />
          <label htmlFor="nombre">Unidades</label>
          <input className="form-control" type="text" placeholder='PPM' name="unidades" id="unidades" onChange={this.handleChangeSensorForm} value={formSensor?formSensor.unidades: ''}/>
        </div>
      </ModalBody> 

      <ModalFooter>
        {this.state.tipoModal === 'insertar' ?
          <button className="btn btn-success" onClick={()=>this.peticionPostSensor()}>
            Crear Sensor
          </button>: <button className="btn btn-primary" onClick={()=>this.peticionPutSensor()}>
            Cambiar
          </button>
        }
          <button className="btn btn-danger" onClick={()=>this.modalInsertarSensor()}>Cancelar</button>
      </ModalFooter>
    </Modal>
    
    <Modal isOpen={this.state.modalInsertarActuador}>
      <ModalHeader style={{display: 'block'}}>
        <span style={{float: 'right'}} onClick={()=>this.modalInsertarActuador()}>x</span>
      </ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input className="form-control" type="text" placeholder='Bomba de agua' name="nombre" id="nombre" onChange={this.handleChangeActuadorForm} value={formActuador?formActuador.nombre: ''}/>
          <br />
          <label htmlFor="nombre">Descripcion</label>
          <input className="form-control" type="text" placeholder='Bomba de agua para regar plantas' name="descripcion" id="descripcion" onChange={this.handleChangeActuadorForm} value={formActuador?formActuador.descripcion: ''}/>
          <br />
          <label htmlFor="capital_bursatil">Tipo de actuador</label>
          <input className="form-control" type="text" placeholder='Bomba 12V' name="tipoActuador" id="tipoActuador" onChange={this.handleChangeActuadorForm} value={formActuador?formActuador.tipoActuador: ''}/>
          <br />
          <label htmlFor="nombre">Ubicacion</label>
          <input className="form-control" type="text" placeholder='Sala' name="ubicacion" id="ubicacion" onChange={this.handleChangeActuadorForm} value={formActuador?formActuador.ubicacion: ''}/>
          <br />
          <label htmlFor="nombre">Unidades</label>
          <input className="form-control" type="text" placeholder='PPM' name="unidades" id="unidades" onChange={this.handleChangeActuadorForm} value={formActuador?formActuador.unidades: ''}/>
        </div>
      </ModalBody> 

      <ModalFooter>
        {this.state.tipoModal === 'insertar' ?
          <button className="btn btn-success" onClick={()=>this.peticionPostActuador()}>
            Crear actuador
          </button>: <button className="btn btn-primary" onClick={()=>this.peticionPutActuador()}>
            Cambiar
          </button>
        }
          <button className="btn btn-danger" onClick={()=>this.modalInsertarActuador()}>Cancelar</button>
      </ModalFooter>
    </Modal>

    <Modal isOpen={this.state.modalEliminarLuz}>
      <ModalBody>
          Estás seguro que deseas eliminar esta luz {formLuz && formLuz.nombre}
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-danger" onClick={()=>this.peticionDeleteLuz()}>Sí</button>
        <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminarLuz: false})}>No</button>
      </ModalFooter>
    </Modal>

    <Modal isOpen={this.state.modalEliminarSensor}>
      <ModalBody>
          Estás seguro que deseas eliminar este sensor {formSensor && formSensor.nombre}
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-danger" onClick={()=>this.peticionDeleteSensor()}>Sí</button>
        <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminarSensor: false})}>No</button>
      </ModalFooter>
    </Modal>

    <Modal isOpen={this.state.modalEliminarActuador}>
      <ModalBody>
          Estás seguro que deseas eliminar este actuador {formActuador && formActuador.nombre}
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-danger" onClick={()=>this.peticionDeleteActuador()}>Sí</button>
        <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminarActuador: false})}>No</button>
      </ModalFooter>
    </Modal>
  </div>



  );
}
}
export default App;
