function Tag() {
    this.poly = null;
    this.vert = null;
}

function Expression(name) {
    this.name = name;
    this.m = [];
}

function Muscle(name, headx, heady, headz, tailx, taily, tailz, fs, fe, zone, clampv) {
    this.active = 0;
    this.head = new THREE.Vector3(headx, heady, headz);
    this.tail = new THREE.Vector3(tailx, taily, tailz);
    this.zone = zone;
    this.fs = fs;
    this.fe = fe;
    this.name = name;
    this.clamp = clampv;
}

function Vertex(x, y, z) {
    this.xyz = new THREE.Vector3(x, y, z);
    this.nxyz = new THREE.Vector3(x, y, z);
    this.mateVertex = null;
    this.plist = [];
    this.tex = [];
}

function Polygon() {
    this.vertices = [];
}

function Head() {
    this.polygons = [];
    this.vertices = [];
    this.muscles = [];
    this.expressions = [];
    //this.jawtags = [];
    this.leyepolygon = [];
    this.reyepolygon = [];
    this.minx = null;
    this.maxx = null;
    this.miny = null;
    this.maxy = null;
}