import Delivery from '../models/Delivery';
import File from '../models/File';
import Deliveryman from '../models/Deliveryman';

class FinishDeliveryController {
  async update(req, res) {
    const { delivery_id, deliveryman_id } = req.params;
    const delivery = await Delivery.findByPk(delivery_id, {
      attributes: [
        'id',
        'recipient_id',
        'start_date',
        'canceled_at',
        'end_date',
        'product',
        'deliveryman_id',
      ],
    });
    const DeliverymanExist = await Deliveryman.findOne({
      where: {
        id: deliveryman_id,
      },
    });
    if (!DeliverymanExist) {
      return res.status(400).json({ error: 'Deliveryman not foud!' });
    }
    const DeliveryExist = await Delivery.findOne({
      where: {
        id: delivery_id,
      },
    });
    if (!DeliveryExist) {
      return res.status(400).json({ error: 'Delivery not foud!' });
    }
    if (deliveryman_id != delivery.deliveryman_id) {
      return res.status(403).json({
        error: 'This delivery is assigned to another deliveryman.',
      });
    }
    if (delivery.canceled_at) {
      return res
        .status(400)
        .json({ error: 'This delivery has been canceled!' });
    }
    if (delivery.end_date) {
      return res
        .status(400)
        .json({ error: 'This delivery has already been delivered!' });
    }
    if (!delivery.start_date) {
      return res.status(400).json({ error: 'Delivery not picked up!' });
    }
    const { originalname: name, filename: path } = req.file;
    const file = await File.create({ name, path });

    await Delivery.update(
      { signature_id: file.id, end_date: new Date() },
      { where: { id: delivery_id } }
    );

    return res.send();
  }
}

export default new FinishDeliveryController();
