
module.exports = {
    apps: [
      {
        name: 'WebTerminal Client',
        script: 'npm',
        args: 'run serve',
        interpreter: '/bin/bash',
        env: {
          NODE_ENV: 'development',
        },
        env_production: {
          NODE_ENV: 'production',
        },
        watch: true,
      },
    ],
  };
  