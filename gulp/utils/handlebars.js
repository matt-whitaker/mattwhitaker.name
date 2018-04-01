import Handlebars from 'handlebars';
import replaceExt from 'replace-ext';
import Promise from 'bluebird';
import requireUncached from 'require-uncached';
import fsPath from 'path';

export default function(registrations) {
  return Promise.props(registrations)
    .then(({ helpers, partials }) => {
      const handlebars = Handlebars.create();

      /**
       * note: 'stream-to-array' module screws up .reduce, so ugly forEach it is
       */

      const helpersToRegister = {};
      helpers.forEach((helper) => {
        const name = replaceExt(fsPath.basename(helper.path, '.js'), '');
        const func = requireUncached(helper.path).default;
        helpersToRegister[func.name] = func;
      });

      const partialsToRegister = {};
      partials.forEach((partial) => {
        const name = replaceExt(fsPath.basename(partial.path), '');
        partialsToRegister[name] = partial.contents.toString();
      });

      handlebars.registerHelper(helpersToRegister);
      handlebars.registerPartial(partialsToRegister);

      return handlebars;
    });
}