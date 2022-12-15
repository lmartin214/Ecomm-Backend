const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  //all categories and included its associated Products
  try {
    const allCatergori = await Category.findAll({
      include: [{ model: Product }], // w/ associated Products
    });
    res.status(200).json(allCatergori);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // one category by its `id` value and included its associated Products
  try {
    const categoryID = await Category.findByPk(req.params.id, {
      include: [{ model: Product }], // w/ associated products
    });
    res.status(200).json(categoryID);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategori = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(newCategori);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCatergori = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(updateCatergori);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const rvmCatergori = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(rvmCatergori);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
