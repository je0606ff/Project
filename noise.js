function bulgeAmount(vertex) {
    //16.236 => MaxY - MinY
    var b;
    b = vertex.y > 0 ? 16.236 / 2 : -16.236 / 2;
    return Math.sin(Math.abs(vertex.y - b) / (16.236 / 2) * Math.PI / 2);
}

function meshDeform(mode) {
    var tmp = new THREE.Vector3();
    var scale;
    var va, vb, vc;
    var i;

    face_reset();
    customgeom.geometry.verticesNeedUpdate = true;
    for (i = 0; i < customgeom.geometry.faces.length; i++) {
        // move three vertices of this face along its (vertex) normal direction, 
        var face = customgeom.geometry.faces[i];
        var vertexNormals = face.vertexNormals;

        va = customgeom.geometry.vertices[face.a];
        scale = bulgeAmount(va);
        tmp.copy(vertexNormals[0]).normalize();
        tmp.multiplyScalar(mode * scale);
        va.add(tmp);

        vb = customgeom.geometry.vertices[face.b];
        scale = bulgeAmount(vb);
        tmp.copy(vertexNormals[1]).normalize();
        tmp.multiplyScalar(mode * scale);
        vb.add(tmp);

        vc = customgeom.geometry.vertices[face.c];
        scale = bulgeAmount(vc);
        tmp.copy(vertexNormals[2]).normalize();
        tmp.multiplyScalar(mode * scale);
        vc.add(tmp);
    }

    customgeom.geometry.computeFaceNormals();
    customgeom.geometry.computeVertexNormals();
}