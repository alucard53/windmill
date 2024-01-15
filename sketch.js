const points = []
const [width, height] = [700, 700]
const [centerX, centerY] = [350, 350]
let started = 0
let pivot, up, down
let prev
let theta = (Math.PI / 2)
const r = 700

function setup() {
    createCanvas(width, height)
    const button = document.getElementById("start_button")
    button.addEventListener("click", () => {
	started = 1
    })

    up = createVector(0, 0)
    down = createVector(0, 0)
}

function draw() {
    clear()

    renderPoints()
    
    if (started == 2) {
	moveLine()
	project()
    }
}

function project() {
    const m = Math.tan(theta)
    console.log(m)

    let x1 = pivot.x
    let y1 = pivot.y

    let x2 = pivot.x
    let y2 = pivot.y

    while (0 < x2 && x2 < width && 0 < y2 && y2 < height) {
	if (Math.abs(m) > 1) {
	    x2 = (-2 + m * x2) / m
	    y2 -= 2
	} else {
	    y2 = -2 * m + y2
	    x2 -= 2
	}
	fill(0, 0, 255)
	circle(x2, y2, 5)

	for (p of points) {
	    if (p !== pivot && p !== prev) {
		if (isPoint(x2, y2, p)) {
		    prev = pivot
		    pivot = p
		    console.log(p)
		    return
		}
	    }
	}

    }
    
    while (0 < x1 && x1 < width && 0 < y1 && y1 < height ) {
	if (Math.abs(m) > 1) {
	    x1 = (2 + m * x1) / m
	    y1 += 2
	} else {
	    y1 = 2 * m + y1
	    x1 += 2
	}

	fill(0, 255, 0)
	circle(x1, y1, 5)
	
	
	for (p of points) {
	    if (p !== pivot && p !== prev) {
		if (isPoint(x1, y1, p)) {
		    prev = pivot
		    pivot = p
		    console.log(p)
		    return
		}
	    }
	}
	// m = y2 - y1 / x2 - x1, y2 = m(x2 - x1) + y1, x2 = ((y2 - y1) + m*x1) / m
    }
}

function renderLine() {
    line(up.x, up.y, pivot.x, pivot.y)
    line(pivot.x, pivot.y, down.x, down.y)
}

function moveLine() {
    if (theta > 2 * Math.PI) {
	theta = 0
    }
    theta += 0.01
    up.x = pivot.x + r * Math.cos(theta)
    up.y = pivot.y + r * Math.sin(theta)

    down.x = pivot.x + r * Math.cos(theta + Math.PI)
    down.y = pivot.y + r * Math.sin(theta + Math.PI)
    
    renderLine()
}

function setLine() {
    up.x = pivot.x
    up.y = 0

    down.x = pivot.x
    down.y = height
}

function mouseClicked() {
    if (started == 0) {
	addPoint(mouseX, mouseY)
    } else if (started == 1){
	findPoint(mouseX, mouseY)
    }
}

function findPoint(x, y) {
    for (p of points) {
	if (isPoint(x, y, p)) {
	    pivot = p
	    prev = p
	    started = 2
	    setLine()
	    break
	}
    }    
}

function isPoint(x, y, p) {
    return (Math.pow(x - p.x, 2) + Math.pow(y - p.y, 2) <= 25)
}

function addPoint(x, y) {
    if (0 < x  && x < width && 0 < y && y < height) {
	points.push(createVector(x, y))
    }
    console.log(points.length)
}

function renderPoints() {
    for (p of points) {
	fill(0)
	circle(p.x, p.y, 5)
    }
}
