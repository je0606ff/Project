function change_muscles() {
    if (cm >= 17) cm = 0;
    else cm += 1;
}

function contract_muscles() {
    activate_muscle(head.muscles[cm].head, head.muscles[cm].tail, head.muscles[cm].fs, head.muscles[cm].fe, head.muscles[cm].zone, 0.05);
}

function relax_muscles() {
    activate_muscle(head.muscles[cm].head, head.muscles[cm].tail, head.muscles[cm].fs, head.muscles[cm].fe, head.muscles[cm].zone, -0.05);
}


function face_reset() {
    for (var i = 0; i < face_geometry.vertices.length; i++) {
        face_geometry.vertices[i] = head.vertices[i].nxyz;
        head.vertices[i].nxyz.x = -head.vertices[i].mateVertex.x;
        head.vertices[i].nxyz.y = head.vertices[i].mateVertex.y;
        head.vertices[i].nxyz.z = head.vertices[i].mateVertex.z;
    }

    for (var i = 0; i < head.polygons.length; i++)
    for (var j = 0; j < head.polygons[i].vertices.length; j++)
    head.polygons[i].vertices[j].xyz = head.polygons[i].vertices[j].nxyz;
}

function reset() {
    face_reset()
    cm = 0;
    ce = -1;
    mode = 0;
    gcontrols.Happiness = gcontrols.Anger = gcontrols.Surprise = gcontrols.Sadness = gcontrols.Fear = gcontrols.Disgust = 0.1;
    gcontrols.Weight = 0.05;
}

function muscles_color() {
    for (var i = 0; i < head.muscles.length; i++) {
        if (cm === i) {
            HeadCustom.children[i + 1].children[0].material.color.b = 1;
            HeadCustom.children[i + 1].children[0].material.color.g = 0;
            HeadCustom.children[i + 1].children[0].material.color.r = 0;
            if (HeadClone.children[i + 1] != undefined) {
                HeadClone.children[i + 1].children[0].material.color.b = 1;
                HeadClone.children[i + 1].children[0].material.color.g = 0;
                HeadClone.children[i + 1].children[0].material.color.r = 0;
            }

        } else {
            HeadCustom.children[i + 1].children[0].material.color.b = 0;
            HeadCustom.children[i + 1].children[0].material.color.g = 0;
            HeadCustom.children[i + 1].children[0].material.color.r = 1;
            if (HeadClone.children[i + 1] != undefined) {
                HeadClone.children[i + 1].children[0].material.color.b = 0;
                HeadClone.children[i + 1].children[0].material.color.g = 0;
                HeadClone.children[i + 1].children[0].material.color.r = 1;
            }
        }
    }
}

function change_face_material() {
    if (change) {
        HeadCustom.children[0].material.wireframe = false;
        HeadClone.children[0].material.wireframe = false;
        //lid
        HeadCustom.children[21].children[0].material.wireframe = false;
        HeadCustom.children[21].children[1].material.wireframe = false;
        HeadClone.children[21].children[0].material.wireframe = false;
        HeadClone.children[21].children[1].material.wireframe = false;

        for (var i = 0; i < head.muscles.length; i++) {
            HeadCustom.children[i + 1].visible = false;
            HeadClone.children[i + 1].visible = false;
        }
        //eye
        for (var i = 0; i < 2; i++) {
            HeadCustom.children[i + 19].material.wireframe = false;
            HeadClone.children[i + 19].material.wireframe = false;
        }
    } else {
        HeadCustom.children[0].material.wireframe = true;
        HeadClone.children[0].material.wireframe = true;
        //lid
        HeadCustom.children[21].children[0].material.wireframe = true;
        HeadCustom.children[21].children[1].material.wireframe = true;
        HeadClone.children[21].children[0].material.wireframe = true;
        HeadClone.children[21].children[1].material.wireframe = true;

        for (var i = 0; i < head.muscles.length; i++) {
            HeadCustom.children[i + 1].visible = true;
            HeadClone.children[i + 1].visible = true;
        }
        //eye
        for (var i = 0; i < 2; i++) {
            HeadCustom.children[i + 19].material.wireframe = true;
            HeadClone.children[i + 19].material.wireframe = true;
        }
    }
    change = !change;
}

function show_expression(ce, gcontrols) {
    for (var m = 0, count = 8; m < head.muscles.length; m++)
    activate_muscle(head.muscles[m].head, head.muscles[m].tail, head.muscles[m].fs, head.muscles[m].fe, head.muscles[m].zone, head.expressions[ce].m[2 * m + 1] * 0.1 * gcontrols);
}

/*function change_face_expression() {
    if (ce >= 5) ce = 0;
    else ce += 1;
    face_reset()
    show_expression(ce);
}*/

function change_expression() {
    if (g_tmp_Happiness != gcontrols.Happiness) Happiness();
    if (g_tmp_Anger != gcontrols.Anger) Anger();
    if (g_tmp_Surprise != gcontrols.Surprise) Surprise();
    if (g_tmp_Sadness != gcontrols.Sadness) Sadness();
    if (g_tmp_Fear != gcontrols.Fear) Fear();
    if (g_tmp_Disgust != gcontrols.Disgust) Disgust();
    if (g_tmp_Happiness_To_Anger != gcontrols.Happiness_To_Anger) Happiness_To_Anger();
}

