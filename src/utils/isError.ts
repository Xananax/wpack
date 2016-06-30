import isObject from './isObject';

export default function isError(thing):thing is Error{
	return isObject(thing) && (thing instanceof Error);
}