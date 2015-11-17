var go = (function() {
	function initPieces() {
		for (var i = 0; i < 19; i++) {
			PIECES[i] = new Array();
			for (var j = 0; j < 19; j++) {
				PIECES[i][j] = new Piece((i + 1) * (j + 1), (i + 1) * go.span, (j + 1) * go.span);
			}
		}
	}

	function initBoard() {
		for (var i = 0; i < 19; i++) {
			var sx = this.span * (i + 1);

			drawline(CTX, sx, this.span, sx, this.height - this.span);
			CTX.strokeText(i + "", sx - 5, 20);
			CTX.strokeText(i + "", 10, sx + 5);
			drawline(CTX, this.span, sx, this.width - this.span, sx);
		}

		drawArc(CTX, PIECES[3][3].x * 30, PIECES[3][3].y * 30, 6);
		drawArc(CTX, 30 * 4, 30 * 4, 6);
		drawArc(CTX, 30 * 4, 30 * 16, 6);
		drawArc(CTX, 30 * 16, 30 * 4, 6);
		drawArc(CTX, 30 * 16, 30 * 16, 6);
		drawArc(CTX, 30 * 10, 30 * 10, 6);
	}

	function render() {
		CVS.width += 0;
		this.initBoard();
		//clear blank bunch
		BUNCHES = _.filter(BUNCHES, function(each) {
			return each.pieces.length !== 0
		}) || [];

		//clear death bunch
		for (var i = 0; i < BUNCHES.length; i++) {
			var bunch = BUNCHES[i];
			if (bunch.eyes.length) continue;
			//no eyes
			bunch.remove();
		}

		for (var i = 0; i < PIECES.length; i++) {
			for (var j = 0; j < PIECES[i].length; j++) {
				var piece = PIECES[i][j];
				drawPiece(CTX, piece.x, piece.y, 14, piece.type);
			}
		}

		console.log(BUNCHES);
		//console.log(PIECES)
	}

	return {
		span: 30,
		width: 600,
		height: 600,
		initPieces: initPieces,
		initBoard: initBoard,
		render: render,

	}
})()