export default function defaultsProvider(containers:Array<any>){
	const _containers = containers.filter(Boolean).map(function(container){
		const lowerCasedContainer = {};
		Object.keys(container).forEach(function(name){
			lowerCasedContainer[name.toLowerCase()] = container[name];
		});
		return lowerCasedContainer;
	})
	const length = _containers.length || 0;
	return function def<T>(prop:string,defaultValue:T):T{
		let i = 0;
		const _prop = prop.toLowerCase();
		while(i < length){
			const currentContainer = _containers[i++];
			if(_prop in currentContainer){
				return currentContainer[_prop];
			}
		}
		return defaultValue;
	}
}