const router = require("express").Router();

// Unsplash images API
const { createApi } = require("unsplash-js");
const nodeFetch = require("node-fetch");

// Use environment varaible for unsplash access key
const unsplash = createApi({ accessKey: "GE5Rq5870hRS5EFr16CziQlgWpIfXztEwN2Hm1MjRQw", fetch: nodeFetch });


// GET route for getting Unsplash API data
router.get("/unsplash", (req, res) => {
    unsplash.collections.getPhotos({ collectionId: 'Fhlm2PJZdXg' })
    .then(result => {
        if (result.errors) {
            // handle error here
            res.status(500).json({ message: "Unable to retrieve images at this time." });
        } else {
            // handle success here
            res.json(result.response);
        }
    })
});

module.exports = router;