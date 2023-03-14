import { Service } from 'typedi';
import { JWTProvider } from './Providers/JWTProvider';

import { authConfig } from '../../../config/auth';
import { AuthDTO } from '../../../api/types/Auth/AuthDTO';

@Service()
export class AuthServiceProvider {
  private provider: any;

  public constructor() {
    this.setProvider(authConfig.defaultProvider);
  }

  public setProvider(provider: string): this {
    switch (provider) {
      case 'jwt':
        this.provider = new JWTProvider();

      default:
        break;
    }

    return this;
  }

  public sign(payload: object, dataReturn: object): AuthDTO {
    return this.provider.sign(payload, dataReturn);
  }
}
