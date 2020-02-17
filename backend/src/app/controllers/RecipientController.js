import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const recipients = await Recipient.findAll();
    return res.json(recipients);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      postalCode: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }
    const recipientExist = await Recipient.findOne({
      where: {
        name: req.body.name,
      },
    });
    if (recipientExist) {
      return res.status(400).json({
        error: 'Recipient already exists!',
      });
    }
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
    const schema = Yup.object().shape({
      name: Yup.string(),
      street: Yup.string(),
      number: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
      postalCode: Yup.string(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }
    const { name } = req.body;
    const recipient = await Recipient.findByPk(req.params.id);

    if (!recipient) {
      return res.status(404).json({
        error: 'Recipient not found!',
      });
    }
    if (name !== recipient.name) {
      const recipientExist = await Recipient.findOne({
        where: {
          name,
        },
      });
      if (recipientExist) {
        return res.status(400).json({ error: 'User already exists' });
      }
    }
    recipient.update(req.body);
    return res.json(recipient);
  }

  async delete(req, res) {
    const recipient = await Recipient.findByPk(req.params.id);
    if (!recipient) {
      return res.status(404).json({
        error: 'Recipient not found!',
      });
    }
    recipient.destroy();

    return res.json({
      message: 'Deleted recipient!',
    });
  }
}

export default new RecipientController();
