import DeliveryProblem from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import Queue from '../../lib/Queue';
import CancellationMail from '../jobs/CancellationMail';

class DeliveryProblemController {
  async index(req, res) {
    const problem = await DeliveryProblem.findAll();
    return res.json(problem);
  }

  async show(req, res) {
    const { id } = req.params;

    const problem = await DeliveryProblem.findAll({
      where: { delivery_id: id },
    });

    return res.json(problem);
  }

  async store(req, res) {
    const { id } = req.params;
    const { description } = req.body;

    const deliveryProblem = await DeliveryProblem.create({
      delivery_id: id,
      description,
    });
    return res.json(deliveryProblem);
  }

  async delete(req, res) {
    const { id } = req.params;

    const problem = await DeliveryProblem.findByPk(id);

    if (!problem) {
      return res.status(404).json({
        error: 'Problem not found!',
      });
    }
    await Delivery.update(
      { canceled_at: new Date() },
      { where: { id: problem.delivery_id } }
    );
    const delivery = await Delivery.findOne({
      where: { id: problem.delivery_id },
      attributes: ['product', 'canceled_at'],
      include: [
        { model: Deliveryman, attributes: ['name', 'email'] },
        { model: Recipient, attributes: ['name'] },
      ],
    });
    Queue.add(CancellationMail.key, {
      delivery,
    });
    return res.json(problem);
  }
}

export default new DeliveryProblemController();
