const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint

// find all categories
// be sure to include its associated Products

router.get("/", (req, res) => {
  db.Product.findAll({ include: Category, Tag }).then((Product) => {
    res.json(Product);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  db.Product.findOne({ include: Category, Tag }, { where: { id: id } }).then(
    (product) => {
      console.log(`Found product: ${product}`);
    }
  );
});

router.post("/", (req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    const stock = req.body.stock;
    const tagIds = req.body.tagIds;
    db.owners
      .create({
        product_name: name,
        price: price,
        stock: stock,
        tagIds: tagIds,
      })
      .then((newCategory) => {
        res.json(newCategory);
      });
    // create a new category
});


Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put("/:id", (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  const id = req.params.id;
  db.product
    .destroy({
      where: { id: id },
    })
    .then((deletedProduct) => {
      res.json(deletedProduct);
    });
});

module.exports = router;
