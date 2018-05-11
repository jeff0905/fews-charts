'use strict'
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const chokidar = require('chokidar')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}


// mock...
const getConfig = (filepath) => {
  return require(filepath);
}
const applyMock = (app) => {
  console.log(chalk.bgGreen('Mock服务'),'Mock文件位于:',mockDir);
  console.log('*********加载或更新Mock.js服务*********');
  let apiIndex = 1;
  const apis = [];
  fs.readdir(mockDir,function(err,files){
    files.forEach((file,index) => {
      const requireFile = `${mockDir}/${file}`;
      console.log(chalk.blue('解析第' + (++index) + '文件'), requireFile);
      console.log(require.cache);
      if (require.cache[requireFile]) {
        console.log(`${chalk.red('删除缓存')}`)
        delete require.cache[requireFile]
      }
      const mockObject = getConfig(requireFile);
      Object.keys(mockObject).forEach((val,index) => {
        Object.keys(mockObject[val]).forEach((key,index) => {
          const apiKeys = key.split(' ');
          const method = apiKeys[0];
          const apiPath = apiKeys[1];
          const apiFn = mockObject[val][key];
          apis.push({
            method,
            apiPath,
            apiFn
          })
          app.get(apiPath, apiFn);
          console.log(chalk.blue('读取第' + (++apiIndex) + '个api接口'), `method=${method},path=${apiPath},${apiFn}`);
        })
      })
    })
  });

  console.log(chalk.blue('读取完毕'));
  watchMockDir(app);

  return apis;
}
const mockDir = path.resolve(__dirname, './../Mock');
const watchMockDir = (app) => {
  console.log(chalk.blue('开始监听Mock文件夹的变动'));
  const watcher = chokidar.watch([mockDir], {
    ignored: /node_modules/,
    ignoreInitial: true,
  });
  watcher.on('change', path => {
    console.log(chalk.green('CHANGED'), path);
    watcher.close();
    // 删除旧的 mock api
    // app._router.stack.splice(lastIndex - 1, mockAPILength);
    applyMock(app);
  });
  watcher.on('add', path => {
    console.log(chalk.green('mock文件夹添加', path));
    watcher.close();
    applyMock(app);
  })
}

exports.applyMock = applyMock;


