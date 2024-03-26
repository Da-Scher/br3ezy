const pool = require("../db/db");

class Federation {
    static async getFederation() {
        const [results] = await pool.query(
            "SELECT fedPublicId, apiUrl, apiPort FROM Federation",
        );
        return results;
    }

    static async setLiveFederation(fedID, isActive) {
        const [results] = await pool.query(
            "SELECT Streams WHERE id = ?",
            [fedID],
        );
        return results;
    }
}

module.exports = Federation;