{
  "presets": [
    ["@babel/preset-env", {
      "targets": {
        "node": "current"
      },
      "loose": true,
      "modules": false,
      "useBuiltIns": "usage",
      "corejs": 3,
      "exclude": ["transform-named-capturing-groups-regex"]
    }],
    "@babel/preset-react",
    "@babel/preset-typescript"
  ],
  "env": {
    "production": {
      "plugins": [
        ["transform-remove-console", { "exclude": ["error", "warn"] }]
      ]
    }
  }
}