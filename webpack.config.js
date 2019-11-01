module.exports = {
    entry: './src/index.js',
    output: {
      path: __dirname+'/public',
      filename: 'index.js'
    },




    module:{
        rules: [{
            test: /.(js|jsx)$/,
            include: [],
            loader: 'babel-loader',
    
            options: {
              plugins: ['syntax-dynamic-import'],
    
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: false
                  }
                ]
              ]
            }
          }]
    }
};