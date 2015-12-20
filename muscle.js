function make_muscles() {
    var nMuscles = muscleDat.length / 11;
    for (var i = 0; i < nMuscles; i++) {
        var m = new Muscle(muscleDat[i * 11], muscleDat[i * 11 + 1], muscleDat[i * 11 + 2], muscleDat[i * 11 + 3], muscleDat[i * 11 + 4], muscleDat[i * 11 + 5], muscleDat[i * 11 + 6], muscleDat[i * 11 + 7], muscleDat[i * 11 + 8], muscleDat[i * 11 + 9], muscleDat[i * 11 + 10]);
        head.muscles.push(m);
    }
}

function VecLen(v) {
    return Math.sqrt((v.x * v.x) + ((v.y * v.y) + (v.z * v.z)));
}

function CosAng(v1, v2) {
    var ang, a, b;
    a = VecLen(v1);
    b = VecLen(v2);
    ang = ((v1.x * v2.x) + (v1.y * v2.y) + (v1.z * v2.z)) / (a * b);

    return ang;
}

function activate_muscle(vt, vh, fstart, fin, ang, val) {
    var newp = new THREE.Vector3(),
        va = new THREE.Vector3(),
        vb = new THREE.Vector3();
    var i, j, k, l;
    var valen, vblen;
    var cosa, cosv, dif, tot, percent, thet, newv, the, radf;

    radf = 180.0 / Math.PI;
    the = ang / radf;
    thet = Math.cos(the);
    cosa = 0;

    va.subVectors(vt, vh);
    valen = VecLen(va);

    for (i = 0; i < head.polygons.length; i++) {
        for (j = 0; j < head.polygons[i].vertices.length; j++) {
            vb.subVectors(head.polygons[i].vertices[j].xyz, vh);

            vblen = VecLen(vb);

            if (valen > 0.0 && vblen > 0.0) {
                cosa = CosAng(va, vb);

                if (cosa >= thet) {
                    if (vblen <= fin) {
                        cosv = val * (1.0 - (cosa / thet));

                        if (vblen >= fstart && vblen <= fin) {
                            dif = vblen - fstart;
                            tot = fin - fstart;
                            percent = dif / tot;
                            newv = Math.cos((percent * 90.0) * 0.017453292);

                            newp.x = (vb.x * cosv) * newv;
                            newp.y = (vb.y * cosv) * newv;
                            newp.z = (vb.z * cosv) * newv;

                        } else {
                            newp.x = vb.x * cosv;
                            newp.y = vb.y * cosv;
                            newp.z = vb.z * cosv;
                        }
                        head.polygons[i].vertices[j].xyz.x += newp.x;
                        head.polygons[i].vertices[j].xyz.y += newp.y;
                        head.polygons[i].vertices[j].xyz.z += newp.z;
                    }
                }
            }
        }
    }
}

function myCylinder(head, tail) {
    var h = head.distanceTo(tail);
    var geometry = new THREE.CylinderGeometry(.05, .05, h, 32);
    var material = new THREE.MeshLambertMaterial({
        color: 0xff0000
    });
    var group = new THREE.Object3D();
    var mesh = new THREE.Mesh(geometry, material);
    group.add(mesh);
    mesh.position.set(0, h / 2, 0); // move cylinder to +y, starting from (0,0,0)

    // rotate to the due orientation
    var v = tail.clone(); // v = tail
    v.sub(head).normalize(); // v = norm (tail - head)

    var angle = Math.acos(v.dot(new THREE.Vector3(0, 1, 0)));
    var axis = new THREE.Vector3();
    axis.crossVectors(new THREE.Vector3(0, 1, 0), v).normalize();
    group.rotateOnAxis(axis, angle);

    // translation to head
    group.position.copy(head);
    return group;
}