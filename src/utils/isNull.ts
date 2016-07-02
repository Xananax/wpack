export default function IsNull(thing){
	return (
		thing == null || 
		thing == '' || 
		( Array.isArray(thing) && thing.length == 0 ) ||
		( typeof thing == 'object' && Object.keys(thing).length == 0)
	);
}