const router = require("express").Router();

const Contacts = require("../../models/Contacts");
const { handleError } = require("../../helpers/handleResponses");

//VALIDATION OF USER INPUTS PREREQUISITES
const Joi = require("joi");

const verify = require("./verify");

// need to be changed
const contactSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email(),
  number: Joi.string(),
  company: Joi.string(),
  contactOwner: Joi.string(),
  assignee: Joi.array(),
  priority: Joi.string(),
  companySize: Joi.number(),
  jobTitle: Joi.string(),
  status: Joi.string().required(),
  expectedRevenue: Joi.number(),
  expectedClosing: Joi.date(),
  probability: Joi.string(),
  lastActivity: Joi.date(),
});

//GET ALL CONTACTS

router.get("/verify", async (req, res) => {
  try {
    const contacts = await Contacts.find().exec();
    res.status(200).send({ status: "200", message: contacts });
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: "500", message: error });
  }
});

router.post("/verify", async (req, res) => {
  try {
    //VALIDATION OF USER INPUTS


    const { error } = await contactSchema.validateAsync(req.body);
    if (error) {
      return handleError(res, 400, error);
    }
      const contact = new Contacts(req.body);
      await contact.save();
      res
        .status(200)
        .send({ status: "200", message: "Contact Created Successfully" });
    return res;
  } catch (err) {
    res.status(200).send({ status: "500", message: err });
  }
});

module.exports = router;

