export enum TimeOut_UnitOfTime {
  SECONDS = 'seconds',
  MINUTES = 'minutes',
  HOURS = 'hours'
}

export class HttpConst {
  // SERVIDOR HUNDRED
  // static HOSTNAME = '10.100.97.31';
  // static PORT = '86';
  // SERVIDOR GILDEMEISTER
  // static HOSTNAME = '172.20.19.122';
  // static PORT = '81';
  // SERVIDOR LOCAL
  static HOSTNAME = 'localhost';
  static PORT = '54703';
  static SCHEME = 'http';
  static apiUrl = `${HttpConst.SCHEME}://${HttpConst.HOSTNAME}:${
    HttpConst.PORT
  }/api`;

  static TIMEOUT_UNIT_OF_TIME: TimeOut_UnitOfTime = TimeOut_UnitOfTime.MINUTES;
  static TIMEOUT = 2;

  static LOCAL_STORAGE_KEY_TOKEN = 'auth_hnd_Token';
  static USUARIO_ROL = 'rol_user';
  static DATOS_USUARIO = 'datoPersonal';
}
