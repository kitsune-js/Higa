import axios from 'axios';
import { APIVersions } from '../..';

interface AccesTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

class Oauth2Manager {
  /**
   * Bot's id
   */
  readonly #cliend_id: string;

  /**
   * Bot's secret
   */
  readonly #client_secret: string;

  /**
   * API Version
   */
  public readonly version: APIVersions;

  /**
   * @param id - Bot's id
   * @param secret - Bot's secret
   * @param version - API Version
   */
  constructor(id: string, secret: string, version: APIVersions) {
    this.#cliend_id = id;
    this.#client_secret = secret;
    this.version = version;
  }

  /**
   * Get an access token
   * @param {string} code - The code you got from the redirect URI
   * @param {string} redirectURI - The redirect URI you used when you created the application.
   * @returns {Promise<AccesTokenResponse>}
   */
  public async getAccessToken(
    code: string,
    redirectURI: string
  ): Promise<AccesTokenResponse> {
    const res = await axios.post<AccesTokenResponse>(
      `https://discord.com/api/v${this.version}/oauth2/token`,
      `client_id=${this.#cliend_id}&client_secret=${
        this.#client_secret
      }&grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(
        redirectURI
      )}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    return res.data;
  }

  /**
   * Refresh access token
   * @param {string} refreshToken - The refresh token you got from the initial authorization.
   * @returns {Promise<AccesTokenResponse>}
   */
  public async refreshAccessToken(
    refreshToken: string
  ): Promise<AccesTokenResponse> {
    const res = await axios.post<AccesTokenResponse>(
      `https://discord.com/api/v${this.version}/oauth2/token`,
      `client_id=${this.#cliend_id}&client_secret=${
        this.#client_secret
      }&grant_type=refresh_token&refresh_token=${refreshToken}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    return res.data;
  }
}

export { Oauth2Manager, AccesTokenResponse };
