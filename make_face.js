function make_vertices() {
    var nVertex = polylineDat.length / 3;
    for (var i = 0; i < nVertex; i++) {
        if (polylineDat[i * 3] == 0) {
            var v = new Vertex(polylineDat[i * 3], polylineDat[i * 3 + 1], polylineDat[i * 3 + 2]);
            v.mateVertex = new THREE.Vector3(polylineDat[i * 3], polylineDat[i * 3 + 1], polylineDat[i * 3 + 2]);
            head.vertices.push(v);
        } else {
            v = new Vertex(polylineDat[i * 3], polylineDat[i * 3 + 1], polylineDat[i * 3 + 2]);
            v.mateVertex = new THREE.Vector3(-polylineDat[i * 3], polylineDat[i * 3 + 1], polylineDat[i * 3 + 2]);
            head.vertices.push(v);
        }
    }
    for (var i = 0; i < nVertex; i++) {
        if (polylineDat[i * 3] == 0) {
            var r = new Vertex(-polylineDat[i * 3], polylineDat[i * 3 + 1], polylineDat[i * 3 + 2]);
            r.mateVertex = new THREE.Vector3(polylineDat[i * 3], polylineDat[i * 3 + 1], polylineDat[i * 3 + 2]);
            head.vertices.push(r);
        } else {
            r = new Vertex(-polylineDat[i * 3], polylineDat[i * 3 + 1], polylineDat[i * 3 + 2]);
            r.mateVertex = new THREE.Vector3(polylineDat[i * 3], polylineDat[i * 3 + 1], polylineDat[i * 3 + 2]);
            head.vertices.push(r);
        }
    }
}

function make_face() {
    make_vertices();
    var npolygons = indexDat.length / 4;
    for (var i = 0; i < npolygons; i++) {
        var p = new Polygon();
        if (indexDat[4 * i] - 1 === 999) {
            var v1 = head.vertices[indexDat[4 * i + 1] - 1];
            var v2 = head.vertices[indexDat[4 * i + 2] - 1];
            var v3 = head.vertices[indexDat[4 * i + 3] - 1];
            p.vertices.push(v1);
            p.vertices.push(v2);
            p.vertices.push(v3);
            // add_polygon_to_face
            head.polygons.push(p);
            v1.plist.push(p);
            v2.plist.push(p);
            v3.plist.push(p);

        } else {
            v1 = head.vertices[indexDat[4 * i + 0] - 1];
            v2 = head.vertices[indexDat[4 * i + 1] - 1];
            v3 = head.vertices[indexDat[4 * i + 2] - 1];
            p.vertices.push(v1);
            p.vertices.push(v2);
            p.vertices.push(v3);
            // add_polygon_to_face
            v1.plist.push(p);
            v2.plist.push(p);
            v3.plist.push(p);

            v1 = head.vertices[indexDat[4 * i + 0] - 1];
            v2 = head.vertices[indexDat[4 * i + 2] - 1];
            v3 = head.vertices[indexDat[4 * i + 3] - 1];
            p.vertices.push(v1);
            p.vertices.push(v2);
            p.vertices.push(v3);
            // add_polygon_to_face
            head.polygons.push(p);
            v1.plist.push(p);
            v2.plist.push(p);
            v3.plist.push(p);
        }
    }

    for (var i = 0; i < npolygons; i++) {
        var r = new Polygon();
        if (indexDat[4 * i] - 1 === 999) {
            var x1 = indexDat[4 * i + 1] + 255;
            var x2 = indexDat[4 * i + 3] + 255;
            var x3 = indexDat[4 * i + 2] + 255;
            if (head.vertices[x1] == 0) x1 = indexDat[4 * i + 1] - 1;
            if (head.vertices[x2] == 0) x2 = indexDat[4 * i + 3] - 1;
            if (head.vertices[x3] == 0) x3 = indexDat[4 * i + 2] - 1;
            v1 = head.vertices[x1];
            v2 = head.vertices[x2];
            v3 = head.vertices[x3];
            r.vertices.push(v1);
            r.vertices.push(v2);
            r.vertices.push(v3);
            // add_polygon_to_face
            head.polygons.push(r);
            v1.plist.push(r);
            v2.plist.push(r);
            v3.plist.push(r);

        } else {
            x1 = indexDat[4 * i + 0] + 255;
            x2 = indexDat[4 * i + 2] + 255;
            x3 = indexDat[4 * i + 1] + 255;
            if (head.vertices[x1] == 0) x1 = indexDat[4 * i + 0] - 1;
            if (head.vertices[x2] == 0) x2 = indexDat[4 * i + 2] - 1;
            if (head.vertices[x3] == 0) x3 = indexDat[4 * i + 1] - 1;
            v1 = head.vertices[x1];
            v2 = head.vertices[x2];
            v3 = head.vertices[x3];
            r.vertices.push(v1);
            r.vertices.push(v2);
            r.vertices.push(v3);
            // add_polygon_to_face
            v1.plist.push(r);
            v2.plist.push(r);
            v3.plist.push(r);

            x1 = indexDat[4 * i + 0] + 255;
            x2 = indexDat[4 * i + 3] + 255;
            x3 = indexDat[4 * i + 2] + 255;
            if (head.vertices[x1] == 0) x1 = indexDat[4 * i + 0] - 1;
            if (head.vertices[x2] == 0) x2 = indexDat[4 * i + 3] - 1;
            if (head.vertices[x3] == 0) x3 = indexDat[4 * i + 2] - 1;
            v1 = head.vertices[x1];
            v2 = head.vertices[x2];
            v3 = head.vertices[x3];
            r.vertices.push(v1);
            r.vertices.push(v2);
            r.vertices.push(v3);
            // add_polygon_to_face
            head.polygons.push(r);
            v1.plist.push(r);
            v2.plist.push(r);
            v3.plist.push(r);
        }
    }
}

