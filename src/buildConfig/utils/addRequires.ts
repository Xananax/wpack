export default function addRequires(requires:any,moduleName:string,localName:string){
	if(!(moduleName in requires)){
		requires[moduleName] = localName
	}
	return true;
}