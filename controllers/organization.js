const orgService = require('../services/organization');
const signupStaff = require("../services/staff").signupStaff


const createOrUpdateOrg = async (req, res) => {
    try {
        const { organization_name, lunch_price } = req.body;

        //check if orgId is provided (indicating an update) if not (indicate creation)
        const orgId = req.params.orgId; //Assuming if orgId is passed in the url

        if (orgId) {
            //if orgId is provided it is treated as creation
            const updateOrg = await orgService.updateOrganization(orgId, {
                organization_name,
                lunch_price,
            });

            return res.status(200).json({ message: 'Organization created or updated successfully', updateOrg});
        } else {
            //if orgId is not provided it is treated as creation
            const createOrg = await orgService.createOrganization({
                organization_name,
                lunch_price,
            });

            return res.status(201).json({ message: 'Organization created or updated successfully', createOrg});
        }

    } catch (err) {
        console.log('Error creating or updating organization', err)
        return res.status(500).json({ message:'Internal server error' })
    }
};


// controller for signingup of staff
const staffSignup = async (req, res, next)=>{
    try {
          const  {email, password, otpToken, first_name, last_name, phone_number} = req.body

          if (!phone_number){
            return res.status(400).json({message: "missing phone number"})
          }
	  if (!email){
		  return res.status(400).json({message: "missing email"})
          }
	  if (!otpToken){
		  return res.status(400).json({message: "missing otpToken"})}
	  if (!first_name){
		  return res.status(400).json({message: "missing first_name"})
          }if (!last_name){                                  return res.status(400).json({message: "missing last name"})
          }if (!password){
		  return res.status(400).json({message: "missing password"})
	  }

          // get organization id from token
          const decoded = jwt.verify(otpToken, process.env.JWT_SECRET)
	  const orgId = decoded.org_id
         
          // Call the signupStaff service function
          const user  = await signupStaff({
          email,
          password,
          orgId,
          first_name,
          last_name,
          phone_number
      });
    
          const formattedUser = {
          id: user.id,
          email: user.email,
          password_hash: user.password_hash,
          org_id: user.org_id,
          first_name: user.first_name,
          last_name: user.last_name,
	  phone_number: user.phone_number,
          created_at: user.created_at,
          updated_at: user.updated_at,
      };
      
    res.status(201).json({ success: true, user: formattedUser});
  } catch (error) {
    throw error;
  }
}

module.exports = {
    createOrUpdateOrg,
    staffSignup
}
