import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    customer: {
      type: String,
      required: true,
      maxlength: 60,
    },
    address: {
      type: String,
      required: true,
      maxlength: 200,
    },
    products: {
      type: Array,
      required: true,
      maxlength: 200,
    },
    total: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      maxlength: 200,
    },
    status: {
      type: Number,
      default: 0,
    },
    method: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
