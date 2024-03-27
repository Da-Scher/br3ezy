const pool = require("../db/db");

class Federation {
    static async getFederation() {
        const [results] = await pool.query(
            "SELECT fedPublicId, apiUrl, apiPort FROM Federation",
        );
        return results;
    }

    static async setLiveFederation(req) {
        const { fedID } = req.body;
        const [results] = await pool.query(
            "UPDATE Streams SET isActive = 1 WHERE id = ?",
            [fedID],
        );
        return results;
    }
}

module.exports = Federation;