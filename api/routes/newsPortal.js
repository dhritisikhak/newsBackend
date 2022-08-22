const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const upload = multer({ storage: storage });

const newsPortalSchema = require("../models/news");

router.get("/", (req, res, next) => {
  newsPortalSchema
    .find()
    // .select("newsHeadline newsCategory newsContent newsImage newsAuthor newsId")
    .exec()
    .then((doc) => {
      const response = {
        count: doc.length,
        newsPortal: doc,
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// router.post("/create-news", (req, res, next) => {
//   newsPortalSchema.create(req.body, (error, data) => {
//     if (error) {
//       return next(error);
//     } else {
//       console.log(data);
//       res.json(data);
//     }
//   });
// });

router.post("/create-news", (req, res, next) => {
  const newsData = new newsPortalSchema({
    newsId: req.body.newsId,
    newsHeadline: req.body.newsHeadline,
    newsAuthor: req.body.newsAuthor,
    // newsCategory: req.body.newsCategory,
    // newsContent: req.body.newsContent,
    // newsImage: req.file.path,
  });
  newsData
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Created successfully!",
        createdNews: {
          newsId: result.newsId,
          newsHeadline: result.newsHeadline,
          newsAuthor: result.newsAuthor,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// router.post("/", upload.single("newsImage"), (req, res, next) => {
//   console.log(req.file);
//   const newsData = new NewsPortal({
//     newsId: req.body.newsId,
//     newsHeadline: req.body.newsHeadline,
//     newsAuthor: req.body.newsAuthor,
//     newsCategory: req.body.newsCategory,
//     newsContent: req.body.newsContent,
//     newsImage: req.file.path,
//   });
//   newsData
//     .save()
//     .then((result) => {
//       console.log(result);
//       res.status(200).json({
//         message: "Created successfully!",
//         createdNews: {
//           newsId: result.newsId,
//           newsHeadline: result.newsHeadline,
//           newsAuthor: result.newsAuthor,
//           newsCategory: result.newsCategory,
//           newsContent: result.newsContent,
//           newsImage: result.newsImage,
//         },
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ error: err });
//     });
// });

router.get("/:newsID", (req, res, next) => {
  const id = req.params.newsID;
  newsPortalSchema
    .findById(id)
    .exec()
    .then((doc) => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ message: "No valid entry found for the id" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:newsID", (req, res, next) => {
  const id = req.params.newsID;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  newsPortalSchema
    .updateOne(
      { newsId: id },
      { $set: updateOps }
      // { $set: { name: req.body.newName, price: req.body.newPrice } }
      //
    )
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.delete("/:newsID", (req, res, next) => {
  const id = req.params.newsID;
  NewsPortal.remove({ newsId: id })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
