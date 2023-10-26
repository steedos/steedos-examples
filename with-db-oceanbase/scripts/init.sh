#!/bin/bash

### Set server settings

echo; echo "=> Starting ...";

docker exec -it with-db-oceanbase_oceanbase_1 bash -c '/root/scripts/CreateTables.sql';

exit;

echo "=> Done."; echo;