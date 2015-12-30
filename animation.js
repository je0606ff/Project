function randomBlink() {
    var toss = Math.random();
    if (toss > 0.5) blink();
}

function randomBlink_clone() {
    var toss = Math.random();
    if (toss > 0.5) blink_clone();
}

function blink() {
    angle += sign * 0.11;
    if (angle > 0.75) sign *= -1;

    if (angle < 0) {
        sign = 1;
    } else {
        setTimeout(blink, 10);
    }
}

function blink_clone() {
    angle_clone += sign_clone * 0.11;
    if (angle_clone > 0.75) sign_clone *= -1;

    if (angle_clone < 0) {
        sign_clone = 1;
    } else {
        setTimeout(blink_clone, 10);
    }
}

function animation_init() {

    //HeadCustom
    var euler0 = new THREE.Euler(0, 0, 0); // start
    var euler1 = new THREE.Euler(.3, 0, 0); // beat 1
    var euler2 = new THREE.Euler(0.0, 0, 0); // beat 2
    var euler25 = new THREE.Euler(0.0, -1.57, 0);
    var euler3 = new THREE.Euler(.3, -1.57, 0, 'YXZ'); // beat 3
    var euler4 = new THREE.Euler(0.0, -1.57, 0); // beat 4
    var euler45 = new THREE.Euler(0.0, 0, 0);
    var euler5 = new THREE.Euler(.3, 0, 0); // beat 5
    var euler6 = new THREE.Euler(0.0, 0, 0); // beat 6
    var euler65 = new THREE.Euler(0.0, 1.57, 0);
    var euler7 = new THREE.Euler(.3, 1.57, 0, 'YXZ'); // beat 7
    var euler8 = new THREE.Euler(0.0, 1.57, 0); // beat 8

    // set keys & quats
    //head_keys.push(0, 0.05, 1.05, 1.5, 2.05, 3.05, 3.5, 4.05, 5.05, 5.5, 6.05, 7.05);  // normalized time, in beats
    head_keys.push(0, 0.05, 1.05, 2.05, 3.05, 3.5, 4.05, 5.05, 6.05, 7.05, 7.5, 8.05, 9.05, 10.05, 11.05, 11.5, 12.05, 13.05, 14.05, 15.05);
    for (var i = 0; i < head_keys.length; i++)
    head_keys[i] *= period / 16;// real time (period per one beat)

    quats.push((new THREE.Quaternion()).setFromEuler(euler0));
    quats.push((new THREE.Quaternion()).setFromEuler(euler1));
    quats.push((new THREE.Quaternion()).setFromEuler(euler2));
    quats.push((new THREE.Quaternion()).setFromEuler(euler1));
    quats.push((new THREE.Quaternion()).setFromEuler(euler2));
    quats.push((new THREE.Quaternion()).setFromEuler(euler25));
    quats.push((new THREE.Quaternion()).setFromEuler(euler3));
    quats.push((new THREE.Quaternion()).setFromEuler(euler4));
    quats.push((new THREE.Quaternion()).setFromEuler(euler3));
    quats.push((new THREE.Quaternion()).setFromEuler(euler4));
    quats.push((new THREE.Quaternion()).setFromEuler(euler45));
    quats.push((new THREE.Quaternion()).setFromEuler(euler5));
    quats.push((new THREE.Quaternion()).setFromEuler(euler6));
    quats.push((new THREE.Quaternion()).setFromEuler(euler5));
    quats.push((new THREE.Quaternion()).setFromEuler(euler6));
    quats.push((new THREE.Quaternion()).setFromEuler(euler65));
    quats.push((new THREE.Quaternion()).setFromEuler(euler7));
    quats.push((new THREE.Quaternion()).setFromEuler(euler8));
    quats.push((new THREE.Quaternion()).setFromEuler(euler7));
    quats.push((new THREE.Quaternion()).setFromEuler(euler8));

    actionStart = clock.getElapsedTime();
}

