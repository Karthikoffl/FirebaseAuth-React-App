const router = require("express").Router();

const admin = require("firebase-admin");

// google token validation

router.get("/loginvalidate", async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(500).send({ msg: "Invalid Token" });
  }
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodedValue = await admin.auth().verifyIdToken(token);
    if (!decodedValue) {
      return res.status(500).send({ msg: `Un-Authorizes Access` });
    } else {
      return res.status(200).send({ success: true, data: decodedValue });
    }
  } catch (error) {
    return res.status(500).send({ msg: `Error : ${error}` });
  }
});

module.exports = router;
