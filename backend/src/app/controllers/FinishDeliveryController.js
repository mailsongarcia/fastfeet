import Delivery from '../models/Delivery';
import File from '../models/File';

class FinishDeliveryController {
  async update(req, res) {
    const { delivery_id } = req.params;
    const { originalname: name, filename: path } = req.file;
    const file = await File.create({ name, path });

    await Delivery.update(
      { signature_id: file.id, end_date: new Date() },
      { where: { id: delivery_id } }
    );

    return res.json(file.id);
  }
}

export default new FinishDeliveryController();
