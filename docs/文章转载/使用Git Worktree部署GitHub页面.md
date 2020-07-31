---
title: 使用Git Worktree部署GitHub页面
---
GitHub Pages是直接从您的GitHub存储库托管的网站。 通常，它与静态站点生成器一起使用。 静态站点生成器（例如Jekyll，Hugo和Gitbook）使创建站点的过程变得容易，生成的HTML页面可以托管在GitHub Pages上。

使用静态网站生成器时，将有源文件和生成的文件。 为了在GitHub Pages上托管，它需要生成的文件，但不需要源文件。 GitHub Pages支持选择源分支： `master` 或 `gh-pages` 。 因此，一般的配置是将源放在 `master` 分支中，并将生成的文件放在 `gh-pages` 分支中。

在此配置中，部署工作繁琐。 静态站点生成器通常会在子目录中生成文件，例如 `_site` 。 由于和有两个分支， `master` 因此 `gh-pages` 需要将它们从 `master` 分支 移到 分支的根目录 `gh-pages` 。 每当您要部署时，它都是必需的。

从Git 2.5开始，Git支持管理连接到同一存储库的多个工作树。 这样，您可以将git分支挂载为子目录。 这使部署过程更加容易，并且不需要 `git checkout` 。 让我们逐步了解如何做。

## 建立

首先，您需要有一个 `gh-pages` 要挂载 的 分支。 如果没有，可以使用创建分支 `git branch` 。

```bash
$ git branch gh-pages
```

这将基于主HEAD建立分支。 可以，但是 `master` 分支 的文件和git历史记录对 分支没有意义 `gh-pages` 。 使用一个孤立的分支，您可以 `gh-pages` 以一种干净的方式 进行初始化 。

```bash
$ git checkout --orphan gh-pages
$ git reset --hard
$ git commit --allow-empty -m "Init"
$ git checkout master
```

然后，您可以使用将分支挂载为子目录 `git worktree` 。 确保您没有现有的目标子目录。

```bash
$ rm -rf _site
$ git worktree add _site gh-pages
Preparing _site (identifier _site)
HEAD is now at b475e3e Initializing gh-pages branch
```

> 如果您没有 `_site` 在git中忽略，请忽略它，以免意外添加生成的文件。

```bash
$ echo "_site" >> .gitignore
```

正确设置所有内容后，将 `git branch` 显示根目录和子目录的不同分支。

```bash
$ git branch
  gh-pages
* master

$ cd _site
$ git branch
* gh-pages
  master
```

## 部署

当您构建静态站点时，生成的文件位于 `_site` 目录中。 由于 `_site` 现在是 `gh-pages` 分支，因此您可以通过创建提交并将其推送来进行部署。

```bash
$ cd _site
$ git add --all
$ git commit -m "Deploy updates"
$ git push origin gh-pages
```

## 清理

要卸载该子目录，可以运行以下命令。 运行时，它将删除工作树信息和已安装的子目录。

```bash
$ git worktree remove _site
```

> 如果删除 `_site` 不带 的 目录 `git worktree remove` ， `git worktree` 则不会知道 该 目录 ， 并继续在中显示 该 目录 `git worktree list` 。 最终将其删除（ `gc.worktreePruneExpire` ）。 如果立即清理，请运行 `git worktree prune` 。

## 使用脚本自动化

您现在了解了如何逐步进行操作。 现在，是时候使用Shell脚本进行自动化了。 使用下面的脚本，您只需要在部署时运行它即可。

```shell
#!/bin/bash
directory=_site
branch=gh-pages
build_command() {
  jekyll build
}

echo -e "\033[0;32mDeleting old content...\033[0m"
rm -rf $directory

echo -e "\033[0;32mChecking out $branch....\033[0m"
git worktree add $directory $branch

echo -e "\033[0;32mGenerating site...\033[0m"
build_command

echo -e "\033[0;32mDeploying $branch branch...\033[0m"
cd $directory &&
  git add --all &&
  git commit -m "Deploy updates" &&
  git push origin $branch

echo -e "\033[0;32mCleaning up...\033[0m"
git worktree remove $directory
```