### 从 `gh-pages` 分支机构 部署项目页面[](#deployment-of-project-pages-from-your-gh-pages-branch)

您还可以告诉GitHub页面将您的 `master` 分支视为已发布的站点，或指向一个单独的 `gh-pages` 分支。 后一种方法较为复杂，但具有一些优点：

*   它将您的源网站和生成的网站保留在不同的分支机构中，因此维护了两者的版本控制历史记录。
*   与前面的 `docs/` 选项 不同 ，它使用默认 `public` 文件夹。

#### `gh-pages` 分公司的 准备[](#preparations-for-gh-pages-branch)

这些步骤只需要执行一次。 替换 `upstream` 为您的遥控器名称； 例如 `origin` ：

##### 添加 `public` 文件夹

首先，将该 `public` 文件夹 添加 到 `.gitignore` 项目根目录的文件中，以便在master分支上忽略该目录：

```
echo "public" >> .gitignore

```

##### 初始化您的 `gh-pages` 分支

现在，您可以将 `gh-pages` 分支 初始化 为空的 [孤立分支](https://git-scm.com/docs/git-checkout/#git-checkout---orphanltnewbranchgt) ：

```
git checkout --orphan gh-pages
git reset --hard
git commit --allow-empty -m "Initializing gh-pages branch"
git push upstream gh-pages
git checkout master

```

#### 建立与部署[](#build-and-deployment)

现在， 使用git的工作 [树功能](https://git-scm.com/docs/git-worktree) 将 `gh-pages` 分支 检出 到您的 `public` 文件夹中 。 本质上，工作树允许您在不同目录中签出同一本地存储库的多个分支：[](https://git-scm.com/docs/git-worktree)

```
rm -rf public
git worktree add -B gh-pages public upstream/gh-pages

```

使用 `hugo` 命令 重新生成站点， 然后在 `gh-pages` 分支 上提交生成的文件 ：

commit\-gh\-pages\-files.sh

```sh

hugo
cd public && git add --all && git commit -m "Publishing to gh-pages" && cd ..

```

如果本地 `gh-pages` 分支中 的更改 看起来没问题，请将其推送到远程存储库：

```
git push upstream gh-pages

```

##### 设置 `gh-pages` 为您的发布分支

为了将您的 `gh-pages` 分支用作发布分支，您需要在GitHub UI中配置存储库。 一旦GitHub意识到您已经创建了这个分支，这很可能会自动发生。 您还可以从GitHub项目中手动设置分支：

1.  转到 **设置** → **GitHub页面**
2.  在 **来源中** ，选择“ gh\-pages分支”，然后选择“ **保存”** 。 如果未启用该选项，则可能尚未创建分支，或者尚未将分支从本地计算机推送到GitHub上的托管存储库。

片刻之后，您将在GitHub Pages站点上看到更新的内容。

#### 放入脚本[](#put-it-into-a-script-1)

要自动执行这些步骤，可以创建具有以下内容的脚本：

publish\_to\_ghpages.sh

```sh

#!/bin/sh

if [ "`git status -s`" ]
then
    echo "The working directory is dirty. Please commit any pending changes."
    exit 1;
fi

echo "Deleting old publication"
rm -rf public
mkdir public
git worktree prune
rm -rf .git/worktrees/public/

echo "Checking out gh-pages branch into public"
git worktree add -B gh-pages public upstream/gh-pages

echo "Removing existing files"
rm -rf public/*

echo "Generating site"
hugo

echo "Updating gh-pages branch"
cd public && git add --all && git commit -m "Publishing to gh-pages (publish.sh)"

#echo "Pushing to github"
#git push --all

```

如果工作目录中有待更改，这将中止，并且还确保删除所有先前存在的输出文件。 调整脚本以使其具有品味，例如，如果您不需要在推送之前查看gh\-pages分支，则包括最后一次推送到远程存储库。