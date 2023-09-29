export default {
  fieldCreate: ['isbn', 'author', 'title', 'price', 'category_id'],
  fieldUpdate: ['isbn', 'author', 'title', 'price', 'category_id'],
  fieldList: ['isbn', 'author', 'title', 'price', 'category_id'],
  fieldShow: ['isbn', 'author', 'title', 'price', 'category_id'],
  fieldSearchable: ['isbn', 'author', 'title'],
  fieldFilterable: ['author'],
  fieldRelation: {
    category_id: {
      linkTable: 'categories',
      aliasTable: ['categories'],
      linkField: 'id',
      selectFields: {
        name: 'rel_category_id'
      },
    }
  }
}