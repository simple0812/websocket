function text(ctx, str, x, y, font, color, align, dir) {
    ctx.save();
    ctx.beginPath();
    ctx.font = font;
    ctx.textAlign = align;
    ctx.fillStyle = color;

    if (dir != undefined && dir != null) {
        ctx.translate(x, y);
        ctx.rotate(Math.PI / 2);
        ctx.fillText(str, 0, 0);
    } else {
        ctx.fillText(str, x, y);
    }

    ctx.restore();
    ctx.closePath();
}

function wrapText(context, words, x, y, fontStyle, color, align, maxWidth, maxHeight, lineHeight) {
    context.save();
    var line = '';
    var testHeight = y + maxHeight;

    context.font = fontStyle;
    context.fillStyle = color;
    context.textAlign = align;
    context.rect(x, y - lineHeight, maxWidth, maxHeight);
    context.clip();

    for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n];
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth) {
            context.fillText(line, x, y);
            line = words[n];
            y += lineHeight;
        } else {
            line = testLine;
        }
    }

    context.fillText(line, x, y);
    context.restore();
}


function drawline(ctx, sx, sy, ex, ey) {
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(ex, ey);
    ctx.stroke();
    ctx.save();
    ctx.closePath();

}

function drawArc(ctx, sx, sy, r) {
    ctx.beginPath();
    ctx.arc(sx, sy, r, 0, Math.PI * 2, true);

    ctx.fillStyle = "#666";
    ctx.fill();
    ctx.closePath();
}

function drawHex(ctx, x, y, color) {
    color = color || '#fff'
    var points = [
        [x, y - WIDTH],
        [x + WIDTH * COS30, y - WIDTH * SIN30],
        [x + WIDTH * COS30, y + WIDTH* SIN30 ],
        [x, y + WIDTH  ],
        [x - WIDTH * COS30, y + WIDTH* SIN30 ],
        [x - WIDTH * COS30, y - WIDTH* SIN30]
    ]

    CTX.fillStyle = color;

    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    // ctx.lineTo(ex, ey);
    // ctx.stroke();
    // ctx.save();
    // ctx.closePath();

    // drawline(CTX, points[0][0], points[0][1], points[5][0], points[5][1]);
    for(var i =1; i< 6; i++ ) {
        var p = points[i];
        ctx.lineTo(p[0], p[1]);
    }

    ctx.lineTo(points[0][0], points[0][1]);

    ctx.stroke();
    ctx.fill();
    ctx.save();
    ctx.closePath();
    
}


function drawPiece(ctx, sx, sy, r, pieceType) {

    if (pieceType == 0) return;

    ctx.beginPath();
    ctx.arc(sx, sy, r, 0, Math.PI * 2, true);

    var grd = ctx.createLinearGradient(sx - r, sy - r, sx + r, sy + r);
    grd.addColorStop(0, "#ccc");

    if (pieceType == -1)
        grd.addColorStop(1, "#000");
    else if (pieceType == 1)
        grd.addColorStop(1, "#fff");

    ctx.fillStyle = grd;
    ctx.fill();
    ctx.closePath();
}

function windowToCanvas(canvas, x, y) { //鼠标坐标点切换
    var bbox = canvas.getBoundingClientRect();

    return {
        x: (x - bbox.left) * (canvas.width / bbox.width),
        y: (y - bbox.top) * (canvas.height / bbox.height)
    };
}

