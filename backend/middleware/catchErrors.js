function catchErrors(error, req, res, next) {
    console.log(error)
    if (error.name === "ValidationError") {
        let errors = {};
  
        Object.keys(error.errors).forEach((key) => {
          errors[key] = error.errors[key].message;
        });
  
        return res.status(400).send({
          success: false,
          errors
        });
    }
    res.json({ success: false, error: "Something went wrong"})
}

module.exports = catchErrors;