var player1;
var player2;

function init() {
    var p1 = location.search.split('p1=')[1]
    var p2 = location.search.split('p2=')[1]

    player1 = getDetails(getId(p1));
    player2 = getDetails(getId(p2));

    //set battle name
    document.getElementById('battle-name').innerHTML = 'Has ' + player1.name + ' passed ' + player2.name + ' Yet?';

    //set player doots
    document.getElementById('player1-doots').innerHTML = player1.score;
    document.getElementById('player2-doots').innerHTML = player2.score;

    //set player url
    document.getElementById('player1-url').href = 'https://devrant.com/user/' + player1.name;
    document.getElementById('player2-url').href = 'https://devrant.com/user/' + player2.name;
    //set player name
    document.getElementById('player1-name').innerHTML = player1.name;
    document.getElementById('player2-name').innerHTML = player2.name;
    //set player image
    document.getElementById('player1-img').src = 'https://avatars.devrant.com/' + player1.avatar;
    document.getElementById('player2-img').src = 'https://avatars.devrant.com/' + player2.avatar;

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
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://devrant.com/api/get-user-id?username=' + username + '&app=3', false);

    xhr.send();
    if (xhr.status != 200) {
        console.log('unable to fetch userid for ' + username);
    } else {
        let response = JSON.parse(xhr.response);
        return response.user_id;
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
        document.getElementById('error').innerHTML = 'Unable to contact API';
        document.getElementById('ahead').innerHTML = 'UNKOWN';
        document.getElementById('dootStatus').innerHTML = 'Incomplete Data';
        return 0;
    }
}

init();

//lets loop de loop
setInterval(function() {
    init()
}, 60000);