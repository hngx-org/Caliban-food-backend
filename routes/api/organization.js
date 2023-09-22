const express = require('express');
const router = express.Router();

const orgController = require('../../controllers/organization');
const authenticateToken = require('../../middleware/user');

router.put('/create/:orgId', authenticateToken, orgController.createOrUpdateOrg);

router.post("/staff/signup", async (req, res)=>{
    try {
          const  {email, password, otpToken, firstName, lastName, phoneNumber} = req.body

          // Call the signupUser service function
          const { user, token } = await signupUser({
          email,
          password,
          orgId,
          firstName,
          lastName,
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
      
    res.status(201).json({ success: true, user: formattedUser, token });
  } catch (error) {
    next(error);
  }
});


module.exports = router;
