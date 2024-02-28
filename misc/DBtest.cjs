const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb+srv://Gumbo101:DominoesVom1t@sharkradar.sndkscc.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    try {
        await client.connect();
        //await listDatabases(client);
        /* await createListing(client, {
            sharkID: 51,
            name: "Please Work, The Shark",
            adoptedID: 6,
            userID: 6
        })
        */
        await queryDB(client, "shark", 4);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function queryDB(client, collect, query) {
    var search = { sharkID: query};
    const result = await client.db("sharkRadar").collection(collect).find(search).toArray(function(err, result) {});
    
    console.log(result);
} 

async function createListing(client, newListing) {
    const result = await client.db("sharkRadar").collection("adoptShark").insertOne(newListing);

    console.log('New listing created with the following id: ${result.insertedID}');
}

async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases");
    databasesList.databases.forEach(db => {
        console.log('- ${db.name}');
    })
}
