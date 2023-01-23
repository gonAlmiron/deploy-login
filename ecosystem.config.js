module.exports = {
  apps : [{
    name   : "app1",
    script : "dist/index.js",
    watch: true,
    autorestart: true,
    instances: 'max'
  },
  {
    name   : "app2",
    script : "dist/index.js",
    watch: true,
    autorestart: true,
    instances: 'max'
  },
  {
    name   : "app3",
    script : "dist/index.js",
    watch: true,
    autorestart: true,
    instances: 'max'
  }

]
}
