function getHexByCoord(x, y) {
	for (var i = 0; i < HEXS.length; i++) {

		for (var j = 0; j < HEXS[i].length; j++) {
			var p = HEXS[i][j];

			if (p.isContain(x, y)) {
				return p;
			}
		}

	}

	return null;
}