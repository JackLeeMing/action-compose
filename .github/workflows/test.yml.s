# This workflow will do a clean install of node dependencies, build the source code and run tests across different versions of node
# For more information see: https://help.github.com/actions/language-and-framework-guides/using-nodejs-with-github-actions

name: Github CI

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          repository: "JackLeeMing/webglll"
      - name: List file in repo
        run: |
          ls ${{github.workspace}}
      - uses: actions/setup-node@v2
        with:
          node-version: "14"
      - run: node -v
      - run: npm install -g typescript
      - run: tsc -v
      - run: npm install
