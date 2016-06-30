export default function stringify(obj,indent:number=0,tab:string='\t',process?:(key:string,value:any,indent?:number)=>any){
	if(typeof obj == 'string'){return `'${obj.replace(/'/g,"\\'")}'`;}
	if(typeof obj == 'number'){return obj;}
	if(obj instanceof RegExp){return `/${obj.source}/${obj.flags}`;}
	if(typeof obj == 'function'){
		return obj+'';
	}
	if(typeof obj == 'boolean'){
		return obj ? 'true' : 'false';
	}
	const tabs = tab.repeat(indent);
	const previousTabs = tab.repeat(indent>0 ? indent-1 : 0);
	if(Array.isArray(obj)){
		return (
			`[\n${tabs}`+
			obj.map(el=>stringify(el,indent+1,tab,process)).join(`,\n${tabs}`)
			+`\n${previousTabs}]`
		);
	}
	return (
		`{\n${tabs}`+
		Object.keys(obj).map(function(key){
			if(process){
				const ret = process(key,obj[key],indent);
				if(ret===false){
					return;
				}
				if(ret){
					return `${ret[0]}: ${ret[1]}`;
				}
			}
			const value = stringify(obj[key],indent+1,tab,process);
			const _key = /\./.test(key) ? `'${key}'` : key;
			return `${_key}: ${value}`;
		}).filter(Boolean).join(`,\n${tabs}`)
		+`\n${previousTabs}}`
	);
}