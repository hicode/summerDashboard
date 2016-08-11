var mongoose = require('mongoose');
var List = mongoose.model('TestName');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

/* GET form list /api/formList */
module.exports.formListGet = function(req, res) {
    List
        .find(function(err, rows) {
            if (err) {
                sendJSONresponse(res, 404, err);
            } else {
                sendJSONresponse(res, 201, rows);
            }
        });
};

/* POST /api/formList */
module.exports.formPost = function(req, res) {
    List.create({
        formType: req.body.formType,
        testName: req.body.testName,
        testDescription: req.body.description
    }, function(err, item) {
        if (err) {
            sendJSONresponse(res, 404, err);
        } else {
            sendJSONresponse(res, 201, item);
        }
    });
};


/* Delete /api/formList/:testid */
module.exports.formDelete = function(req, res) {
    var testid = req.params.testid;
    if (testid) {
        List
            .findByIdAndRemove(testid)
            .exec(
                function(err, testName) {
                    if (err) {
                        sendJSONresponse(res, 404, err);
                        return;
                    }
                    sendJSONresponse(res, 204, null);
                }
            );
    } else {
        sendJSONresponse(res, 404, {
            "message": "No test found with the given id"
        });
    }
};