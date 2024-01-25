function filterObjectsByGroupBloodNotAllowed(objects, bloodType, value) {
	return objects.filter(object => object.groupBloodNotAllowed[bloodType] === value);
};

export { filterObjectsByGroupBloodNotAllowed };