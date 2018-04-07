import { Base } from '../core/base.model';

export interface CotizacionModel extends Base {
  idCotizacion: any;
  codigoMarca: string;
  nombreMarca: string;
  codigoModelo: string;
  nombreModelo: string;
  nombreColor: string;
  nombreEstado: string;
  añoModelo: any;
  añoFabricacion: any;
  codigoFamilia: string;
  nombreFamilia: string;
  nombreComercial: string;
  nombreCarroceria: string;
  nombreCliente: string;
  numeroDocumento: string;
  tipoCliente: string;
  nombreEmpleado: string;
  nombreJefeVentas: string;
  numeroCotizacion: string;
  fechaRegistro: Date;
  fechaUltimoContacto: Date;
  montoPrecioVenta: number;
  montoPrecioCierre: number;
  cantidad: number;
  codigoTipoVenta: string;
  nombreTipoVenta: string;
  observacion: any;
  idPuntoVenta: any;
  nombrePuntoVenta: string;
  codigoCanalVenta: string;
  nombreCanalVenta: string;
  idUbica: any;
  nombreUbica: any;
}
