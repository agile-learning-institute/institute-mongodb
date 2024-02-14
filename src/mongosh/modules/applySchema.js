// Function to check and create constraints (if no VERSION document exists)
function applySchema(config) {
  const schemaFile = "./schemas/" + config.name + "-" + config.version + ".json";

  // Check to see if a Version document exits
  var versionDoc = db[config.name].findOne({ name: "VERSION" });
  if (versionDoc) {
    console.log("-Version Found:", versionDoc.version);
  } else {
    console.log("-Version Not Found, Configuring:", config.name);

    // create name index
    db[config.name].createIndex({ name: 1 }, { unique: true });
    console.log("-Name Index created");

    // Configure schema validation
    const schema = require(schemaFile);
    db.runCommand({
      collMod: config.name,
      validator: { $jsonSchema: schema },
    });
    console.log("- Schema Configured");

    // Insert version document
    db[config.name].insertOne({ name: "VERSION", version: config.version });
    console.log("-Version Set", config.version);
  }
}