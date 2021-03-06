/**
 * Created by ikonovalov on 11/01/17.
 */
const express = require('express');
const router = express.Router();

/*
    {
        "location":
    }

 */

module.exports = function (cargoService) {

    router.get('/:trackNumber', (req, res) => {
        let trackNumber = req.params.trackNumber;
        cargoService.lookupCurrentLocation(trackNumber, (err, track) => {
            if (!err && track)
                res.send(track);
            else if (!err && !track)
                res.status(404).send(`TrackNumber ${trackNumber} not found`);
            else
                res.status(500).send(err.getMessage());
        });

    });

    router.post('/:trackNumber', (req, res) => {
        let trackNumber = req.params.trackNumber;

    });

    router.put('/:trackNumber', (req, res) => {
        let currentLocation = req.params.trackNumber;
        let newPosition = req.body;
        cargoService.updateTrack(currentLocation, newPosition, (err, newDoc) => {
            if (!err) {
                res.status(202).send(
                    {
                        id: currentLocation,
                        updated: newDoc
                    })
            } else {
                res.status(500).send(err.getMessage())
            }
        });
    });

    return router
};




