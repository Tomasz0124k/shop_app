#!/bin/bash
pg_ctl restart
pg_restore -U postgres -d shop /shop_db.sql 