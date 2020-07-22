interface IVariablesTemplate {
  [key: string]: any;
}

export default interface IParseMailTemplateDTO {
  file: string;
  variables: IVariablesTemplate;
}
