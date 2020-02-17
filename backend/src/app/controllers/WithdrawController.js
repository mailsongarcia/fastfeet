import { isWithinInterval, startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';

class WithdrawController {
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
    if (delivery.start_date) {
      return res
        .status(400)
        .json({ error: 'This delivery has already withdrawn' });
    }
    const { date } = req.query;
    const parseDate = date;

    const validSchedule = isWithinInterval(new Date(), {
      start: new Date().setHours(8, 0, 0),
      end: new Date().setHours(18, 0, 0),
    });
    console.log(parseDate, validSchedule);
    console.log(parseISO(new Date().setHours(8, 0, 0)));
    if (!validSchedule) {
      return res.status(401).json({
        error: 'Deliveries can only be picked up during business hours!',
      });
    }
    const deliveries = await Delivery.findAll({
      where: {
        deliveryman_id,
        start_date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
    });
    if (deliveries.length >= 5) {
      return res.status(401).json({
        error: 'The deliveryman has already completed his deliveries.!',
      });
    }
    // await delivery.update(req.body);

    return res.json(isWithinInterval);
  }
}

export default new WithdrawController();
