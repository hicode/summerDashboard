var mongoose = require('mongoose');
var Form = mongoose.model('SightingForm');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

/* Get form rows */
module.exports.getForm = function(req, res) {
    Form
        .find(function(err, rows) {
            if (err) {
                sendJSONresponse(res, 404, err);
            } else {
                sendJSONresponse(res, 201, rows);
            }
        });
};

/* GET form row by id /api/sightingForm/:rowid */
module.exports.getFormDataById = function(req, res) {
    if (req.params && req.params.rowid) {
        Form
            .findById(req.params.rowid)
            .exec(function(err, row) {
                if (!row) {
                    sendJSONresponse(res, 404, {
                        "message": "rowid not found"
                    });
                    return;
                } else if (err) {
                    console.log(err);
                    sendJSONresponse(res, 404, err);
                    return;
                } 
                sendJSONresponse(res, 200, row);
            });
    } else {
        console.log('No rowid specified');
        sendJSONresponse(res, 404, {
            "message": "No rowid in request"
        });
    }
};



/* POST a new row /api/sightingForm */
module.exports.postFormData = function(req, res) {
    Form.create({
        number: req.body.number,
        task: req.body.task,
        checkboxNo: req.body.checkboxNo,
        checkboxYes: req.body.checkboxYes,
        action: req.body.action 
    }, function(err, row) {
        if (err) {
            console.log(err);
            sendJSONresponse(res, 400, err);
        } else {
            console.log(row);
            sendJSONresponse(res, 201, row);
        }
    });
};

/* PUT /api/sightingForm/:rowid */
module.exports.putFormData = function(req, res) {
    if(!req.params.rowid) {
        sendJSONresponse(res, 404, {
            "message": "Not found, rowid is required"
        });
        return;
    }
    Form
        .findById(req.params.rowid)
        .exec(
            function(err, row) {
                if(!row) {
                    sendJSONresponse(res, 404, {
                        "message": "rowid not found"
                    });
                    return;
                } else if (err) {
                    sendJSONresponse(res, 400, err);
                    return;
                }
                row.number = req.body.number;
                row.task = req.body.task;
                row.checkboxNo = req.body.checkboxNo;
                row.checkboxYes = req.body.checkboxYes;
                row.action = req.body.action;
                row.save(function(err, row) {
                    if (err) {
                        sendJSONresponse(res, 404, err);
                    } else {
                        sendJSONresponse(res, 200, row);
                    }
                });
            }
        );
};

/* DELETE /api/sightingForm/:rowid */
module.exports.deleteFormData = function(req, res) {
    var rowid = req.params.rowid;
    if (rowid) {
        Form
            .findByIdAndRemove(rowid)
            .exec( 
                function(err, row) {
                    if (err) {
                        console.log(err);
                        sendJSONresponse(res, 404, err);
                        return;
                    }
                    console.log("Row id" + rowid + "deleted");
                    sendJSONresponse(res, 204, null);
                }
            );
    } else {
        sendJSONresponse(res, 404, {
            "message": "No rowid"
        });
    }
};