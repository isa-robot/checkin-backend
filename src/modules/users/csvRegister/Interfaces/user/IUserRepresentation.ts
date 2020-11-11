export default interface IUserRepresentation {
  firstName?: string;
  lastName?: string;
  email: string;
  username: string;
  credentials?: {
    type: string;
    value: string;
  }
}
