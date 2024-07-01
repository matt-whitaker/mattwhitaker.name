
export const mapStrings = (text) => text.split('\n')
  .reduce((map, line) => {
    if (line.trim()) {
      const [key, ...str] = line.split(' ');
      map[key] = str.join(' ');
    }

    return map;
  }, {});