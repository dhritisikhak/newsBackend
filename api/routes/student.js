let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

// Student Model
let studentSchema = require("../models/student");

// CREATE Student
router.post("/create-student", (req, res, next) => {
  const studentData = new studentSchema({
    name: req.body.name,
    email: req.body.email,
    rollno: req.body.rollno,
  });
  studentData
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Created successfully!",
        createdNews: {
          name: result.name,
          email: result.email,
          rollno: result.rollno,
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
// const newsData = new NewsPortal({
//   newsId: req.body.newsId,
//   newsHeadline: req.body.newsHeadline,
//   newsAuthor: req.body.newsAuthor,
//   newsCategory: req.body.newsCategory,
//   newsContent: req.body.newsContent,
//   newsImage: req.file.path,
// });
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

// READ Students
router.get("/", (req, res) => {
  studentSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// UPDATE student
router
  .route("/update-student/:id")
  // Get Single Student
  .get((req, res) => {
    studentSchema.findById(req.params.id, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    });
  })

  // Update Student Data
  .put((req, res, next) => {
    studentSchema.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      (error, data) => {
        if (error) {
          return next(error);
          console.log(error);
        } else {
          res.json(data);
          console.log("Student updated successfully !");
        }
      }
    );
  });

// Delete Student
router.delete("/delete-student/:id", (req, res, next) => {
  studentSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = router;
