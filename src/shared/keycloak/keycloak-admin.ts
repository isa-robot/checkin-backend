'use strict';

import {object} from "yup";

const adminClient = require('keycloak-admin-client');
const getToken = require('keycloak-request-token');
const request = require('request-promise-native');

class AdminClient {

  private config: any
  private request: KeyCloakAdminRequest

  constructor() {
    this.config = AdminClient.createAdminClientConfig();
    this.request = new KeyCloakAdminRequest(this.config);
  }

  static createAdminClientConfig() {
    const config = {
      serverUrl: "http://localhost:8080",
      username: "admin",
      password: "admin",
      realm: "isa-qualis"
    }
    const authServerUrl = `${config.serverUrl}/auth`;
    return {
      baseUrl: authServerUrl,
      realm: config.realm,
      username: config.username,
      password: config.password,
      grant_type: 'password',
      client_id: 'admin-cli'
    };
  }

  usersList() {
    return adminClient(this.config)
      .then((client:any) => client.users.find(this.config.realm))
  }

  getUserByName(username: any) {
    return adminClient(this.config)
      .then((client:any) => client.users.find(this.config.realm, {username: username}))
      .then((users:any) => {
        return users ? Promise.resolve(users) : Promise.reject('user not found');
        }
      );
  }

  getUserById(userId:any) {
    return adminClient(this.config)
      .then((client:any) => client.users.find(this.config.realm, {userId: userId}))
  }

  getRoles(){
    return this.authenticate()
      .then((token:string) => this.request.getRoles(token))
      .then((roles:any[]) => roles.filter(role => {
        if(role.name != "uma_authorization" && role.name != "offline_access")
          return role
      }))
  }

  getRoleFromUser(userId:string){
    return this.authenticate()
      .then((token:string)=> this.request.getRoleFromUser(userId, token))
      .then((roles:any) => roles.length > 0  ? Promise.resolve(roles) : Promise.reject('roles not found'))
  }

  getRoleByName(roleName: any) {
    return this.authenticate()
      .then((token:any) => this.request.getRole(roleName, token))
      .then((role:string) => role ? Promise.resolve(role) : Promise.reject('role not found'))
  }

  addRoleForUser(userId:string, roleName:any) {
    return this.authenticate()
      .then((token:any) => this.getRoleByName(roleName)
        .then((role:any) => this.request.addRole(userId, role, token))
      )
  }

  removeRoleFromUser(userId:string, roleName:string) {
    return this.authenticate()
      .then((token:string) => this.getRoleByName(roleName)
        .then((role:any) => this.request.removeRoleFromUser(userId, role, token))
      )
  }
  authenticate() {
    return getToken(this.config.baseUrl, this.config);
  }
}

class KeyCloakAdminRequest {

  config:any

  constructor(config:any) {
    this.config = config;
  }

  getRoles(token:any) {
    return this.doRequest('GET',
      `/admin/realms/${this.config.realm}/roles`, token)
  }

  getRoleFromUser(userId:any, token:any){
    return this.doRequest( 'GET',
      `/admin/realms/${this.config.realm}/users/${userId}/role-mappings/realm`, token)
  }

  addRole(userId:any, role:any, token:any) {
    return this.doRequest('POST',
      `/admin/realms/${this.config.realm}/users/${userId}/role-mappings/realm`, token, [role]);
  }

  getRole(roleName:any, token:any) {
    return this.doRequest('GET',
      `/admin/realms/${this.config.realm}/roles/${roleName}`, token, null);
  }

  removeRoleFromUser(userId:any, role:any, token:any) {
    return this.doRequest('DELETE',
      `/admin/realms/${this.config.realm}/users/${userId}/role-mappings/realm`, token, [role]);
  }

  doRequest(method:any, url:any, accessToken:any, jsonBody:any=null) {
    let options = {
      url: this.config.baseUrl + url,
      auth: {
        bearer: accessToken
      },
      method: method,
      json: true
    };

    if (jsonBody !== null) {
      //@ts-ignore
      options.body = jsonBody;
    }

    return request(options).catch((error:any) => Promise.reject(error.message ? error.message : error));
  }
}

export default new AdminClient();

