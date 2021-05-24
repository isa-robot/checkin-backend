import IBaseModel from "./IBaseModel";

export default abstract class BaseModel implements IBaseModel{

  toJSON() {
    return Object.getOwnPropertyNames(this).reduce((a: any, b:any) => {
      // @ts-ignore
      a[b] = this[b];
      return a;
    }, {});
  }

  static fromJson(data: any): any {
    return {};
  }
}
