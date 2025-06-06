var pool = require('./bd');


async function getAlmohadones() {
        var query = 'select * from almohadones';
        var rows = await pool.query(query);
        return rows;    
}

async function deleteAlmohadonesById(id) {
    var query = 'delete from almohadones where id = ?';
    var rows = await pool.query(query, [id]);
    return rows;
    
}

module.exports = { getAlmohadones, deleteAlmohadonesById }