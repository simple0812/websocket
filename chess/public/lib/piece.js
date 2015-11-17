function Piece(id, x, y, type, bunch) {
	this.id = id || 0;
	this.x = x == undefined ? -1 : x;
	this.y = y == undefined ? -1 : y;
	this.type = type || 0; //-1: black, 0:blank, 1:white;
	this.bunch = bunch || '';
}

Piece.prototype.getAroundPieces = function() {
	var _this = this;
	var arounds = {
		blank: [],
		enemy: [],
		friend: [],
	}

	function initArounds(piece) {
		if (piece.type == 0) arounds.blank.push(piece)
		else if (piece.type == _this.type) arounds.friend.push(piece);
		else arounds.enemy.push(piece);
	}

	var pieces = [];
	var x = this.x / go.span - 1;
	var y = this.y / go.span - 1;

	if (x - 1 >= 0) initArounds(PIECES[x - 1][y]);
	if (y + 1 <= 18) initArounds(PIECES[x][y + 1]);
	if (x + 1 <= 18) initArounds(PIECES[x + 1][y]);
	if (y - 1 >= 0) initArounds(PIECES[x][y - 1]);

	return arounds;
}

Piece.prototype.process = function() {
	var _this = this;
	var arounds = this.getAroundPieces();

	//1.如果没有临近的棋子 则添加一个 bunch
	//2.如果临近的棋子中没有同类 则添加一个bunch 并且减少对方的bunch的eyes
	//3.如果有临近的同类 则将该棋子添加到同类的bunch中
	//4.如果有多个临近的同类则需要合并同类的bunch

	var xbunch = new Bunch();
	xbunch.eyes = arounds.blank;
	xbunch.pieces.push(this);

	this.bunch = xbunch.id;

	BUNCHES.push(xbunch);

	for (var i = 0, len = arounds.enemy.length; i < len; i++) {
		var piece = arounds.enemy[i];
		var bunch = Bunch.getById(piece.bunch);

		if (bunch) bunch.removeEye(_this);
	}

	for (var i = 0, len = arounds.friend.length; i < len; i++) {
		var piece = arounds.friend[i];
		var bunch = Bunch.getById(piece.bunch);
		bunch.merge(Bunch.getById(this.bunch));
	}
}