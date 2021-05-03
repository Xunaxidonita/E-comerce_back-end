const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  Category.findAll({ include: Product })
    .then((category) => {
      res.json(category);
    })
    .catch((error) => {
      res.json({ error: error, message: error.message });
    });
});
// find all categories
// be sure to include its associated Products

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Category.findOne({ where: { id: id }, include: Product })
    .then((category) => {
      console.log(`Found category: ${category}`);
      res.json(category);
    })
    .catch((error) => {
      res.json({ error: error, message: error.message });
    });
});

router.post("/", (req, res) => {
  const name = req.body.name;
  Category.create({
    category_name: name,
  })
    .then((newCategory) => {
      res.json(newCategory);
    })
    .catch((error) => {
      res.json({ error: error, message: error.message });
    });
  // create a new category
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const updates = req.body.updates;
  Category.findOne({
    where: { id: id },
  })
    .then((category) => {
      return category.update(updates);
    })
    .then((updatedCategory) => {
      res.json(updatedCategory);
    })
    .catch((error) => {
      res.json({ error: error, message: error.message });
    });
  // update a category by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  const id = req.params.id;
  Category.destroy({
    where: { id: id },
  })
    .then((deletedCategory) => {
      res.json(deletedCategory);
    })
    .catch((error) => {
      res.json({ error: error, message: error.message });
    });
});

module.exports = router;
