var path = require('path');

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {loader: "babel-loader"}
                ]
                
            },
            {
                test: /(\.css|\.scss)$/,
                include: path.join(__dirname,"/node_modules/react-datepicker/dist/"),
                loaders: ['style-loader', 'css-loader']
              },
        ]
    }
}