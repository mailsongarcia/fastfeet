import * as Yup from 'yup';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';

class DeliveryController {
  async index(req, res) {
    const delivery = await Delivery.findAll();
    return res.json(delivery);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }
    const { recipient_id, deliveryman_id } = req.body;
    if (!(recipient_id && deliveryman_id)) {
      return res
        .status(400)
        .json({ error: 'Inform the delivery person and the recipient.' });
    }
    const recipientExist = await Recipient.findOne({
      where: {
        id: recipient_id,
      },
    });
    if (!recipientExist) {
      return res.status(400).json({ error: 'Recipient not found!' });
    }
    const DeliverymanExist = await Deliveryman.findOne({
      where: {
        id: deliveryman_id,
      },
    });
    if (!DeliverymanExist) {
      return res.status(400).json({ error: 'Deliveryman not foud!' });
    }
    const { id, product } = await Delivery.create(req.body);

    return res.json({ id, recipient_id, deliveryman_id, product });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number(),
      deliveryman_id: Yup.number(),
      product: Yup.string(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }
    const { recipient_id, deliveryman_id } = req.body;

    const delivery = await Delivery.findByPk(req.params.id);

    if (!delivery) {
      return res.status(404).json({
        error: 'Delivery not found!',
      });
    }
    if (recipient_id && recipient_id !== delivery.recipient_id) {
      const recipientExist = await Recipient.findOne({
        where: {
          id: recipient_id,
        },
      });
      if (!recipientExist) {
        return res.status(400).json({ error: 'Recipient not found!' });
      }
    }
    if (deliveryman_id && deliveryman_id !== delivery.deliveryman_id) {
      const DeliverymanExist = await Deliveryman.findOne({
        where: {
          id: deliveryman_id,
        },
      });
      if (!DeliverymanExist) {
        return res.status(400).json({ error: 'Deliveryman not foud!' });
      }
    }
    const { id, product } = await delivery.update(req.body);

    return res.json({ id, recipient_id, deliveryman_id, product });
  }

  async delete(req, res) {
    const delivery = await Delivery.findByPk(req.params.id);
    if (!delivery) {
      return res.status(404).json({
        error: 'Deliver not found!',
      });
    }
    delivery.destroy();

    return res.json({
      message: 'Deleted deliver!',
    });
  }
}

export default new DeliveryController();
