import dbConnect from '../../../util/mongo';
import Order from '../../../models/Order';

const handler = async (req, res) => {
  const {
    method,
    query: { id },
  } = req;

  await dbConnect();

  if (method === 'GET') {
    try {
      const order = await Order.findById(id);
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  if (method === 'PUT') {
    try {
      const order = await Order.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  if (method === 'DELETE') {
    try {
      await Order.findByIdAndDelete(id);
      res.status(200).json('The product has been deleted.');
    } catch (error) {
      return res.status(500).json(error);
    }
  }
};

export default handler;
