//3方向 -, /, \
var ROW_COUNT = 9;
var MID_INDEX = 4;

var direct = {
	h : '-',
	f : '\\',
	x : '/'
}

function Hex(x, y, index, coord) {
	this.x = x;
	this.y = y;
	this.index = index;
	this.coord = coord;
	this.status = 0;
	this.color = '#fff';
}

Hex.prototype.isContain = function(x, y) {
	var _this = this;

	var ax = Math.abs(_this.coord[0] -x);
	var ay = Math.abs(_this.coord[1] -y);

	if(ay >= WIDTH || ax >= Math.sqrt(3) * WIDTH / 2) {
		return false;
	}

	if(WIDTH - ay > ax / Math.sqrt(3)) {
		return true
	} 

	return false;
}

function getRowCount(i) {
	return ROW_COUNT- Math.abs(i - MID_INDEX);
}

function  getRowsCount(i) {
	if(i < 0) return 0;

	p = 0;
	for(var j = 0; j <= i; j++) {
		p += getRowCount(j);
	}

	return p;
}

// for(var i = 0; i< 9; i++) {
// 	console.log(getRowsCount(i))
// }
// console.log(getPointByIndex(5))

// console.log(getPrevH(4,0))
// console.log(getPrevH(4,1))
// console.log(getPrevH(5,7))
// console.log(getPrevH(0,0))

// console.log(getNextH(4,8))
// console.log(getNextH(4,0))
// console.log(getNextH(4,1))
// console.log(getNextH(5,7))
// console.log(getNextH(0,0))

// console.log(getNextX(4,8))
// console.log(getNextX(4,0))
// console.log(getNextX(4,1))
// console.log(getNextX(5,7))
// console.log(getNextX(0,0))

// console.log(getPrevX(4,8))
// console.log(getPrevX(4,0))
// console.log(getPrevX(4,1))
// console.log(getPrevX(5,7))
// console.log(getPrevX(0,0))

// console.log(getNextF(4,8))
// console.log(getNextF(4,7))
// console.log(getNextF(4,0))
// console.log(getNextF(4,1))
// console.log(getNextF(5,7))
// console.log(getNextF(0,0))

// console.log(getPrevF(3,7))
// console.log(getPrevF(4,7))
// console.log(getPrevF(4,0))
// console.log(getPrevF(4,1))
// console.log(getPrevF(5,7))
// console.log(getPrevF(0,0))
// console.log(getPrevF(8,4))

// console.log(getRowH(4, 8))

function getIndexByPoint(x, y) {
	if(x === 0) return y;
	return  getRowsCount(x - 1) + y;
}

function getPointByIndex(i) {
	if(i< 0 || i > 60) return null;
	var x = 0;
	var y = 0;
	while(getRowsCount(x) <= i) {
		x ++;
	}

	y = i -getRowsCount(x -1)
	return [x, y]
}

function getNextH(x, y) {
	if(getRowCount(x) -1 <= y) return null;
	return [x, y + 1];
}

function getPrevH(x, y) {
	if(y <= 0) return null;
	return [x, y - 1];
}

function getNextX(x, y) {
	var index = getIndexByPoint(x, y);
	var rowCount = getRowCount(x);
	if(x >=4) rowCount --;
	var nextIndex = index + rowCount;
	var point = getPointByIndex(nextIndex);
	// console.log(index, nextIndex, point)
	if(!point) return null;
	if(point[0] == x + 1 && (y == point[1] || y-1 == point[1]))
		return point;
	else return null;
}

function getPrevX(x, y) {
	var index = getIndexByPoint(x, y);
	var rowCount = getRowCount(x);
	if(x <=4) rowCount --;
	var nextIndex = index - rowCount;
	var point = getPointByIndex(nextIndex);
	// console.log(index, nextIndex, point)
	if(!point) return null;
	if(point[0] == x - 1 && (y==point[1] || y + 1 == point[1]))
		return point;
	else return null;
}

function getNextF(x, y) {
	var index = getIndexByPoint(x, y);
	var rowCount = getRowCount(x);
	if(x >=4) rowCount --;
	var nextIndex = index + rowCount + 1;
	var point = getPointByIndex(nextIndex);
	// console.log(index, nextIndex, point)
	if(!point) return null;
	if(point[0] == x + 1 && (y == point[1] || y + 1 == point[1]))
		return point;
	else return null;
}

function getPrevF(x, y) {
	var index = getIndexByPoint(x, y);
	var rowCount = getRowCount(x);
	if(x <=4) rowCount --;
	var nextIndex = index - rowCount - 1;
	var point = getPointByIndex(nextIndex);
	// console.log(index, nextIndex, point)
	if(!point) return null;
	if(point[0] == x - 1 && (y==point[1] || y - 1 == point[1]))
		return point;
	else return null;
}

function getRowH(x, y) {
	var arr = [[x, y]]
	var p = [x, y];
	var t = [x, y];
	while(true) {
		p = getPrevH(p[0], p[1])
		if(!p) break;
		arr.unshift(p);
	}
	while(true) {
		t = getNextH(t[0], t[1]);
		if(!t) break;
		arr.push(t);
	}

	return arr;
}

function getRowX(x, y) {
	var arr = [[x, y]]
	var p = [x, y];
	var t = [x, y];
	while(true) {
		p = getPrevX(p[0], p[1])
		if(!p) break;
		arr.unshift(p);
	}
	while(true) {
		t = getNextX(t[0], t[1]);
		if(!t) break;
		arr.push(t);
	}

	return arr;
}

function getRowF(x, y) {
	var arr = [[x, y]]
	var p = [x, y];
	var t = [x, y];
	while(true) {
		p = getPrevF(p[0], p[1])
		if(!p) break;
		arr.unshift(p);
	}
	while(true) {
		t = getNextF(t[0], t[1]);
		if(!t) break;
		arr.push(t);
	}

	return arr;
}


function getRows(x, y) {
	ret = [];
	ret.push(getRowH(x, y));
	ret.push(getRowX(x, y));
	ret.push(getRowF(x, y));
	return ret;
}