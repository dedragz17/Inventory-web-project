const db = require('../../db');

module.exports = (req, res) => {
    const orderType = req.body.orderType;
    const oldShop = req.body.oldShop;
    const newShop = req.body.newShop;
    const oldItem = req.body.oldItem;
    const newItem = req.body.newItem;
    var orderID;
    var shopID;
    const sql_order = 'INSERT INTO ordermain VALUE (null, CURRENT_TIMESTAMP, ?, ?)';
    const sql_shop = 'INSERT INTO shop VALUE (null, ?, ?, ?, ?, ?, ?, ?)';
    const sql_orderDetail = 'INSERT INTO orderDetail (locationID, itemID, itemCount, orderID) VALUES ';
    const sql_item = 'INSERT INTO item VALUES ';
    let sql_value_orderDetail = [];

    if (oldShop  == null) {
        db.query(sql_shop, [newShop.shopName, newShop.shopAddress, newShop.shopSupDistrict, newShop.shopDistrict, newShop.shopProvince, newShop.PostalCode, newShop.Phone], (err, data) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Add shop is error : ' + err
                })
            } else {
                shopID = data.insertId;
            } 
        })
    } else {
        shopID = oldShop
    }

    db.query(sql_order, [orderType, oldShop], (err, data) => {
        if (err) {
            return res.json({
                success: false,
                message: 'Add order is error : ' + err 
            })
        } else {
            orderID = data.insertId;
        } 

    if (newItem) {

        db.query(sql_item, [])
    }

        db.query(sql_order, [orderType, oldShop], (err, data) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Add order is error : ' + err 
                })
            } else {
                orderID = data.insertId;
                if (oldItem) {
                    sql_value_orderDetail = valueOrderDetailCreate(oldItem);
                        db.query(sql_orderDetail + sql_value_orderDetail[0], sql_value_orderDetail[1], (err ,data) => {
                            if (err) {
                                const resulFromDelete = deleteOrder(orderID);
                                return res.json({
                                    sucess: false,
                                    message: 'Add orderdetail is error, Delete order !! :' + resulFromDelete
                                })
                            } else {
                                return res.json({
                                    success: true,
                                    message: 'Add order is successful'
                                })
                            }
                        })
                    } else { 
                        
                    }
                }
        })
    } else {
        return res.json({
            success: false,
            message: 'There are no shop'
        })
    }
    
    function insertOrderDetail (orderID, item) {
        
    }
    
    
    function deleteOrder (orderID) {
        db.query('DELETE FROM ordermain WHERE orderID = ?', [orderID], (err, data) => {
            if (err) {
                return('Delete order is error !! : ' + err);
            } else {
                return('Delete order is successful');
            }
        })
    }

   function valueCreate (data, dataName, id) {
    let sql_value = ' ';
    let arr_value = [];
    for (let i = 0 ; i < data.length ; i++) {
            sql_value += '(';
            for (key in data[i]) {
                sql_value += '?, ';
                arr_value.push(eval(dataName+'['+i+'].'+`${key}`));
            }
            for (let j = 0 ; j < id.length ; j++) {
                sql_value += '?, ';
                arr_value.push(eval(id[j]));
            }
            sql_value += '), ';
        }
        sql_value = sql_value.slice(0, -2);
        return [sql_value, arr_value];
    }
}

