import { Base } from '../core/base.model';

export interface ClienteModel extends Base {
  idCliente: any;
  nombre?: string;
  nombreCompleto?: string;
  apellidoPaterno?: string;
  apellidoMaterno?: string;
  razonSocial?: string;
  tipoPersona?: string;
  tipoPersonaNombre?: string;
  fechaNacimiento?: Date;
  correo?: string;
  numeroDocumento?: string;
  ruc?: string;
  genero?: string;
  asesor?: string;
  telefono?: string;
  celular?: string;
  estadoCivil?: string;
  direccion?: string;
  distrito?: string;
  codigoDistrito?: any;
  provincia?: string;
  codigoProvincia?: any;
  departamento?: string;
  codigoDepartamento?: any;
  codigoPostal?: string;
  pais?: string;
  idPais?: any;
  contactoDocumento?: string;
  nombreContacto?: string;
  apellidoPaternoContacto?: string;
  apellidoMaternoContacto?: string;
  sexoContacto?: string;
  sexoContactoNombre?: string;
  telefonoContacto?: string;
  celularContacto?: string;
  correoContacto?: string;
}

export enum TipoPersona {
  NATURAL = '0001',
  JURIDICA = '0002'
}

export enum PaisConstante {
  PERU = 162,
  CODIGO_PAIS = 'PE',
  OTROS = 'OT'
}
