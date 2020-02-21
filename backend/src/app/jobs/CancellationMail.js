import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { delivery } = data;
    await Mail.sendMail({
      to: `${delivery.Deliveryman.name} <${delivery.Deliveryman.email}>`,
      subject: 'Cancelelamento de Entrega',
      template: 'cancellation',
      context: {
        deliveryman: delivery.Deliveryman.name,
        recipient: delivery.Recipient.name,
        product: delivery.product,
        canceled_at: format(
          parseISO(delivery.canceled_at),
          "'Dia' dd 'de' MMM', às' H:mm'h'.",
          { locale: pt }
        ),
      },
    });
  }
}
export default new CancellationMail();
