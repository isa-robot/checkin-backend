import handlebars from 'handlebars';
import fs from 'fs';

import IMailTemplateProvider from '../models/IMailTemplateProvider';
import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

export default class HandlebarsMailTemplateProvider
  implements IMailTemplateProvider {
  public async parse({
    variables,
    file,
  }: IParseMailTemplateDTO): Promise<string> {
    const template = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    handlebars.registerHelper('YesOrNo', function (value) {
      return value ? 'Sim' : 'Não';
    });
    const parsedTemplate = handlebars.compile(template);

    return parsedTemplate(variables);
  }
}
