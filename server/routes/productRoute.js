const router = require('express').Router();
const productControl = require('../controllers/productControl');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');
const upload = require('../middleware/fileUpload');

router.route('/products')
.get(productControl.getProducts)
.post(upload.single("images"), productControl.createProducts);

// auth, authAdmin, 
router.route('/products/:id')
.delete(auth, authAdmin, productControl.deleteProducts)
.put(auth, authAdmin, productControl.updateProducts);

module.exports = router;