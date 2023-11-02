import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
} from '@mui/material';

const ListaPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [pedidoEditando, setPedidoEditando] = useState(null);
  const [openEditarDialog, setOpenEditarDialog] = useState(false);

  // Definir los estados para cada campo de edición
  const [nombreEditando, setNombreEditando] = useState('');
  const [precioEditando, setPrecioEditando] = useState('');
  const [cantidadEditando, setCantidadEditando] = useState('');
  const [descripcionEditando, setDescripcionEditando] = useState('');
  const [estadoEditando, setEstadoEditando] = useState('');
  const [totalEditando, setTotalEditando] = useState('');

  useEffect(() => {
    obtenerPedidos();
  }, []);

  const obtenerPedidos = () => {
    axios.get('http://127.0.0.1:8000/producto')
      .then(response => {
        setPedidos(response.data.content);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleEliminar = (id) => {
    axios.delete(`http://127.0.0.1:8000/producto/${id}`)
      .then(response => {
        console.log(`Pedido con ID ${id} eliminado correctamente`);
        obtenerPedidos(); // Actualizar la lista de pedidos después de la eliminación
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleEditar = (pedido) => {
    console.log("Pedido seleccionado para editar:", pedido);
    console.log("Pedido seleccionado para editar:", pedido.nombre);
    setPedidoEditando(pedido);
    setNombreEditando(pedido.nombre);
    setPrecioEditando(pedido.precio);
    setCantidadEditando(pedido.cantidad);
    setDescripcionEditando(pedido.descripcion);
    setEstadoEditando(pedido.estado);
    setTotalEditando(pedido.total);

    setOpenEditarDialog(true);
  };

  const handleGuardarEdicion = () => {
    const datosEditados = {
      nombre: nombreEditando,
      precio: precioEditando,
      cantidad: cantidadEditando,
      descripcion: descripcionEditando,
      estado: estadoEditando,
      total: totalEditando
      // Agrega aquí los campos restantes si es necesario
    };

    axios.put(`http://127.0.0.1:8000/producto/${pedidoEditando.id}`, datosEditados)
      .then(response => {
        console.log(`Pedido con ID ${pedidoEditando.id} editado correctamente`);
        obtenerPedidos(); // Actualiza la lista de pedidos después de la edición
      })
      .catch(error => {
        console.log(error);
      });

    setOpenEditarDialog(false);
  };


  // ----------------------------------------------------------

  const handleNuevoPedido = () => {
    setPedidoEditando(null); // Para indicar que no se está editando un pedido existente
    setNombreEditando('');
    setPrecioEditando('');
    setCantidadEditando('');
    setDescripcionEditando('');
    setEstadoEditando('');
    setTotalEditando('');
    setOpenEditarDialog(true);
  };

  const handleGuardarNuevoPedido = () => {
    const nuevoPedido = {
      nombre: nombreEditando,
      precio: precioEditando,
      cantidad: cantidadEditando,
      descripcion: descripcionEditando,
      estado: estadoEditando,
      total: totalEditando
      // Puedes añadir más campos aquí si es necesario
    };

    axios.post('http://127.0.0.1:8000/producto', nuevoPedido)
      .then(response => {
        console.log('Nuevo pedido agregado correctamente:', response.data);
        obtenerPedidos(); // Actualiza la lista de pedidos después de agregar el nuevo pedido
      })
      .catch(error => {
        console.error('Error al agregar un nuevo pedido:', error);
      });

    setOpenEditarDialog(false);
  };


  // ----------------------------------------------------------
  return (
    <div>
      <h1>Lista de Pedidos</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleNuevoPedido()}
      >
        Agregar Pedido
      </Button>
      <TableContainer component={Paper}>
        <Table className="miTablaCSS">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Total</TableCell>
              <TableCell >Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pedidos.map(pedido => (
              <TableRow key={pedido.id}>
                <TableCell>{pedido.nombre}</TableCell>
                <TableCell>{pedido.precio}</TableCell>
                <TableCell>{pedido.cantidad}</TableCell>
                <TableCell>{pedido.descripcion}</TableCell>
                <TableCell>{pedido.estado}</TableCell>
                <TableCell>{pedido.total}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEditar(pedido)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleEliminar(pedido.id)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Diálogo para la edición */}
      <Dialog open={openEditarDialog} onClose={() => setOpenEditarDialog(false)}>
        <DialogTitle>Editar Pedido</DialogTitle>
        <DialogContent>
          {pedidoEditando && (
            <div>
              <div>
                <TextField
                  label="Nombre"
                  value={pedidoEditando ? nombreEditando || pedidoEditando.nombre : ''}
                  onChange={(e) => setNombreEditando(e.target.value)}
                />
              </div>
              <div>
                <TextField
                  label="Precio"
                  value={pedidoEditando ? precioEditando || pedidoEditando.precio : ''}
                  onChange={(e) => setPrecioEditando(e.target.value)}
                />
              </div>
              <div>
                <TextField
                  label="Cantidad"
                  value={pedidoEditando ? cantidadEditando || pedidoEditando.cantidad : ''}
                  onChange={(e) => setCantidadEditando(e.target.value)}
                />
              </div>
              <div>
                <TextField
                  label="Descripcion"
                  value={pedidoEditando ? descripcionEditando || pedidoEditando.descripcion : ''}
                  onChange={(e) => setDescripcionEditando(e.target.value)}
                />
              </div>
              <div>
                <TextField
                  label="Estado"
                  value={pedidoEditando ? estadoEditando || pedidoEditando.estado : ''}
                  onChange={(e) => setEstadoEditando(e.target.value)}
                />
              </div>
              <div>
                <TextField
                  label="Total"
                  value={pedidoEditando ? totalEditando || pedidoEditando.total : ''}
                  onChange={(e) => setTotalEditando(e.target.value)}
                />
              </div>
              {/* Resto de los campos (precio, cantidad, descripción, estado, total) con TextField */}
              <Button onClick={handleGuardarEdicion}>Guardar</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>


      {/* Diálogo para agregar un nuevo pedido */}
      <Dialog open={openEditarDialog} onClose={() => setOpenEditarDialog(false)}>
        <DialogTitle>{pedidoEditando ? 'Editar Pedido' : 'Agregar Nuevo Pedido'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Nombre"
            value={nombreEditando}
            onChange={(e) => setNombreEditando(e.target.value)}
          />
          <TextField
            label="Precio"
            value={precioEditando}
            onChange={(e) => setPrecioEditando(e.target.value)}
          />
          <TextField
            label="Cantidad"
            value={cantidadEditando}
            onChange={(e) => setCantidadEditando(e.target.value)}
          />
          <TextField
            label="Descripción"
            value={descripcionEditando}
            onChange={(e) => setDescripcionEditando(e.target.value)}
          />
          <TextField
            label="Estado"
            value={estadoEditando}
            onChange={(e) => setEstadoEditando(e.target.value)}
          />
          <TextField
            label="Total"
            value={totalEditando}
            onChange={(e) => setTotalEditando(e.target.value)}
          />
          <Button onClick={handleGuardarNuevoPedido}>
            Agregar
          </Button>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default ListaPedidos;


