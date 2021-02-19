


module.exports.default = (keystone) => {
  keystone.createList('Collection', {
    fields: {
      name: { type: Text },
      image: { type: Image }
      
    },
    // List-level access controls
    access: {
      read: access.userIsAdminOrOwner,
      update: access.userIsAdminOrOwner,
      create: access.userIsAdmin,
      delete: access.userIsAdmin,
      auth: true,
    },
  });
}