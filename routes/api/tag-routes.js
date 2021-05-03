const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  Tag.findAll({ include: Product }).then((tag) => {
    res.json(tag);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Tag.findOne({ where: { id: id }, include: Product })
    .then((tag) => {
      console.log(`Found tag: ${tag}`);
      res.json(tag);
    })
    .catch((error) => {
      res.json({ error: error, message: error.message });
    });
});

router.post("/", (req, res) => {
  const name = req.body.name;
  Tag.create({
    tag_name: name,
  })
    .then((newTag) => {
      res.json(newTag);
    })
    .catch((error) => {
      res.json({ error: error, message: error.message });
    });
  // create a new category
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const updates = req.body.updates;
  Tag.findOne({
    where: { id: id },
  })
    .then((tag) => {
      return tag.update(updates);
    })
    .then((updatedTag) => {
      res.json(updatedTag);
    })
    .catch((error) => {
      res.json({ error: error, message: error.message });
    });
  // update a category by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete a tag by its `id` value
  const id = req.params.id;
  Tag.destroy({
    where: { id: id },
  })
    .then((deletedTag) => {
      res.json(deletedTag);
    })
    .catch((error) => {
      res.json({ error: error, message: error.message });
    });
});

module.exports = router;
