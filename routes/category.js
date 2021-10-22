const { Router } = require('express')
const router = Router()
const fileUpload = require('../middleware/fileUpload')
const Category = require('../models/Category')

router.get('/read', async (req, res) => {
    const categories = await Category.find()

    res.render('admin/categories', {
        title: 'Kategoriyalarni ko`rish',
        header: 'Kategoriyalarni ko`rish',
        categories,
        layout: 'main',
    })
})

router.get('/add', (req, res) => {
    res.render('admin/categoryCreate', {
        title: 'Kategoriya yaratish',
        header: 'Kategoriya yaratish',
        layout: 'main',
    })
})

router.post('/add', fileUpload.single('categoryIcon'), async (req, res) => {
    const { categoryName, sortNumber } = req.body
    const categoryIcon = req.file.filename

    const category = new Category({
        categoryName,
        sortNumber,
        categoryIcon
    })

    await category.save()
    res.redirect('/admin/category/read')
})

module.exports = router