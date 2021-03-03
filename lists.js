const { File } = require('@keystonejs/fields');
const { LocalFileAdapter } = require('@keystonejs/file-adapters');
const { Text } = require('@keystonejs/fields');

const fileAdapter = new LocalFileAdapter({
  /*...config */
  src: './assets',
//  path: '/'
});

module.exports = (keystone) => {
  keystone.createList('Collection', {
    fields: {
      name: { type: Text },
      image: { type:
        File,
        adapter: fileAdapter,
        isRequired: true,}
    }
  });
}