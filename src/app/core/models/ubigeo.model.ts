import { Base } from '../base.model';

export interface UbigeoModel extends Base {
  CodigoDepartamento: string ;
  CodigoProvincia: string ;
  CodigoDistrito: string ;
  Nombre?: string ;
}
