const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageMinPlugin = require('imagemin-webpack');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

/**
 * Для автоматической компиляции pug
 */
function generateHtmlPlugins(templateDir) {
  // Read files in template directory
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
  return templateFiles.map(item => {
    // Split names and extension
    const parts = item.split('.');
    const name = parts[0];
    const extension = parts[1];

    // const filename = name === 'index' ? `${name}.html` : `${name}/index.html`;
    // Create new HTMLWebpackPlugin with options
    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
    });
  });
}

const PugToHTMLPlugin = generateHtmlPlugins('./src/assets/pug/pages');

const fileLoader = {
  loader: 'file-loader',
  options: {
    name: '[path]/[name].[ext]',
  },
};

const optimization = () => {
  const config = {};

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: ['default', {
            discardComments: {
              removeAll: true,
            },
          },
          ],
        },
      }),
      new TerserPlugin(),
    ];
  }

  return config;
};

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: [
    // '@babel/polyfill',
    './src/index.js',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'project.min.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 4100,
  },
  optimization: optimization(),
  resolve: {
    alias: { // На случай, если придется прописывать длинные пути
      '@scripts': path.resolve(__dirname, './src/assets/scripts/'),
      '@styles': path.resolve(__dirname, './src/assets/styles/'),
      '@img': path.resolve(__dirname, './src/assets/media/img/'),
      '@files': path.resolve(__dirname, './src/assets/files/'),
      '@fonts': path.resolve(__dirname, './src/assets/media/fonts/'),
    },
    extensions: ['.ts', '.js', '.json'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].min.css',
    }),
    new CleanWebpackPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [autoprefixer()],
      },
    }),
  ].concat(PugToHTMLPlugin),
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: true,
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          'css-loader?url=false',
          'postcss-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/i,
        use: [
          fileLoader,
          {
            loader: ImageMinPlugin.loader,
            options: {
              bail: false,
              cache: false,
              imageminOptions: {
                plugins: [
                  [
                    'pngquant',
                    {
                      quality: [0.5, 0.6],
                      speed: 6,
                    },
                  ],
                  [
                    'mozjpeg',
                    {
                      quality: 65,
                      progressive: true,
                    },
                  ],
                  [
                    'gifsicle',
                    {
                      interlaced: true,
                      optimizationLevel: 3,
                    },
                  ],
                  [
                    'svgo',
                    {
                      plugins: [
                        {
                          removeViewBox: false,
                        },
                      ],
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(ttf|woff|woff2|eot|otf)$/i,
        use: [fileLoader],
      },
      {
        test: /\.(pdf)$/i,
        use: [fileLoader],
      },
      {
        test: /\.json$/,
        type: 'javascript/auto',
        use: [fileLoader],
      },
      {
        test: /\.ts$/,
        loader: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-typescript',
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-transform-classes',
            ],
          },
        },
      },
    ],
  },
};
