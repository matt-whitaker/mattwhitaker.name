import fsPath from 'path';
import fileType from 'file-type';
import Promise from 'bluebird';

const getFileType = (file) => new Promise((res, rej) => {
  const mimeType = fileType(file.contents);

  if (!mimeType || !mimeType.mime) {
    if (fsPath.extname(file.path) === '.html') {
      return res('text/html');
    }

    if (fsPath.extname(file.path) === '.css') {
      return res('text/css');
    }

    return rej(new Error('MIME could not be parsed'));
  }

  return res(mimeType.mime);
});

export default getFileType;