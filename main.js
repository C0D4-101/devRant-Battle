let player1;
let player2;

function init() {
    let p1 = location.search.split('p1=')[1];
    let p2 = location.search.split('p2=')[1];

    player1 = getDetails(getId(p1));
    player2 = getDetails(getId(p2));

    //set battle name
    document.getElementById('battle-name').innerHTML = 'Has ' + player1.name + ' passed ' + player2.name + ' Yet?';

    generateUserContent(player1, 1);
    generateUserContent(player2, 2);

    if (player1.score > player2.score) {
        document.getElementById('ahead').innerHTML = 'YES';
        document.getElementById('dootStatus').innerHTML = 'Ahead by ' + (player1.score - player2.score) + ' doots';
    } else {
        document.getElementById('ahead').innerHTML = 'NO';
        document.getElementById('dootStatus').innerHTML = 'Behind by ' + (player2.score - player1.score) + ' doots';
    }
}

function getId(username) {
    let error = false;
    let undefinedId = 63506;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://devrant.com/api/get-user-id?username=' + username + '&app=3', false);

    xhr.send();
    if (xhr.status != 200) {
        return undefinedId;
    } else {
        let response = JSON.parse(xhr.response);
        if (response.success)
            return response.user_id;

        return undefinedId;
    }
}

function getDetails(user) {
    let error = false;
    let details = [];
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://devrant.com/api/users/' + user + '?app=3', false);
    try {
        xhr.send();
        if (xhr.status != 200) {
            error = true;
        } else {
            let response = JSON.parse(xhr.response);
            details['score'] = response.profile.score;
            details['avatar'] = response.profile.avatar_sm.i;
            details['name'] = response.profile.username;
            return details;
        }
    } catch (err) { // instead of onerror
        error = true;
    };

    if (error) {
        details['score'] = 0;
        details['avatar'] = 'v-35_c-3_b-2_g-m_9-1_1-3_16-1_3-1_8-1_7-1_5-1_12-3_6-9_2-1_22-1_4-1.jpg';
        details['name'] = 'Undefined';
        return details;
    }
}

function generateUserContent(userDetails, user) {
    //set player doots
    document.getElementById('player' + user + '-doots').innerHTML = userDetails.score;
    //set player url
    document.getElementById('player' + user + '-url').href = 'https://devrant.com/users/' + userDetails.name;
    //set player name
    document.getElementById('player' + user + '-name').innerHTML = userDetails.name;
    //set player image
    document.getElementById('player' + user + '-img').src = 'https://avatars.devrant.com/' + userDetails.avatar;
}

init();

//lets loop de loop
setInterval(function() {
    init()
}, 60000);