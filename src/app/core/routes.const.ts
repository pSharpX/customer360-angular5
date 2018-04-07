export class RoutesMap {
  static HOME = '';
  static TEMPLATE = 'template';

  static AUTH = `${RoutesMap.HOME}auth`;
  static AUTH_LOGIN = 'login';
  static AUTH_LOGOUT = 'logout';
  static AUTH_GUEST = '401';
  static SERVER_ERROR = '500';

  static SESSION_EXPIRED = 'expired';

  static CLIENTE = `${RoutesMap.HOME}clientes`;
  static DETAIL = `detail`;
  static CREATE = `create`;
  static LIST = `list`;
  static EDIT = `edit`;
  static REMOVE = `remove`;

  static VENTAS = `ventas`;
  static COTIZACIONES = `cotizaciones`;
  static CAMPAÑAS = `campanas`;
  static DESCUENTOS = `descuentos`;
  static PROMOCIONES = `promociones`;
  static RECLAMOS = `reclamos`;
  static CITAS = `citas`;

  static REPORTE = `${RoutesMap.HOME}reportes`;
  static REPORTE_1 = `reporte_1`;
  static REPORTE_2 = `reporte_2`;
  static REPORTE_3 = `reporte_3`;

  static ADMINISTRACION = `${RoutesMap.HOME}administracion`;
  static VISORSINCRONIZACION = `visorsincronizacion`;

}
