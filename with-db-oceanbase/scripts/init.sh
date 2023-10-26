#!/bin/bash

### Set server settings

echo; echo "=> Starting ...";

docker exec -it with-db-oceanbase-oceanbase-1 bash -c 'obclient -h127.1 -uroot@test -A -Dtest -P2881 -e "source /root/scripts/CreateTables.sql"';

exit;

echo "=> Done."; echo;