import isString from './isString';

export default function stringToArr(str:string|string[],sep:string=','):string[]{
	return isString(str) ? 
		str.split(sep).map(s=>s.trim()).filter(Boolean) :
		str
}