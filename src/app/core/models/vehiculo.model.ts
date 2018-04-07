import { Base } from '../base.model';
import { MarcaModel } from './marca.model';
import { ModeloModel } from './modelo.model';

export interface VehiculoModel extends Base {
  NidVehiculo: number;
  NidVin?: number;
  NuPlaca?: string;
  NidMarca?: number;
  NidModelo?: string;
  NidMarcaNavigation?: MarcaModel;
  NidModeloNavigation?: ModeloModel;
}
