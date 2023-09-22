const orgService = require('../services/organization');

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


const staffSignup = async (req, res)=>{
    try {
          const  {email, password, otpToken, firstName, lastName, phoneNumber} = req.body

          if (!phoneNumber){
            return res.status(400).json({message: "missing phone number"})
          }

          // logic to convert otp to orgId goes here
          const decodedToken = await jwt.verify(otpToken, process.env.JWT_SECRET)
          let orgId =  decodedToken.orgId
         
          // Call the signupUser service function
          const user  = await signupUser({
          email,
          password,
          orgId,
          firstName,
          lastName,
          phoneNumber
      });
    
          const formattedUser = {
          id: user.id,
          email: user.email,
          password_hash: user.password_hash,
          org_id: user.org_id,
          first_name: user.first_name,
          last_name: user.last_name,
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