const formidable = require("formidable");
const Category = require("../../../models/Category");
exports.addCategory = async (req, res) => {
    try {
        let form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
        
        let title = fields['title'].trim();
        let categoryCode = fields['categoryCode'].trim();
        let alreadyExist = await Category.findOne({ categoryCode: categoryCode });
        console.log(alreadyExist, 'here is the ')
        if (alreadyExist) {
          return res.status(400).json({
            result: [],
            success: false,
            message: `${alreadyExist.productCode} is already exists`,
          });
        }
        if(req.user.role == 'Admin'){
           await Category.create({
            categoryCode: categoryCode,
            title: title,
            });
        return res.status(200).json({
        //   result: data,
          success: true,
          message: `${categoryCode} is registered successfully`,
        });
    }
    else{
        return res.status(400).json({
              success: true,
              message: `User doesn't have right to add products`,
            });    }
        });

    } catch (error) {
      console.log(error);
  
      return error;
    }
  };
/*------------------------------*/

exports.editCategory = async (req, res) => {
  try {
    let form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
    
    let title = fields['title'].trim();
    let categoryCode = fields['categoryCode'].trim();
  
      if(req.user.role == 'Admin'){
        let alreadyExist = await Category.findOneAndUpdate(
          {categoryCode:categoryCode},
          {$set:{
            title:title
        }});
    return res.status(200).json({
      result: alreadyExist,
      success: true,
      message: `${categoryCode} is Updated successfully`,
    });
}
else{
    return res.status(400).json({
          success: true,
          message: `User doesn't have right to Update Category`,
        });    }
    });
}
   catch (error) {
    return error;
  }
};

exports.categoryList = async (req, res) => {
  try {

    let form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
   
      let limit = 10; // number of records per page
      let offset = 0;

      let page = fields["page"] == 0 ? 1 : fields["page"] || 1; // page number
      offset = limit * (page - 1);
      let exist_user = await Category.aggregate([  
        { $skip : offset }, 
        { $limit : limit}
      ]);
      return res.status(200).json({
        result: exist_user,
        statusCode: 200,
        success: true,
        message: "Data fetched succesfully",
      });
    });
  } catch (error) {
    return next(error);
  }
}