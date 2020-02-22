# What is this?
Simple Node.JS app to collect&store trades history of Bitcoin market exchange.

# Setup
## PostgresSQL
- Table Architecture is desrirbed under /sql directory.
- to pass auth info, we use enironment variables and 'dotenv' Node.JS module. Use '.env.sample' as template format and remove ".sample" from file name for production use.

## Node.JS

## PM2
We use PM2 to start&deamonize this Node.JS app to kepp running.

# How to execute app
```
# pwd
/opt/trades-collector
# ll -a
total 44
drwxr-xr-x.  6 admin root   213 Feb 21 23:23 .
drwxr-xr-x.  3 root  root    30 Feb 21 23:14 ..
drwxrwxr-x.  2 admin admin   42 Feb 21 23:20 dist
-rw-rw-r--.  1 admin admin  104 Feb 21 23:23 .env
-rw-r--r--.  1 admin root   106 Feb 21 23:14 .env.sample
drwxr-xr-x.  8 admin root   163 Feb 21 23:54 .git
-rw-r--r--.  1 admin root    25 Feb 21 23:14 .gitignore
drwxr-xr-x. 27 admin root  4096 Feb 21 23:17 node_modules
-rw-r--r--.  1 admin root   579 Feb 21 23:14 package.json
-rw-r--r--.  1 admin root  7987 Feb 21 23:14 package-lock.json
-rw-r--r--.  1 admin root   253 Feb 21 23:14 READEME.md
drwxr-xr-x.  2 admin root    42 Feb 21 23:35 sql
drwxr-xr-x.  2 admin root    42 Feb 21 23:35 src
-rw-r--r--.  1 admin root  5338 Feb 21 23:14 tsconfig.json
# pm2 start ./dist/index.js --name trades-collector
```

# Components
- PostgreSQL
- Node.JS
- PM2

