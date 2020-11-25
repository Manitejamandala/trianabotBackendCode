var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
  orderId: String,
  order_date: {
    type: Date,
    default: Date.now
  },
  order_total: Number,
  items: String,
  customerName: String,
  phoneNumber: String,
  address: String,
  paymentType: String,
  status: {
    type: String,
    default: 'Created'
  },
  created_user: { type: Schema.Types.ObjectId, ref: 'User' },

})

module.exports = mongoose.model('Order', OrderSchema);
