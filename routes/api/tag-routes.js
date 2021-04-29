const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  db.Tag.findAll({ include: Tag }).then((Tag) => {
    res.json(Tag);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  db.Tag.findOne({ include: Product }, { where: { id: id } }).then((tag) => {
    console.log(`Found tag: ${tag}`);
  });
});

router.post("/", (req, res) => {
  // create a new tag
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
