import React, { useState, useRef } from 'react';
import { Input, Col, Row } from 'antd';
import InputText from '../InputText';
import InputNumber from '../InputNumber';
import ComboList from '../ComboList';

const { TextArea } = Input;
function Encabezado(props) {
	const {
		codigo,
		setCodigo,
		documento,
		setDocumento,
		nombre,
		numero,
		prefijo,
		descripcion,
		setDescripcion,
		cantidad,
		setCantidad,
		traerCliente,
		datosNombre,
		cargarClientes,
		cargando,
		traerArticulo,
		datosDescripcion,
		cargarArticulos,
		setValorUni,
		valorUni,
		setValorTotal,
		valorTotal,
		asignarDocumento,
		guardarTabla,
		setNombre,
		asignarCodigo,
		setdisabledDescripcion,
		setdisabledCodigo,
		setdisabledDocumento,
		setdisabledCantidad,
		disabledDescripcion,
		disabledCodigo,
		disabledDocumento,
		disabledCantidad,
		disabledNombre,
		setdisabledNombre,
		alertaError,
	} = props;

	const onChangeCodigo = (e) => {
		setCodigo(e.target.value.toUpperCase());
	};

	const onChangeDocumento = (e) => {
		if (nombre) {
			setdisabledDescripcion(true);
			setdisabledCodigo(true);
		}
		if (e.target.value === '') {
			setdisabledNombre(false);
			setNombre();
		}
		setDocumento(e.target.value.toUpperCase());
	};

	const onChangeDescripcion = (e) => {
		asignarCodigo(e.key);
		setDescripcion(e);
		setdisabledCantidad(false);
	};

	const onChangeCantidad = (e) => {
		setCantidad(e);
		if (e > 0 && valorUni > 0) {
			setValorTotal(e * valorUni);
		} else {
			setValorTotal(0);
		}
	};

	const onChangeValorUni = (e) => {
		setValorUni(e);
		setdisabledCantidad(false);
		if (cantidad > 0 && e > 0) {
			setValorTotal(cantidad * e);
		}
	};

	const onChangeNombre = (e) => {
		if (e.key) {
			asignarDocumento(e.key);
			traerCliente(e.key);
			setNombre(e);
			setdisabledCodigo(false);
			setdisabledDescripcion(false);
		} else {
			setdisabledCodigo(false);
			setdisabledDescripcion(true);
		}
	};

	const onBlurDocumento = (e) => {
		if (documento) {
			if (traerCliente(documento)) {
				setdisabledNombre(true);
				setdisabledCodigo(false);
				setdisabledDescripcion(false);
			} else {
				setdisabledCodigo(false);
				setdisabledDescripcion(false);
			}
		} else {
			setdisabledNombre(false);
			setdisabledDocumento(true);
		}
	};

	const onFocusNombre = (e) => {
		if (documento) {
			if (traerCliente(documento)) {
				setdisabledNombre(true);
				setdisabledCodigo(false);
				setdisabledDescripcion(false);
			} else {
				setdisabledCodigo(false);
				setdisabledDescripcion(false);
			}
		} else {
			setdisabledNombre(false);
			setdisabledDocumento(true);
		}
	};

	const onSearchNombre = (e) => {
		cargarClientes(e.toUpperCase());
	};

	const onSearchDescripcion = (e) => {
		cargarArticulos(e.toUpperCase());
	};

	const onFocusDescripcion = async (e) => {
		if (documento && nombre) {
		} else {
			alertaError(
				'Error de validación',
				'Elija primero un cliente antes de comenzar a facturar'
			);
			setdisabledDescripcion(true);
		}
		/* if (codigo) {
      const res = await traerArticulo(codigo);
      if (res === true) {
        setdisabledDescripcion(true);
      }
    } else {
      setdisabledDescripcion(false);
      setdisabledCodigo(true);
    }*/
	};
	const onBlurCantidad = (e) => {
		if (valorTotal > 0) {
			if (guardarTabla()) {
				nuevoarticulo();
			}
		} else {
			alertaError(
				'Cantidad o Precio Erroneos',
				'La Cantidad o El Precio No Pueden Ser 0'
			);
			setdisabledDescripcion(false);
			setdisabledCodigo(true);
		}
	};

	const onFocusCodigo = () => {
		if (documento && nombre) {
		} else {
			alertaError(
				'Error de validación',
				'Elija primero un cliente antes de comenzar a facturar'
			);
		}
	};

	const onBlurDescripcion = () => {
		if (descripcion) {
		} else {
			setdisabledCodigo(false);
			setdisabledDescripcion(true);
		}
	};
	const onBlurCodigo = async () => {
		if (codigo) {
			const res = await traerArticulo(codigo);
			if (res === true) {
				setdisabledDescripcion(true);
				setdisabledCantidad(false);
			}
		} else {
			setdisabledDescripcion(false);
			setdisabledCodigo(true);
		}
	};

	const nuevoarticulo = () => {
		setdisabledDescripcion(false);
		setdisabledCodigo(false);
		setdisabledDocumento(true);
		setdisabledNombre(true);
		setdisabledCantidad(true);
		setCodigo('');
		setDescripcion([]);
		setCantidad(0);
		setValorTotal(0);
		setValorUni(0);
	};

	return (
		<div>
			<Input.Group>
				<Row gutter={10}>
					<Col span={2}>
						<InputText
							text='Prefijo'
							value={prefijo}
							size={{ width: '100%' }}
							disabled={true}
						/>
					</Col>
					<Col span={3}>
						<InputText
							text='Número'
							value={numero}
							size={{ width: '100%' }}
							disabled={true}
						/>
					</Col>
					<Col span={15}>
						<TextArea />
					</Col>
				</Row>
				<Row gutter={5}>
					<Col span={3}>
						<InputText
							text='Código'
							onChange={onChangeCodigo}
							value={codigo}
							size={{ width: '100%' }}
							disabled={disabledCodigo}
							onBlur={onBlurCodigo}
							onFocus={onFocusCodigo}
						/>
					</Col>
					<Col span={10}>
						<ComboList
							title='Decripción'
							size={{ width: '100%' }}
							disabled={disabledDescripcion}
							datos={datosDescripcion}
							onSearch={onSearchDescripcion}
							cargando={cargando}
							value={descripcion}
							onFocus={onFocusDescripcion}
							onChange={onChangeDescripcion}
							onBlur={onBlurDescripcion}
						/>
					</Col>
					<Col span={3}>
						<InputNumber
							onChange={onChangeValorUni}
							value={valorUni}
							text='Valor Un.'
							size={{ width: '100%' }}
							disabled={true}
						/>
					</Col>
					<Col span={3}>
						<InputNumber
							text='Cantidad'
							onChange={onChangeCantidad}
							value={cantidad}
							size={{ width: '100%' }}
							onBlur={onBlurCantidad}
							disabled={disabledCantidad}
						/>
					</Col>
					<Col span={4}>
						<InputNumber
							value={valorTotal}
							text='Total'
							size={{ width: '100%' }}
							disabled={true}
						/>
					</Col>
				</Row>
			</Input.Group>
		</div>
	);
}
export default Encabezado;
