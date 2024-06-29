const Cart = require('./Cart')
const Category = require('./Category')
const Product = require('./Product')
const User = require('./User')

require('./User')
require('./Category')
require('./Product')

Product.belongsTo(Category)
Category.hasMany(Product)

Cart.belongsTo(User)
User.hasMany(Cart)
