import { Base } from '../core/base.model';

export interface AuthModel extends Base {
  accessToken?: string;
  refreshToken?: string;
  expiresOn?: Date;
}

export interface UserProfile {
  infoPersonal?: string;
  rolePersonal?: string;
}

export interface UserRol {
  user?: {
    usuarioId: any,
    usuario?: string,
    nombre?: string,
    perfil?: string;
  };
  pages?: Array<{
    menu: string;
    pagina: string;
  }>;
}
