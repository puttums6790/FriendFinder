var friendsData = require('../data/friends.js');

module.exports = function (app) {

    app.get('/data/friends', function (req, res) {
        res.json(friendsData);
    });

    app.post('/data/friends', function (req, res) {
        var user = req.body;

        // convert scores to integers
        for (var k = 0; k < user.scores.length; k++) {
            user.scores[k] = parseInt(user.scores[k]);
        }

        // var that will have most compatible friend
        var whichFriend = 0;

        // var that stores smallest total difference, start with 100
        var diff1 = 100;

        // var that stores most current calculated difference
        var diff2 = 0;

        // loop through friends array
        for (var i = 0; i < friendsData.length; i++) {

            // calculate difference in scores and totals in diff2
            for (var j = 0; j < friendsData[i].scores.length; j++) {
                diff2 += Math.abs(friendsData[i].scores[j] - user.scores[j]);
            }

            // compare to find if diff2 is lower than diff1
            if (diff2 < diff1) {

                // if lower, assign diff1 as diff2
                diff1 = diff2;

                // reset diff2
                diff2 = 0;

                // assign friend index
                whichFriend = i;
            }
        }


        // add user to friends array
        friendsData.push(user);

        // send response
        res.send(friendsData[whichFriend]);
    });
};