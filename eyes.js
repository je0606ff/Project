function make_eyes() {
    var radius, radstore;
    var angleinc, angle, noslat, lat, latinc, height, heightinc, z;
    var c, d, k, s, s1, nosseg;
    var x = 0,
        y = 0;
    var v1 = [],
        v2 = [],
        v3 = [],
        v4 = [];
    var x1 = [],
        y1 = [],
        z1 = [];

    radius = 1.35;
    nosseg = 12;
    noslat = 6;
    angleinc = 360.0 / nosseg;
    latinc = 90.0 / noslat;
    lat = 0.0;
    radstore = radius;

    for (d = 0; d < noslat; d++) {
        angle = 0.0;
        x1[d] = [];
        y1[d] = [];
        for (c = 0; c < nosseg; c++) {
            x1[d][c] = x = radius * Math.cos(angle * 0.017453292);
            y1[d][c] = y = radius * Math.sin(angle * 0.017453292);
            angle += angleinc;
        }
        lat += latinc;
        radius = radstore * Math.cos(lat * 0.017453292);
    }

    // Now create a Z height reducing each time by heightinc
    heightinc = 90.0 / noslat;
    height = 0.0;
    z = 0.0;

    for (d = 0; d < noslat; d++) {
        z1[d] = z;
        height += heightinc;
        z = radstore * Math.sin(height * 0.017453292);
    }

    heightinc = 90.0 / noslat;
    height = 0.0;
    z = 0.0;

    // Put the layers together.
    for (d = 0; d < noslat; d++) {

        for (c = 0; c < nosseg; c++) {

            // Doh! we need this glop to take care of the last
            // segments so they join up with the first.
            if (c == nosseg - 1) {
                s1 = 0;
                s = c;
            } else {
                s1 = c + 1;
                s = c;
            }

            // Now check to see if we are right at the last polygons
            // Special case to close off the pupil.
            if (d == noslat - 1) {

                //Make a triangle.
                v1[0] = x1[d][s];
                v1[1] = y1[d][s];
                v1[2] = z1[d];

                v2[0] = 0.0;
                v2[1] = 0.0;
                v2[2] = radstore;

                v3[0] = x1[d][s1];
                v3[1] = y1[d][s1];
                v3[2] = z1[d];

                var p = new Polygon();
                for (k = 0; k < 3; k++)
                p.vertices[k] = new Vertex();
                for (k = 0; k < 3; k++) {
                    if (k == 0) p.vertices[0].nxyz.x = p.vertices[0].xyz.x = v1[k];
                    if (k == 1) p.vertices[0].nxyz.y = p.vertices[0].xyz.y = v1[k];
                    if (k == 2) p.vertices[0].nxyz.z = p.vertices[0].xyz.z = v1[k];

                    if (k == 0) p.vertices[1].nxyz.x = p.vertices[1].xyz.x = v2[k];
                    if (k == 1) p.vertices[1].nxyz.y = p.vertices[1].xyz.y = v2[k];
                    if (k == 2) p.vertices[1].nxyz.z = p.vertices[1].xyz.z = v2[k];

                    if (k == 0) p.vertices[2].nxyz.x = p.vertices[2].xyz.x = v3[k];
                    if (k == 1) p.vertices[2].nxyz.y = p.vertices[2].xyz.y = v3[k];
                    if (k == 2) p.vertices[2].nxyz.z = p.vertices[2].xyz.z = v3[k];

                }
                head.leyepolygon.push(p);

            } else {

                v1[0] = x1[d][s];
                v1[1] = y1[d][s];
                v1[2] = z1[d];

                v2[0] = x1[d + 1][s];
                v2[1] = y1[d + 1][s];
                v2[2] = z1[d + 1];

                v3[0] = x1[d + 1][s1];
                v3[1] = y1[d + 1][s1];
                v3[2] = z1[d + 1];

                v4[0] = x1[d][s1];
                v4[1] = y1[d][s1];
                v4[2] = z1[d];

                var p = new Polygon();
                for (k = 0; k < 3; k++)
                p.vertices[k] = new Vertex();
                for (k = 0; k < 3; k++) {
                    if (k == 0) p.vertices[0].nxyz.x = p.vertices[0].xyz.x = v1[k];
                    if (k == 1) p.vertices[0].nxyz.y = p.vertices[0].xyz.y = v1[k];
                    if (k == 2) p.vertices[0].nxyz.z = p.vertices[0].xyz.z = v1[k];

                    if (k == 0) p.vertices[1].nxyz.x = p.vertices[1].xyz.x = v2[k];
                    if (k == 1) p.vertices[1].nxyz.y = p.vertices[1].xyz.y = v2[k];
                    if (k == 2) p.vertices[1].nxyz.z = p.vertices[1].xyz.z = v2[k];

                    if (k == 0) p.vertices[2].nxyz.x = p.vertices[2].xyz.x = v3[k];
                    if (k == 1) p.vertices[2].nxyz.y = p.vertices[2].xyz.y = v3[k];
                    if (k == 2) p.vertices[2].nxyz.z = p.vertices[2].xyz.z = v3[k];
                }
                head.leyepolygon.push(p);

                var p = new Polygon();
                for (k = 0; k < 3; k++)
                p.vertices[k] = new Vertex();
                for (k = 0; k < 3; k++) {
                    if (k == 0) p.vertices[0].nxyz.x = p.vertices[0].xyz.x = v1[k];
                    if (k == 1) p.vertices[0].nxyz.y = p.vertices[0].xyz.y = v1[k];
                    if (k == 2) p.vertices[0].nxyz.z = p.vertices[0].xyz.z = v1[k];

                    if (k == 0) p.vertices[1].nxyz.x = p.vertices[1].xyz.x = v3[k];
                    if (k == 1) p.vertices[1].nxyz.y = p.vertices[1].xyz.y = v3[k];
                    if (k == 2) p.vertices[1].nxyz.z = p.vertices[1].xyz.z = v3[k];

                    if (k == 0) p.vertices[2].nxyz.x = p.vertices[2].xyz.x = v4[k];
                    if (k == 1) p.vertices[2].nxyz.y = p.vertices[2].xyz.y = v4[k];
                    if (k == 2) p.vertices[2].nxyz.z = p.vertices[2].xyz.z = v4[k];
                }
                head.leyepolygon.push(p);
            }
        }
        height += heightinc;
        z = radstore * Math.sin(height * 0.017453292);
    }
}