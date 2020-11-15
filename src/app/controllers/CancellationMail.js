import Mail from '../../lib/Mail';
import {format} from 'date-fns';
import pt from 'date-fns/locale/pt';

class CancelationMail{
    get key(){
        return 'CancelationMail';
    }
    async handle({data}){
        const {appointment} = data;
         
        await Mail.sendMail({
            to: `${appointment.provider.name} <${appointment.provider.email}>`,
            subject: 'agendamento cancelado',
            template: 'cancellation',
            context: {
                provider: appointment.provider.name,
                user: appointment.user.name,
                date: format(
                    appointment.date,
                    "'dia' dd 'de' MMMM', às' H:mm'h'",
                    {locale: pt}
                )
            }
        })
    }
}
export default new CancelationMail();