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
    const authServerUrl = `${process.env.SERVER_URL}`;
    return {
      baseUrl: authServerUrl,
      realm: process.env.REALM,
      username: process.env.KEYCLOAK_USER,
      password: process.env.KEYCLOAK_PASSWORD,
      grant_type: 'password',
      client_id: 'admin-cli'
    };
  }

  usersList(page:any=1) {
    const limit = 20
    const skip = limit*(page - 1)
    return this.authenticate()
      .then((token:string) => this.request.getUsers(limit, skip, token))
      .then((users:any) => Promise.resolve(users))
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

  getCompositeRoles(roleId: string){
    return this.authenticate()
      .then((token: string) => this.request.getCompositeRoles(roleId, token))
      .then((composites:any) => composites.length > 0 ? Promise.resolve(composites) : Promise.reject("composites not found"))
  }

  getRoles(){
    return this.authenticate()
      .then((token:string) => this.request.getRoles(token))
      .then((roles:any[]) => roles.filter(role => {
        if(role.name != "uma_authorization" && role.name != "offline_access")
          return Promise.resolve(role)
      }))
  }

  getRoleFromUser(userId:string){
    return this.authenticate()
      .then((token:string)=> this.request.getRoleFromUser(userId, token))
      .then((roles:any) =>
        Promise.resolve(roles.filter((role:any) => {
          if(role.name != "uma_authorization" && role.name != "offline_access")
            return Promise.resolve(role)
        }))
      )
  }

  getRoleByName(roleName: any) {
    return this.authenticate()
      .then((token:any) => this.request.getRole(roleName, token))
      .then((role:string) => Promise.resolve(role))
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

  getUsers(limit:number, skip: number, token:string){
    return this.doRequest('GET',
      `/admin/realms/${this.config.realm}/users?first=${skip}&max=${limit}`, token)
  }

  getCompositeRoles(roleId: string,token:string){
    return this.doRequest('GET',
      `/admin/realms/${this.config.realm}/roles-by-id/${roleId}/composites`,token)
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