function headUpdate() {
    var now = clock.getElapsedTime();
    var dt = (now - actionStart) % period;
    var quat = new THREE.Quaternion();

    for (var i = head_keys.length - 1; i >= 0; i--) {
        if (dt > head_keys[i]) break;
    }
    if (i === head_keys.length - 1) {
        var s = (dt - head_keys[i]) / (period / 16 * 0.95);
        THREE.Quaternion.slerp(quats[i], quats[0], quat, s);
    } else {
        var s = (dt - head_keys[i]) / (head_keys[i + 1] - head_keys[i]);
        THREE.Quaternion.slerp(quats[i], quats[i + 1], quat, s);
    }
    HeadCustom.quaternion.copy(quat);
}

function morphing(att) {
    if (HeadCustom.children[0].material.uniforms.tt.value <= 1) {
        HeadCustom.children[0].material.uniforms.tt.value = att;
    } else {
        HeadCustom.children[0].material.uniforms.tt.value = 0;
        att = 0;
    }
}

function facialmorphing() {
    if (att <= 1) {
        att += 0.0025;
        morphing(att);
    } else {
        att = 0;
        if (HeadCustom.children[0].material.uniforms.m_case.value < 5){
            HeadCustom.children[0].material.uniforms.m_case.value += 1;
        } else {
            HeadCustom.children[0].material.uniforms.m_case.value = 0;
        }
    }
}

function lid_morphing(altt) {
    if (HeadCustom.children[21].children[0].material.uniforms.tt.value <= 1) {
        HeadCustom.children[21].children[0].material.uniforms.tt.value = altt;
    } else {
        HeadCustom.children[21].children[0].material.uniforms.tt.value = 0;
        altt = 0;
    }
}

function Lid_morphing() {
    if (altt <= 1) {
        altt += 0.0025;
        lid_morphing(altt);
    } else {
        altt = 0;
        if (HeadCustom.children[21].children[0].material.uniforms.m_case.value < 5){
            HeadCustom.children[21].children[0].material.uniforms.m_case.value += 1;
        } else {
            HeadCustom.children[21].children[0].material.uniforms.m_case.value = 0;
        }
    }
}

function expressionUpdate() {
    if (ag <= 1.5) {
        ag += 0.0075;
        expression_interpolation(ae, ag);
    } else {
        ag = 0;
        if (ae < 5) ae += 1;
        else ae = 0;
        expression_interpolation(ae, ag);
    }
}

function expressionUpdate_clown_laugh_animation () {
    if (ag <= 2) {
        ag += 0.0075 / 2.4;
        expression_interpolation(0, ag);
    } else {
        ag = 0;
        expression_interpolation(0, ag);
        clown_laugh_animation = false;
    }
}

function expressionUpdate_clown_cry_animation () {
    if (ag <= 2) {
        ag += 0.0075 / 2.4;
        expression_interpolation(3, ag);
    } else {
        ag = 0;
        expression_interpolation(3, ag);
        clown_cry_animation = false;
    }
}

function clown_animation_init() {

    //HeadCustom
    var euler0 = new THREE.Euler(.5, 0, 0); // start
    var euler1 = new THREE.Euler(-.1, 0, 0); // beat 1


    //HeadCustom
    head_keys_clown_laugh.push(0, 5);
    for (var i = 0; i < head_keys_clown_laugh.length; i++)
    head_keys_clown_laugh[i] *= 10;// real time (period per one beat)

    quats_clown_laugh.push((new THREE.Quaternion()).setFromEuler(euler0));
    quats_clown_laugh.push((new THREE.Quaternion()).setFromEuler(euler1));
    actionStart = clock.getElapsedTime();
}

function clown_headUpdate() {
    var now = clock.getElapsedTime();
    var dt = (now - actionStart) % 10;
    var quat = new THREE.Quaternion();

    for (var i = head_keys_clown_laugh.length - 1; i >= 0; i--) {
        if (dt > head_keys_clown_laugh[i]) break;
    }
    if (i === head_keys_clown_laugh.length - 1) {
        var s = (dt - head_keys_clown_laugh[i]) / (10 / 1 * 0.95);
        THREE.Quaternion.slerp(quats_clown_laugh[i], quats_clown_laugh[0], quat, s);
    } else {
        var s = (dt - head_keys_clown_laugh[i]) / (head_keys_clown_laugh[i + 1] - head_keys_clown_laugh[i]);
        THREE.Quaternion.slerp(quats_clown_laugh[i], quats_clown_laugh[i + 1], quat, s);
    }
    HeadCustom.quaternion.copy(quat);
}