export default function isArray(thing:any):thing is Array<any>{
	return (thing && Array.isArray(thing));
}