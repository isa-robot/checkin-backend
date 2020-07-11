db = db.getSiblingDB('admin');
db.auth (MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD)

db.createRole( { role: "agenda", privileges: [ { resource: { db: "agenda" , collection: "" }, actions: [ "anyAction" ] } ], roles: [] } );
db.createRole( { role: "logs", privileges: [ { resource: { db: "logs" , collection: "" }, actions: [ "anyAction" ] } ], roles: [] } );

db = db.getSiblingDB('agenda');
db.createUser({
  user: SCHEDULE_USER,
  pwd: SCHEDULE_PASS,
  roles: [{
    role: "agenda",
    db: "admin"
  }]
});

db = db.getSiblingDB('logs');
db.createUser({
  user: SCHEDULE_USER,
  pwd: SCHEDULE_PASS,
  roles: [{
    role: "logs",
    db: "admin"
  }]
});
