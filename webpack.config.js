module.exports = {
	entry: [
		__dirname + '/src/index.js'
	],
	output: {
		filename: 'index.js',
		path: __dirname + '/dist'
	},
	watch: true,
	watchOptions: {
		ignored: '**/node_modules'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use:{
					loader: 'babel-loader',
					options: {
						presets: [ '@babel/preset-env', '@babel/preset-react']
					}
				}
		}
		]
	}
};
