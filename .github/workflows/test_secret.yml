# This workflow will do a clean install of node dependencies, build the source code and run tests across different versions of node
# For more information see: https://help.github.com/actions/language-and-framework-guides/using-nodejs-with-github-actions

name: Github CI

on: [push]

jobs:
  secret_test:
    runs-on: ubuntu-latest
    steps:
      - name: executing remote ssh commands using password
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.ALI_HOST }}
          username: ${{ secrets.USER_NAME }}
          password: ${{ secrets.PASS_WORD }}
          script_stop: true
          script: |
            whoami
            ls -l
            touch secrets.txt
            echo ${{ secrets.MY_SECRET }} >> secrets.txt

      - name: executing remote ssh commands using ssh key
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.ALI_HOST }}
          username: ${{ secrets.USER_NAME }}
          key: ${{ secrets.LOCAL_KEY }}
          port: ${{ secrets.SSH_PORT }}
          script: |
            pwd
            ls -l
