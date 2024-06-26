const pool = require("../db/db");

class Federation {
    static async getFederation() {
      try {
        const [results] = await pool.query(
            "SELECT Federation.fedPublicId, Federation.apiUrl, Federation.apiPort, Streams.title, Streams.description, Streams.photo FROM Federation JOIN Streams WHERE Streams.id = 1",
        );
        return results;
      } 
      catch(error) {
      console.error(`Error getting federation: ${error}`);
      return null;
      }
    }

    static async setLiveFederation(req) {
        const { fedID, stmName, stmDesc, stmPict } = req.body;
        const [results] = await pool.query(
            "UPDATE Streams SET title = ?, description = ?, photo = ?, isActive = 1 WHERE id = ?",
            [stmName, stmDesc, stmPict, fedID],
        );
        return results;
    }
}

module.exports = Federation;
