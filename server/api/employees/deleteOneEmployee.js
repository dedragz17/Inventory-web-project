const db = require('../../db');

module.exports = (req, res) => {
    const id = req.params.employeeID;
    const sql = 'DELETE FROM employee WHERE employeeID = ?'
    
    db.query(sql, [id], (err, data) => {
        if(err) {
            return res.json({
                success: false,
                message: err
            })

        } else {
            return res.json({
                success: true,
                message: 'Delete complete!'
            })
        }
    }) 
}