const router = require('express').Router();
const Potions = require('../potions/potions-model');

// TEST ROUTE == GET ALL ORDERS
router.get('/', (req, res) => {
    Potions.getAllOrders()
    .then(orders => {
        if (orders) {
            res.json(orders)
        } else {
            res.status(404).json({ message: "No orders have been placed" })
        }
    })
    .catch(err => {
        res.status(500).json({ errorMessage: err.message })
    })
});

// GET single recipe by id
router.get('/:orderId', async (req, res) => {
    const { orderId } = req.params;

    let error;

    let order = await Potions.getOrderById(orderId).catch(err => {error = err})
    let address = await Potions.getAddressByOrderId(orderId).catch(err => {error = err})
    let payment = await Potions.getPaymentByOrderId(orderId).catch(err => {error = err})

    if (error) {
        res.status(500).json({ message: error.message })
    } else if (!order[0] || !address[0] || !payment[0]) {
        res.status(404).json({ message: 'resource not found'})
    } else {
        res.json({ ...order[0], address: address[0], payment: payment[0]})
    }
})

// DELETE order
router.delete('/:orderId', (req, res) => {
    const { orderId } = req.params
    Potions.deleteOrder(orderId)
    .then(count => {
        if(count > 0) {
            res.json({ message: 'resource deleted successfully'})
        } else {
            res.status(404).json({ message: 'resource does not exist'})
        }
    })
    .catch(err => {
        res.status(500).json({ message: err.message })
    })
})

// PATCH to update fulfilled value
router.patch('/', (req, res) => {
    const { id, fulfilled } = req.body

    Potions.updateOrderStatus(id, fulfilled)
    .then(count => {
        if (count > 0) {
            res.status(200).json({ message: 'resource updated successfully' })
        } else {
            res.status(404).json({ message: 'resource not found' })
        }
    })
    .catch(err => {
        res.status(500).json({ message: err.message })
    })
})

// POST to create new order
router.post('/', async (req, res) => {
    const { firstName, lastName, email, phone, address, payment, quantity, total } = req.body

    let error;

    let existingCustomer = await Potions.findCustomerByEmail(email).catch(err => { error = err })

    if (error) {
        res.status(500).json({ message: error.message})
    } else if (existingCustomer[0]) {
        res.status(409).json({ message: 'Customer already exists and may only place one order' })
    } else {
        let billing = await Potions.addBillingInfo(payment).catch(err => { error = err })
        let shipping = await Potions.addShippingInfo(address).catch(err => { error = err })

        let newCustomer = {
            firstName,
            lastName,
            email, 
            phone, 
            billingID: billing[0],
            shippingID: shipping[0]
        }

        let customer = await Potions.addCustomer(newCustomer).catch(err => { error = err })

        let newOrder = { quantity, total, customerID: customer[0]}

        let order = await Potions.addOrder(newOrder).catch(err => {
            error = err
        })

        if (error) {
            res.status(500).json({ message: error.message})
        } else {
            res.status(201).json({ id: order[0] })
        }
    }
})





module.exports = router;