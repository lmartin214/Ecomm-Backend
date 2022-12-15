const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  //all tags
  //included its associated Product data
  try {
    const allTags = await Tag.findAll({
      include: [{ model: Product }], // w/ associated Products
    });
    res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  //a single tag by its `id`
  //included its associated Product data
  try {
    const tagID = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }], // w/ associated Products
    });
    res.status(200).json(tagID);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async(req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(newTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagUpdate = await Tag.update(req.body, 
    {
      where: {
        id: req.params.id,
      },
    }
  );
    if (!tagUpdate[0]) {
      res.status(404).json({ message: 'No Tag with this id!' });
      return;
    }
    res.status(200).json(tagUpdate);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const rmvTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    // Respond with deletion confirmation
    res.status(200).json(rmvTag);
  } catch (err) {
    // Send back the error if one is thrown
    res.status(500).json(err);
  }
});

module.exports = router;
