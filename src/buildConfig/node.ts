export default function buildNode
	():WEBPACK.Node
	{
		return (
			{ console: true
			, global: true
			, process: true
			, Buffer: true
			, __filename: false
			, __dirname: false
			, setImmediate: true
			}
		);
	} 