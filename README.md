# macOS

<!-- vim-markdown-toc GFM -->

+ [依賴環境](#依賴環境)
    * [brew](#brew)
    * [yarn](#yarn)
+ [使用方式](#使用方式)
    * [git](#git)

<!-- vim-markdown-toc -->

---

# 依賴環境

## brew

```zsh
brew install yarn
```

## yarn

```zsh
yarn global add browser_sync
yarn global add browser-sync-close-hook
yarn global add del
yarn global add gulp
yarn global add gulp-clean-css
yarn global add gulp-concat
yarn global add gulp-html-replace
yarn global add gulp_htmlmin
yarn global add gulp_sass
yarn global add gulp-terser
yarn global add gulp-typescript

```

# 使用方式

## git

```zsh
git clone https://github.com/misakisuna705/Fall-Detection.git ~/Fall_Detection

cd ~/Fall_Detection/Web_Center
gulp

cd ~/Fall_Detection/Data_Server
node init.js --host mqtt://網址 --username 使用者 --password 密碼 --firebase adminsdk.json --topics "主題"
```
