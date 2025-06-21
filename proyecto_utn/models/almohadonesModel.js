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


async function insertAlmohadones(obj) {
    try {
        var query = "insert into almohadones set ?";
        var rows = await pool.query(query, [obj]);
        return rows;
    } catch (error) {
        throw error;
    } //cierre catch//
} //cierre insert//

/*trae 1 solo almohadón*/
async function getAlmohadonesById(id) {
    var query = "select * from almohadones where id =?";
    var rows = await pool.query(query, [id]);
    return rows[0];
}

/*modificar los almohadones por el id */
async function modificarAlmohadonesById(obj, id) {
    try {
        var query = "update almohadones set ? where id=?";
        var rows = await pool.query(query, [obj, id]);
        return rows;
    } catch (error) {
        throw error;
    }

}

async function buscarAlmohadones(busqueda) {
    var query = "select * from almohadones where titulo like ? or cuerpo like ? ";
    var rows = await pool.query(query, ['%' + busqueda + '%', '%' + busqueda + '%']);
    return rows;
}

module.exports = { getAlmohadones, deleteAlmohadonesById, insertAlmohadones, getAlmohadonesById, modificarAlmohadonesById, buscarAlmohadones }