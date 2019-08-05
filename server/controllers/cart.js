const cartModel = require('../models/cart');

module.exports = cartController = {
    // Get all Cart items by userID.
    getCartItems : (req, res) => {
        cartModel.find({ userID : req.query.userID})
            .then((items) => res.send(items))
            .catch((err) => res.status(400).send('No records Found'))
    },

    // change the amounts of cartItem.
    toggleAmount : async (req, res) => {
        //get cartItem from DB by its ID.
        let cartItem = await cartModel.findById({ _id : req.body.id});
        //if action recieved is to add one burger.
        if (req.body.type === 'plus') {
          await cartItem.set({amount: cartItem.amount += 1});
          await cartItem.set({total: cartItem.price * cartItem.amount});
        //if recieved action of decrease.
        }else {
          //check the amount above 1.
          if (cartItem.amount > 1) {
            await cartItem.set({amount: cartItem.amount -= 1});
            await cartItem.set({total: cartItem.price * cartItem.amount});
          //if it exactly 1 it means that cart item should be removed completly
          }else {
            cartItem.remove()
              .then(() => console.log("removed"))
              .catch((err) => console.log('failed to remove cartItem ', err))
          }
        }
        //save the changes to DB.
        // after the change has been made send back all records for specific user.
        cartItem.save()
          .then(() => {
            cartModel.find({ userID : req.body.userID})
              .then((items) => res.send(items))
              .catch((err) => res.status(400).send('No records Found'))
          })
          .catch((err) => console.log(err))
    },

    // Remove cart Item from List by its id.
    removeCartItem : (req, res) => {
    // find the item by id and remove it.
    cartModel.deleteOne({ _id: req.body.id})
      .then(() => {
        //send all records for specific user.
        cartModel.find({ userID : req.body.userID})
            .then((items) => res.send(items))
            .catch((err) => res.status(400).send('No records Found'))
      })
      .catch((err) => res.status(400).send('Failed to Remove Item.'));
    }
}
