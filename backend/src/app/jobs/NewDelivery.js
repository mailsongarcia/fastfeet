import Mail from '../../lib/Mail';

class NewDelivery {
  get key() {
    return 'NewDelivery';
  }

  async handle({ data }) {
    console.log('teste');
    const { delivery } = data;
    await Mail.sendMail({
      to: `${delivery.Deliveryman.name} <${delivery.Deliveryman.email}>`,
      subject: 'Atribuição de Entrega',
      template: 'newDelivery',
      context: {
        deliveryman: delivery.Deliveryman.name,
        recipient: delivery.Recipient.name,
        delivery_id: delivery.id,
        product: delivery.product,
      },
    });
  }
}
export default new NewDelivery();
