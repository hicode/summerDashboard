require('../models/sightingForms');
require('../models/testNames');
var express = require('express');
var router = express.Router();
var ctrlLocations = require('../controllers/locations');
var ctrlReviews = require('../controllers/reviews');
var ctrlForms     = require('../controllers/sightingForms');
var ctrlFormList  = require('../controllers/testNames');

/* Locations Routes */
router.get('/locations', ctrlLocations.locationsListByDistance);
router.post('/locations', ctrlLocations.locationsCreate);
router.get('/locations/:locationid', ctrlLocations.locationsReadOne);
router.put('/locations/:locationid', ctrlLocations.locationsUpdateOne);
router.delete('/locations/:locationid', ctrlLocations.locationsDeleteOne);

/* Reviews Routes */
router.post('/locations/:locationid/reviews', ctrlReviews.reviewsCreate);
router.get('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsReadOne);
router.put('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsUpdateOne);
router.delete('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsDeleteOne);

/* Form Data */
router.get('/sightingForm', ctrlForms.getForm);
router.get('/sightingForm/:rowid', ctrlForms.getFormDataById);
router.post('/sightingForm', ctrlForms.postFormData);
router.delete('/sightingForm/:rowid', ctrlForms.deleteFormData);
router.put('/sightingForm/:rowid', ctrlForms.putFormData);

/* Forms List */
router.get('/testName', ctrlFormList.formListGet);
router.post('/testName', ctrlFormList.formPost);
router.delete('/testName/:testid', ctrlFormList.formDelete);



module.exports = router;