function make_expression() {
    var nexpression = expressionDat.length / 37;
    for (var i = 0; i < nexpression; i++) {
        var e = new Expression(expressionDat[37 * i]);
        for (var j = 0; j < head.muscles.length * 2; j++)
        e.m.push(expressionDat[37 * i + j + 1]);
        head.expressions.push(e);
    }
}

function make_jawpointers() {
    var i, j, k, l;
    var poly = [];
    var fac = [];
    for (i = 0; i < 58; i++) {
        for (l = 0; l < 3; l++) {
            if (l == 0) poly[l] = head.vertices[i].xyz.x;
            if (l == 1) poly[l] = head.vertices[i].xyz.y;
            if (l == 2) poly[l] = head.vertices[i].xyz.z;
        }
        for (j = 0; j < head.polygons.length; j++) {
            for (k = 0; k < 3; k++) {
                for (l = 0; l < 3; l++) {
                    if (l == 0) fac[l] = head.polygons[j].vertices[k].xyz.x;
                    if (l == 1) fac[l] = head.polygons[j].vertices[k].xyz.y;
                    if (l == 2) fac[l] = head.polygons[j].vertices[k].xyz.z;
                }
                if (poly[0] == fac[0] && poly[1] == fac[1] && poly[2] == fac[2] || poly[0] == -fac[0] && poly[1] == fac[1] && poly[2] == fac[2]) {
                    var t = new Tag();
                    t.poly = j;
                    t.vert = k;
                    head.jawtags.push(t)
                }
            }
        }
    }
}

function rotate_jaw(angle) {
    var fullang, radang, halfang;
    var i, j, pol, vtx;
    var temp, x, y, z;

    fullang = angle * 0.017453292;
    halfang = radang * 0.5;
    radang = fullang;

    for (i = 0; i < head.jawtags.length; i++) {
        pol = head.jawtags[i].poly;
        vtx = head.jawtags[i].vert;
        for (j = 0; j < 3; j++) {
            temp = head.polygons[pol].vertices[vtx].xyz.y;
            x = head.polygons[pol].vertices[vtx].xyz.x;
            y = head.polygons[pol].vertices[vtx].xyz.y;
            z = head.polygons[pol].vertices[vtx].xyz.z;

            head.polygons[pol].vertices[vtx].xyz.y = (Math.cos(radang) * y) + ((-(Math.sin(radang)) * z));
            head.polygons[pol].vertices[vtx].xyz.z = ((Math.sin(radang)) * temp + (Math.cos(radang) * z));
        }
    }
}

function calculate_minmax() {
    var i, j;
    // Set the min max values 
    head.minx = head.miny = 10000;
    head.maxx = head.maxy = -10000;

    for (i = 0; i < head.polygons.length; i++) {
        for (j = 0; j < 3; j++) {
            // Check the min maxes
            if (head.polygons[i].vertices[j].xyz.x < head.minx) head.minx = head.polygons[i].vertices[j].xyz.x;
            if (head.polygons[i].vertices[j].xyz.x > head.maxx) head.maxx = head.polygons[i].vertices[j].xyz.x;
            if (head.polygons[i].vertices[j].xyz.y < head.miny) head.miny = head.polygons[i].vertices[j].xyz.y;
            if (head.polygons[i].vertices[j].xyz.y > head.maxy) head.maxy = head.polygons[i].vertices[j].xyz.y;
        }
    }
}

function calculate_texture_coords() {
    var difx, dify;
    var X, Y;
    var i, j;

    difx = head.maxx + Math.abs(head.minx);
    dify = head.maxy + Math.abs(head.miny);

    for (i = 0; i < head.polygons.length; i++) {

        for (j = 0; j < 3; j++) {

            X = head.polygons[i].vertices[j].xyz.x;
            Y = head.polygons[i].vertices[j].xyz.y;

            // Shift to the positive quadrant.
            X += Math.abs(head.minx);
            Y += Math.abs(head.miny);

            // Normalize the face coords in X and Y [0-1]
            head.polygons[i].vertices[j].tex[0] = X / difx;
            head.polygons[i].vertices[j].tex[1] = Y / dify;

        }
    }
}

function calculate_eye_texture_coords() {
    var difx, dify;
    var X, Y;
    var i, j;

    difx = 1.35 * 2;
    dify = 1.35 * 2;

    for (i = 0; i < head.leyepolygon.length; i++) {

        for (j = 0; j < 3; j++) {

            X = head.leyepolygon[i].vertices[j].xyz.x;
            Y = head.leyepolygon[i].vertices[j].xyz.y;

            // Shift to the positive quadrant.
            X += Math.abs(head.minx);
            Y += Math.abs(head.miny);

            // Normalize the face coords in X and Y [0-1]
            head.leyepolygon[i].vertices[j].tex[0] = X / difx;
            head.leyepolygon[i].vertices[j].tex[1] = Y / dify;

        }
    }
}