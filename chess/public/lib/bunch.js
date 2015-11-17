function Bunch() {
	this.id = Guid.NewGuid().toString();
	this.pieces = [];
	this.eyes = [];
}

Bunch.prototype.addone = function(piece) {
	var _this = this;
	this.pieces.push(piece);
	this.eyes = _.without(_this.eyes, piece);

	return this;
}

Bunch.prototype.removeEye = function(piece) {
	this.eyes = _.without(this.eyes, piece);
	if (this.eyes.length == 0) this.remove();
	return this;
}

Bunch.prototype.merge = function(bunch) {
	if (this.id == bunch.id) return;
	this.pieces = _.union(this.pieces, bunch.pieces);
	var p = _.union(this.eyes, bunch.eyes);
	this.eyes = _.difference(p, this.pieces);

	for (var i = 0, len = bunch.pieces.length; i < len; i++) {
		bunch.pieces[i].bunch = this.id;
	}
	bunch.pieces = [];
	BUNCHES = _.without(BUNCHES, bunch);
}

Bunch.prototype.remove = function() {
	while (this.pieces.length > 0) {
		var piece = this.pieces.shift();
		var arounds = piece.getAroundPieces();

		for (var j = 0, len = arounds.enemy.length; j < len; j++) {
			var p = arounds.enemy[j];
			var b = Bunch.getById(p.bunch);

			b.eyes = _.union(b.eyes, [piece]);
		}

		piece.type = 0;
		piece.bunch = '';
	}
	this.pieces = []
	BUNCHES = _.without(BUNCHES, this);
}

Bunch.getById = function(id) {
	return _.find(BUNCHES, function(each) {
		return each.id === id
	});
}