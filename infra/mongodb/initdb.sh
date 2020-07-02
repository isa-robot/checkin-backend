cd /initdb

mongo --eval "var USER='$MONGO_INITDB_ROOT_USERNAME'; var PASS='$MONGO_INITDB_ROOT_PASSWORD';" users.js
mongo --eval "var USER='$MONGO_INITDB_ROOT_USERNAME'; var PASS='$MONGO_INITDB_ROOT_PASSWORD';" collections.js
mongo --eval "var USER='$MONGO_INITDB_ROOT_USERNAME'; var PASS='$MONGO_INITDB_ROOT_PASSWORD';" data.js

