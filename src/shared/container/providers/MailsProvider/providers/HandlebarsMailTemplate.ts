import handlebars from 'handlebars';
import fs from 'fs';

import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

class HandlebarsMailTemplateProvider {
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

export default new HandlebarsMailTemplateProvider()
