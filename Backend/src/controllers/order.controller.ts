import { Request, Response } from "express";
import Order from "../models/order.model";
import { sendOrderConfirmation } from "../services/email.service";
import { createRazorpayOrder } from "../services/payment.service";

export default class OrderController {
  static async createOrder(req: Request, res: Response) {
    try {
      console.log("🔥 HIT createOrder API");
      const { customer, products, paymentMethod, paymentMode } = req.body;

      // Validate required fields
      if (!customer?.email || !products?.length || !paymentMethod) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // If Razorpay is used, validate payment mode
      // if (
      //   paymentMethod !== "cod" &&
      //   !["upi", "netbanking", "card", "wallet"].includes(paymentMode)
      // ) {
      //   console.log("DEBUG: Invalid payment mode check triggered");
      //   console.log("DEBUG: paymentMethod =", paymentMethod);
      //   console.log("DEBUG: paymentMode =", paymentMode);
      //   console.log("DEBUG: Allowed modes =", [
      //     "upi",
      //     "netbanking",
      //     "card",
      //     "wallet",
      //   ]);
      //   console.log(
      //     "DEBUG: Mode matches? =",
      //     ["upi", "netbanking", "card", "wallet"].includes(paymentMode)
      //   );
      //   return res.status(400).json({ error: "Invalid payment mode" });
      // }
      
      // --- ADD THIS LOG HERE ---
    console.log("DEBUG BACKEND:", {
      receivedMode: `"${paymentMode}"`, // The quotes help see hidden spaces
      receivedMethod: `"${paymentMethod}"`,
      checkResult: ["razorpay", "upi", "netbanking", "card", "wallet"].includes(paymentMode)
    });

      if (paymentMethod === "cod") {
  // skip validation completely
} else if (
  !paymentMode ||
  !["razorpay", "upi", "netbanking", "card", "wallet"].includes(paymentMode)
) {
  return res.status(400).json({ error: "Invalid payment mode" });
}

      // Calculate totals
      // const subtotal = products.reduce(
      //   (sum: number, item: any) => sum + item.price * item.quantity,
      //   0
      // );
      // const shipping = 0;
      // const tax = 0;
      // const total = subtotal + shipping + tax;

      // --- Find this block in order.controller.ts ---

// Calculate totals
const subtotal = products.reduce(
  (sum: number, item: any) => sum + item.price * item.quantity,
  0
);

// 1. Force shipping to 0
const shipping = 0; 

// 2. Force tax to 0 (This removes that extra 20% / 0.20)
const tax = 0; 

// 3. The total is now exactly the subtotal
const total = subtotal + shipping + tax; 

// --- The rest of the code stays the same ---

      // Create order
      const order = await Order.create({
        customer: {
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          address: customer.address,
        },
        products: products.map((p: any) => ({
          productId: p.id || p.productId,
          name: p.name,
          price: p.price,
          quantity: p.quantity,
          imageUrl: p.imageUrl,
        })),
        subtotal,
        shipping,
        tax,
        total,
        payment: {
          method: paymentMethod,
          mode: paymentMethod === "cod" ? undefined : paymentMode,
        },
        status: paymentMethod === "cod" ? "processing" : "payment_pending",
        orderId: `ORD-${Date.now()}`,
      });

      // COD orders → send email immediately
      if (paymentMethod === "cod" && order.customer?.email) {
        await sendOrderConfirmation(order.customer.email, {
          id: order.orderId,
          items: order.products.map((p: any) => ({
            name: p.name,
            price: p.price,
            quantity: p.quantity,
            imageUrl: p.imageUrl,
          })),
          estimatedDelivery: new Date(
            Date.now() + 5 * 24 * 60 * 60 * 1000
          ).toLocaleDateString(),
        });

        return res.status(201).json({
          success: true,
          orderId: order.orderId,
        });
      }

      // Razorpay orders → create payment order
      const razorpayOrder = await createRazorpayOrder(total);

      if (!razorpayOrder?.id) {
        throw new Error("Razorpay order creation failed");
      }

      return res.status(201).json({
        success: true,
        orderId: order.orderId,
        razorpayOrderId: razorpayOrder.id,
        amount: total,
      });
    } catch (error) {
      console.error("Order creation error:", error);
      res.status(400).json({
        error: error instanceof Error ? error.message : "Order creation failed",
      });
    }
  }
}
