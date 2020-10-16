import Appointment from '../models/Appointment';
import User from '../models/User';
import {startOfDay, endOfDay, parseISO} from 'date-fns';
import {Op} from 'sequelize';

class ScheduleControoler{
    async index(req,res){
        const checkUserProvider = await User.findOne({
            where: {id: req.user_Id, provider: true}
        });
        if(!checkUserProvider){
            return res.status(401).json({error: 'User is not a provider'})
        }
        const {date} = req.query;
        const parsedDate = parseISO(date);
        const Appointments = await Appointment.findAll({
            where: {
                provider_id:req.user_Id,
                canceled_at:null,
                date:{
                    [Op.between]: [
                        startOfDay(parsedDate),
                        endOfDay(parsedDate),
                    ]
                },
            },
            order: ['date'],
        })
        return res.json(Appointments);
    }
}
export default new ScheduleControoler;