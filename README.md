# game
开发流程：

clone 到本地

git clone https://github.com/beenlee/game

基于develop分支创建自己的分支

git branch feature/beenlee

然后在自己的分支上开发

开发完成后合并到develop分支

git checkout develop

git pull

git checkout feature/beenlee

git merge develop

git checkout develop

git merge --no-ff feature/beenlee