function do_clown_laugh() {
    clown_animation_init();
    clown_laugh_animation = true;
    clown_cry_animation = false;
    clown_cry.pause();
    clown_laugh.load();
    clown_laugh.play();
}

function do_clown_cry() {
    clown_animation_init();
    clown_laugh_animation = false;
    clown_cry_animation = true;
    clown_laugh.pause();
    clown_cry.load();
    clown_cry.play();
}

function do_animation() {
    animation_init();
    do_animate = true;
    bgm.load();
    bgm.play();
}

function stop_animation() {
    do_animate = false;
    HeadCustom.quaternion.setFromEuler(new THREE.Euler(0, 0, 0));
    HeadClone.quaternion.setFromEuler(new THREE.Euler(0, 0, 0));
    bgm.pause();
}

function expression_interpolation(ce, gcontrols) {
    face_reset();
    show_expression(ce, gcontrols);
}

function Happiness() {
    ce = 0;
    gcontrols.Anger = gcontrols.Surprise = gcontrols.Sadness = gcontrols.Fear = gcontrols.Disgust = gcontrols.Happiness_To_Anger = 0.1;
    expression_interpolation(ce, gcontrols.Happiness);
    g_tmp_Happiness = gcontrols.Happiness;
}

function Anger() {
    ce = 1;
    gcontrols.Happiness = gcontrols.Surprise = gcontrols.Sadness = gcontrols.Fear = gcontrols.Disgust = gcontrols.Happiness_To_Anger = 0.1;
    expression_interpolation(ce, gcontrols.Anger);
    g_tmp_Anger = gcontrols.Anger;
}

function Surprise() {
    ce = 2;
    gcontrols.Happiness = gcontrols.Anger = gcontrols.Sadness = gcontrols.Fear = gcontrols.Disgust = gcontrols.Happiness_To_Anger = 0.1;
    expression_interpolation(ce, gcontrols.Surprise);
    g_tmp_Surprise = gcontrols.Surprise;
}

function Sadness() {
    ce = 3;
    gcontrols.Happiness = gcontrols.Surprise = gcontrols.Anger = gcontrols.Fear = gcontrols.Disgust = gcontrols.Happiness_To_Anger = 0.1;
    expression_interpolation(ce, gcontrols.Sadness);
    g_tmp_Sadness = gcontrols.Sadness;
}

function Fear() {
    ce = 4;
    gcontrols.Happiness = gcontrols.Surprise = gcontrols.Sadness = gcontrols.Anger = gcontrols.Disgust = gcontrols.Happiness_To_Anger = 0.1;
    expression_interpolation(ce, gcontrols.Fear);
    g_tmp_Fear = gcontrols.Fear;
}

function Disgust() {
    ce = 5;
    gcontrols.Happiness = gcontrols.Surprise = gcontrols.Sadness = gcontrols.Anger = gcontrols.Fear = gcontrols.Happiness_To_Anger = 0.1;
    expression_interpolation(ce, gcontrols.Disgust);
    g_tmp_Disgust = gcontrols.Disgust;
}

function Happiness_To_Anger() {
    if (gcontrols.Happiness_To_Anger >= 0) ce = 0;
    else ce = 1;
    gcontrols.Happiness = gcontrols.Anger = gcontrols.Surprise = gcontrols.Sadness = gcontrols.Fear = gcontrols.Disgust = 0.1;
    face_reset();
    if (ce === 0) expression_interpolation(ce, gcontrols.Happiness_To_Anger);
    else expression_interpolation(ce, -gcontrols.Happiness_To_Anger);
    g_tmp_Happiness_To_Anger = gcontrols.Happiness_To_Anger;
}

function Change_Weight() { //g_tmp_Weight
    if (g_tmp_Weight != gcontrols.Weight) {
        if (gcontrols.Weight > -.05) {
            //gcontrols.Weight -= 0.005;
            meshDeform(-gcontrols.Weight);
            g_tmp_Weight = gcontrols.Weight;
        }
    } else {
        if (gcontrols.Weight < .01) {
            //gcontrols.Weight += 0.005;
            meshDeform(-gcontrols.Weight);
            g_tmp_Weight = gcontrols.Weight;
        }
    }
}

function blink_the_eyes() {
    close_eyes = false;
    setTimeout(blink, 0);
}

function close_the_eyes() {
    close_eyes = true;
    //left_lid
    HeadCustom.children[21].children[0].rotation.x = (Math.PI / 4);
    HeadClone.children[21].children[0].rotation.x = (Math.PI / 4);
    //right_lid
    HeadCustom.children[21].children[1].rotation.x = (Math.PI / 4);
    HeadClone.children[21].children[1].rotation.x = (Math.PI / 4);
}

function open_the_eyes() {
    close_eyes = false;
}