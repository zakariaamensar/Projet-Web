const Group=require('../model/Group');
const User=require('../model/User');

module.exports={
    invite: async(req,res)=>{
        const { groupId } = req.params;
        const userId=req.user.userId;
        try {
            const group = await Group.findById(groupId);

            if(!group){
                res.status(404).json({ message: "Groupe non trouvé." });
            }

            if(group.cretedBy.toString() ){
                
            }

        } catch (error) {
            console.log(error);
        }
    }
}