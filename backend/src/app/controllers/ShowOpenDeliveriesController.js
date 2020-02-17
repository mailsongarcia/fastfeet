import Delivery from '../models/Delivery';

class ShowOpenDeliveriesController {
  async index(req, res) {
    const { id } = req.params;
    const { page = 1 } = req.query;
    const deliveries = await Delivery.findAll({
      where: { deliveryman_id: id, end_date: null, canceled_at: null },
      limit: 10,
      offset: (page - 1) * 10,
    });
    return res.json(deliveries);
  }
}

export default new ShowOpenDeliveriesController();
