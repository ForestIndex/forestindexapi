import Category from '../../../services/models/model.category';
import Service from '../../../services/models/model.service';
import categories from '../data/categories';

export default {
  name: '004.addCategories',
  up: addCategories,
  down: () => Promise.resolve()
}

async function addCategories() {
  const existingCategories = await Category.find({});
  if (!existingCategories || existingCategories.length === 0) {
    let nextId = 1;
    for (let i = 0; i < categories.length; i++) {
      const cat = categories[i];
      const existingService = await Service.findOne({ name: cat.serviceName });
      if (!!existingService && !!existingService._id) {
        const catToInsert = new Category({
          _id: nextId,
          name: cat.name,
          _service: existingService._id,
          order: i
        });
        await catToInsert.save();
        nextId += 1;
      }
    }
  }
}
