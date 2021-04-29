const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  db.Category.findAll({ include: Product }).then((Category) => {
    res.json(Category);
  });
});
// find all categories
// be sure to include its associated Products

router.get("/:id", (req, res) => {
  const id = req.params.id;
  db.Category.findOne({ include: Product }, { where: { id: id } }).then(
    (category) => {
      console.log(`Found category: ${category}`);
    }
  );
});

router.post("/", (req, res) => {
  const name = req.body.name;
  db.owners
    .create({
      category_name: name,
    })
    .then((newCategory) => {
      res.json(newCategory);
    });
  // create a new category
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const updates = req.body.updates;
  db.Category.find({
    where: { id: id },
  })
    .then((category) => {
      return category.updateAttributes(updates);
    })
    .then((updatedCategory) => {
      res.json(updatedCategory);
    });
  // update a category by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  const id = req.params.id;
  db.category
    .destroy({
      where: { id: id },
    })
    .then((deletedCategory) => {
      res.json(deletedCategory);
    });
});

module.exports = router;
