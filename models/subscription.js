import mongoose from "mongoose";
const SubscriptionSchema = mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User'
    },
    serviceName: {
      type: String
    },
    serviceLink: {
      type: String
    },
    monthlyFee: {
      type: Number
    },
    startDate: {
      type: Date
    },
  },
  {
    timestamps: { createdAt: "created", updatedAt: "modified", deletedAt: "deleted" },
  }
);

const Subscription = mongoose.model("Subscription", SubscriptionSchema);
export default mongoose.models.Subscription || Subscription;
