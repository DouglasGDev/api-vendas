import  handlebars  from 'handlebars';// para criar o template do email enviado

interface ITemplateVariable {
  [key: string]: string | number; // aqui foi criado para receber variáveis dinamicas, varios tipos
}

interface IParseMailTemplate { // essa interface é para definir o parse abaixo, ou seja, o parse é responsável por transmitir o html, a estrutura
  template: string;
  variables:  ITemplateVariable;
}
export default class HandlebarsMailTemplate {
  public async parse({ // parsiado é tranformado
    template,
    variables,
  }: IParseMailTemplate): Promise<string> {
    const parseTemplate = handlebars.compile(template); // aqui ele compila o template

    return parseTemplate(variables); // aqui ele considera as varaveis tbm
  }
}
