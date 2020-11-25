var Orders = require('./orders.model');


// Get list of orders
exports.getAllOrders = function (req, res) {
  console.log(req.params.id);
  Orders.find({
    created_user: req.params.id
  }).sort({
    order_date: -1
  }).exec(function (err, orders) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(200).json(orders);
  });
};

// Creates a new orders in the DB.
exports.createOrder = async function (req, res) {
  console.log(req.body.id);
  req.body.orderId = await OrderNumberGeneration();
  req.body.created_user = req.body.id;
  Orders.create(req.body, function (err, orders) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(201).json(orders);
  });
};

function OrderNumberGeneration() {
  return new Promise(function (resolve, reject) {
    Orders.findOne({}).sort({
      orderId: 'desc'
    }).exec(function (err, result) {
      if (err) {
        return handleError(res, err);
      } else {
        let oldVoucher = '';
        if (!result || !result.orderId) {
          let series = 'AA';
          oldVoucher = series.padEnd(8, '0');
        } else oldVoucher = result.orderId;
        if (oldVoucher === 'ZZ999999') reject('Vouchers generation limt over');
        else {
          let a = '',
            i = 'A'.charCodeAt(0),
            j = 'Z'.charCodeAt(0);
          for (; i <= j; ++i) {
            a = a + String.fromCharCode(i);
          }
          let alphabets = a,
            fl = oldVoucher.slice(0, 1),
            sl = oldVoucher.slice(1, 2),
            newVoucher = '';
          if (oldVoucher.slice(2, 8) === '999999') {
            if ((alphabets.indexOf(sl) + 1) === alphabets.length) {
              fl = alphabets.charAt(alphabets.indexOf(fl) + 1);
              newVoucher = fl + alphabets.charAt(1) + '000001';
            } else newVoucher = fl + alphabets.charAt(alphabets.indexOf(sl) + 1) + '000001';
          } else {
            newVoucher = oldVoucher.slice(0, 2) + (Number(oldVoucher.slice(2, 8)) + 1).toString().padStart(6, '0')
          }
          resolve(newVoucher);
        }
      }
    })
  });
}



function handleError(res, err) {
  return res.status(500).send(err);
}
