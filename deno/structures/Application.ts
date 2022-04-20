import { Team } from './Team.ts';
import { User } from './User.ts';

interface Application {
  id: string;
  name: string;
  icon: string;
  description: string;
  rpc_origins?: string[];
  bot_public: boolean;
  bot_require_code_grant: boolean;
  terms_of_service_url: string;
  privacy_policy_url: string;
  owner?: User;
  verify_key: string;
  team?: Team;
  guild_id?: string;
  primary_sku_id?: string;
  slug?: string;
  cover_image?: string;
  flags?: number;
  tags?: string[];
  install_params?: InstallParams;
  custom_install_url?: string;
}

interface InstallParams {
  scopes: string[];
  permission: string;
}

export type { Application, InstallParams };
