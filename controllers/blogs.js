const blogModel = require('../models/Blogs');

exports.save = async (req, res) => {
  try {
    const { title, description } = req.body;
    const url = 'http://localhost:3000' + req.file.path.split('public')[1];
    console.log(req.file.path);
    if (!title || !description || !url) {
      res
        .status(500)
        .json({ success: false, message: 'fill all required fields' });
    }

    const blog = await blogModel.save(title, url, description);

    res.status(201).json({ success: true, message: 'created' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'server error' });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    if (!title || !description) {
      res
        .status(500)
        .json({ success: false, message: 'fill all required fields' });
    }

    const blog = await blogModel.update(title, description, id);
    if (blog.rowCount != 0) {
      res.status(200).json({ success: true, message: 'updated' });
    }
    res.status(404).json({ success: false, message: 'data not found' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'server error' });
  }
};

exports.get = async (req, res) => {
  try {
    const { id } = req.params;
    const search = req?.query?.search || '';
    const blog = await blogModel.get(id, `%${search}%`);
    if (blog) {
      res.status(200).json({ success: true, blogs: blog.rows });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'server error' });
  }
};

exports.blogDelete = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(404).json({ success: false, message: 'ID not found' });
    }
    const blog = await blogModel.blogDelete(id);
    if (blog) {
      res.status(200).json({ success: true, message: 'Deleted' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'server error' });
  }
};
