---
title: npm 命令报权限不足错误 Error EACCES permission denied
---
在使用 `npm` 命令安装组件的时候，经常会报 `权限不足` 的错误：`Error: EACCES: permission denied` ，虽然用 `sudo` 可以解决问题，但都只是暂时的；

## 错误信息

```markdown
npm WARN checkPermissions Missing write access to /usr/local/lib/node_modules
npm ERR! path /usr/local/lib/node_modules
npm ERR! code EACCES
npm ERR! errno -13
npm ERR! syscall access
npm ERR! Error: EACCES: permission denied, access '/usr/local/lib/node_modules'
npm ERR!  { [Error: EACCES: permission denied, access '/usr/local/lib/node_modules']
npm ERR!   stack:
npm ERR!    'Error: EACCES: permission denied, access \'/usr/local/lib/node_modules\'',
npm ERR!   errno: -13,
npm ERR!   code: 'EACCES',
npm ERR!   syscall: 'access',
npm ERR!   path: '/usr/local/lib/node_modules' }
npm ERR!
npm ERR! The operation was rejected by your operating system.
npm ERR! It is likely you do not have the permissions to access this file as the current user
npm ERR!
npm ERR! If you believe this might be a permissions issue, please double-check the
npm ERR! permissions of the file and its containing directories, or try running
npm ERR! the command again as root/Administrator (though this is not recommended).

npm ERR! A complete log of this run can be found in:
```

## 解决方法

*   官方的[解决方案](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally)
*   里面有`两种`方法

1.  重装 version manager
2.  改变 npm 的默认路径

## [全局安装软件包时解决EACCES权限错误](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally)

如果 `EACCES` 在尝试 [全局安装软件包](https://docs.npmjs.com/downloading-and-installing-packages-globally) 时 看到 错误 ，则可以：

*   使用节点版本管理器重新安装npm（推荐），

要么

*   手动更改npm的默认目录

## [重新安装NPM与节点版本管理 §](#reinstall-npm-with-a-node-version-manager)

这是避免权限问题的最佳方法。 要使用节点版本管理器重新安装npm，请按照“ [下载并安装Node.js和npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) ”中 的步骤进行操作 。 在安装节点版本管理器之前，不需要删除当前版本的npm或Node.js。

## [手动更改npm的默认目录 §](#manually-change-npms-default-directory)

注意： 本部分不适用于Microsoft Windows。

为了最大程度地减少权限错误的可能性，您可以将npm配置为使用其他目录。 在此示例中，您将在主目录中创建并使用隐藏目录。

1.  备份您的计算机。
2.  在命令行的主目录中，为全局安装创建目录：

    ```
     mkdir ~/.npm-global

    ```

3.  配置npm以使用新的目录路径：

    ```
     npm config set prefix '~/.npm-global'

    ```

4.  在您喜欢的文本编辑器中，打开或创建一个 `~/.profile` 文件并添加以下行：

    ```
     export PATH=~/.npm-global/bin:$PATH

    ```

5.  在命令行上，更新系统变量：

    ```
     source ~/.profile

    ```

6.  要测试新配置，请在不使用的情况下全局安装软件包 `sudo` ：

    ```
     npm install -g jshint

    ```

可以使用相应的ENV变量代替步骤2\-4（例如，如果您不想修改 `~/.profile` ）：

```
    NPM_CONFIG_PREFIX=~/.npm-global

```

## npx：运行全局命令的替代方法

如果使用的是npm 5.2或更高版本，则可能要考虑 [使用npx](https://www.npmjs.com/package/npx) 作为运行全局命令的替代方法，尤其是在偶尔仅需要一个命令的情况下。 有关更多信息，请参见 [有关npx的本文](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) 。