import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const {
      name,
      street,
      number,
      complement,
      state,
      city,
      postalCode,
    } = await Recipient.create(req.body);

    return res.json({
      name,
      street,
      number,
      complement,
      state,
      city,
      postalCode,
    });
  }

  async update(req, res) {
    const recipient = await Recipient.findByPk(req.params.id);
    return res.json(recipient);
  }
}

export default new RecipientController();
