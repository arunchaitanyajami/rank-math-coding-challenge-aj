module.exports = {
	entry: [
		__dirname + '/src/index.js',
		__dirname + '/src/styles.scss'
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
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'file-loader',
						options: {name: '[name].min.css'}
					},
					'sass-loader'
				],
			}
		]
	}
};
