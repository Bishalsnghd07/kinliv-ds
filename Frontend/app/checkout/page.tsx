// // "use client";

// // import { useCart } from "@/context/CartContext";
// // import { useState, useEffect } from "react";
// // import { Button } from "@/components/ui/button";
// // import Image from "next/image";
// // import { ShoppingCart, Banknote } from "lucide-react";
// // import { API_BASE_URL, createOrder } from "@/lib/api";
// // import { useRouter } from "next/navigation";
// // import { Input } from "@/components/ui/input";
// // import { CheckoutFormValues, checkoutSchema } from "../validations/schema";
// // import { useForm } from "react-hook-form";
// // import { zodResolver } from "@hookform/resolvers/zod";
// // import Swal from "sweetalert2";
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogHeader,
// //   DialogTitle,
// //   DialogDescription,
// // } from "@/components/ui/dialog";

// // export default function CheckoutPage() {
// //   const { cartItems, cartTotal, clearCart } = useCart();
// //   const [showOTPModal, setShowOTPModal] = useState(false);
// //   const [otpCode, setOtpCode] = useState("");
// //   const [isSendingOTP, setIsSendingOTP] = useState(false);
// //   const [isVerifyingOTP, setIsVerifyingOTP] = useState(false);
// //   const [tempOrderData, setTempOrderData] = useState<any>(null);
// //   const [resendCooldown, setResendCooldown] = useState(0);
// //   const router = useRouter();
// //   const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL!;
// //   const MSG91_AUTH_KEY = process.env.NEXT_PUBLIC_MSG91_AUTH_KEY!;
// //   const MSG91_WIDGET_ID = process.env.NEXT_PUBLIC_MSG91_WIDGET_ID!;

// //   // Resend cooldown timer
// //   useEffect(() => {
// //     if (resendCooldown > 0) {
// //       const timer = setTimeout(() => setResendCooldown(prev => prev - 1), 1000);
// //       return () => clearTimeout(timer);
// //     }
// //   }, [resendCooldown]);

// //   const {
// //     register,
// //     handleSubmit,
// //     watch,
// //     setValue,
// //     formState: { errors },
// //   } = useForm<CheckoutFormValues>({
// //     resolver: zodResolver(checkoutSchema),
// //     defaultValues: {
// //       paymentMethod: "online",
// //       paymentMode: "razorpay",
// //     },
// //   });

// //   const selectedPayment = watch("paymentMethod");
// //   const shippingFee = 0;
// //   const grandTotal = cartTotal + shippingFee;

// //   const loadRazorpayScript = () => {
// //     return new Promise((resolve) => {
// //       if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
// //         return resolve(true);
// //       }
// //       const script = document.createElement("script");
// //       script.src = "https://checkout.razorpay.com/v1/checkout.js";
// //       script.onload = () => resolve(true);
// //       script.onerror = () => resolve(false);
// //       document.body.appendChild(script);
// //     });
// //   };

// //   // // Helper function to send OTP via MSG91 REST API
// //   // const sendOTP = async (phone: string): Promise<string> => {
// //   //   const cleanPhone = phone.replace(/\D/g, "");
// //   //   if (cleanPhone.length !== 10) {
// //   //     throw new Error("Phone number must be 10 digits");
// //   //   }
// //   //   const mobileWithCountryCode = `91${cleanPhone}`;
// //   //   const url = `https://api.msg91.com/api/v5/otp?authkey=${MSG91_AUTH_KEY}&mobile=${mobileWithCountryCode}&widget_id=${MSG91_WIDGET_ID}`;
    
// //   //   const response = await fetch(url, { method: "POST" });
// //   //   const data = await response.json();
    
// //   //   if (!response.ok || data.type === "error") {
// //   //     throw new Error(data.message || "Failed to send OTP");
// //   //   }
// //   //   return data.message; // This is the requestId
// //   // };

// //   // // Helper function to verify OTP via MSG91 REST API
// //   // const verifyOTP = async (phone: string, otp: string): Promise<boolean> => {
// //   //   const cleanPhone = phone.replace(/\D/g, "");
// //   //   const mobileWithCountryCode = `91${cleanPhone}`;
// //   //   const url = `https://api.msg91.com/api/v5/otp/verify?authkey=${MSG91_AUTH_KEY}&mobile=${mobileWithCountryCode}&otp=${otp}`;
    
// //   //   const response = await fetch(url, { method: "POST" });
// //   //   const data = await response.json();
    
// //   //   return response.ok && data.type === "success";
// //   // };

// //   // Helper functions (replace the old sendOTP/verifyOTP)
// // const sendOTP = async (phone: string): Promise<void> => {
// //   const res = await fetch(`${API_BASE_URL}/api/orders/send-otp`, {
// //     method: 'POST',
// //     headers: { 'Content-Type': 'application/json' },
// //     body: JSON.stringify({ phone }),
// //   });
// //   const data = await res.json();
// //   if (!res.ok) throw new Error(data.error || 'Failed to send OTP');
// // };

// // const verifyOTP = async (phone: string, otp: string): Promise<boolean> => {
// //   const res = await fetch(`${API_BASE_URL}/api/orders/verify-otp`, {
// //     method: 'POST',
// //     headers: { 'Content-Type': 'application/json' },
// //     body: JSON.stringify({ phone, otp }),
// //   });
// //   const data = await res.json();
// //   if (!res.ok) throw new Error(data.error || 'Invalid OTP');
// //   return data.success;
// // };

// //   const onSubmit = async (formData: CheckoutFormValues) => {
// //     const subtotal = cartTotal;
// //     const shipping = 0;
// //     const tax = 0;
// //     const total = subtotal + shipping + tax;

// //     const orderData = {
// //       customer: { ...formData, address: formData.address },
// //       products: cartItems.map((item) => ({
// //         productId: String(item.id),
// //         name: item.name,
// //         price: item.price,
// //         quantity: item.quantity,
// //         imageUrl: item.image || "",
// //       })),
// //       subtotal,
// //       shipping,
// //       tax,
// //       total,
// //       paymentMethod: formData.paymentMethod,
// //       paymentMode: formData.paymentMethod === "cod" ? "cod" : "razorpay",
// //       orderId: `ORD-${Date.now()}`,
// //     };

// //     // ==================== COD FLOW with OTP ====================
// //     if (formData.paymentMethod === "cod") {
// //       setTempOrderData(orderData);
// //       setIsSendingOTP(true);
// //       try {
// //         await sendOTP(formData.phone);
// //         setShowOTPModal(true);
// //       } catch (err: any) {
// //         Swal.fire("Error", err.message || "Failed to send OTP", "error");
// //       } finally {
// //         setIsSendingOTP(false);
// //       }
// //       return;
// //     }

// //     // ==================== ONLINE (RAZORPAY) FLOW ====================
// //     try {
// //       const response = await createOrder(orderData);

// //       const loaded = await loadRazorpayScript();
// //       if (!loaded) {
// //         Swal.fire("Error", "Razorpay SDK failed to load", "error");
// //         return;
// //       }

// //       const options = {
// //         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
// //         amount: response.amount * 100,
// //         currency: "INR",
// //         name: "Kin Ultrapower",
// //         description: "Order Payment",
// //         order_id: response.razorpayOrderId,
// //         handler: async (razorpayResponse: any) => {
// //           const verifyRes = await fetch(`${API_BASE_URL}/api/orders/verify-payment`, {
// //             method: "POST",
// //             headers: { "Content-Type": "application/json" },
// //             body: JSON.stringify({
// //               orderId: response.orderId,
// //               razorpay_payment_id: razorpayResponse.razorpay_payment_id,
// //               razorpay_order_id: razorpayResponse.razorpay_order_id,
// //               razorpay_signature: razorpayResponse.razorpay_signature,
// //             }),
// //           });

// //           if (verifyRes.ok) {
// //             clearCart();
// //             router.push(`/checkout/success?orderId=${response.orderId}`);
// //           } else {
// //             const err = await verifyRes.json();
// //             Swal.fire("Payment Failed", err.error || "Verification failed", "error");
// //           }
// //         },
// //         prefill: {
// //           name: formData.name,
// //           email: formData.email,
// //           contact: formData.phone,
// //         },
// //         theme: { color: "#D87D4A" },
// //       };

// //       const rzp = new (window as any).Razorpay(options);
// //       rzp.open();
// //     } catch (error: any) {
// //       Swal.fire("Error", error.message || "Order submission failed", "error");
// //     }
// //   };

// //   const handleVerifyOTP = async () => {
// //     if (!tempOrderData) return;
// //     setIsVerifyingOTP(true);
// //     try {
// //       const isValid = await verifyOTP(tempOrderData.customer.phone, otpCode);
// //       if (!isValid) throw new Error("Invalid OTP");

// //       // OTP verified – now create COD order
// //       const orderResponse = await createOrder(tempOrderData);
// //       if (orderResponse.success) {
// //         clearCart();
// //         setShowOTPModal(false);
// //         router.push(`/checkout/success?orderId=${orderResponse.orderId}`);
// //       } else {
// //         throw new Error("Order creation failed");
// //       }
// //     } catch (err: any) {
// //       Swal.fire("Verification Failed", err.message, "error");
// //     } finally {
// //       setIsVerifyingOTP(false);
// //     }
// //   };

// //   const handleResendOTP = async () => {
// //     if (resendCooldown > 0 || !tempOrderData) return;
// //     setResendCooldown(30);
// //     try {
// //       await sendOTP(tempOrderData.customer.phone);
// //       Swal.fire("Resent", "OTP sent again", "success");
// //     } catch (err: any) {
// //       Swal.fire("Error", err.message || "Resend failed", "error");
// //     }
// //   };

// //   return (
// //     <div className="container mx-auto px-4 py-8 max-w-6xl">
// //       <form onSubmit={handleSubmit(onSubmit)}>
// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// //           {/* LEFT COLUMN: FORM */}
// //           <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm border border-gray-100">
// //             <h1 className="text-2xl font-bold mb-8 uppercase tracking-tight">Checkout</h1>

// //             {/* Billing Details */}
// //             <section className="mb-10">
// //               <h2 className="text-sm font-bold text-[#D87D4A] mb-4 tracking-widest uppercase">Billing Details</h2>
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                 <div>
// //                   <label className="block text-xs font-bold mb-2">Name</label>
// //                   <input {...register("name")} className="w-full border rounded p-3 text-sm focus:border-[#D87D4A] outline-none" placeholder="Enter name" />
// //                   {errors.name && <p className="text-[#d60910] text-xs mt-1">{errors.name.message}</p>}
// //                 </div>
// //                 <div>
// //                   <label className="block text-xs font-bold mb-2">Email Address</label>
// //                   <input {...register("email")} className="w-full border rounded p-3 text-sm focus:border-[#D87D4A] outline-none" placeholder="email@example.com" />
// //                   {errors.email && <p className="text-[#d60910] text-xs mt-1">{errors.email.message}</p>}
// //                 </div>
// //                 <div>
// //                   <label className="block text-xs font-bold mb-2">Phone Number</label>
// //                   <input {...register("phone")} className="w-full border rounded p-3 text-sm focus:border-[#D87D4A] outline-none" placeholder="9876543210" />
// //                   {errors.phone && <p className="text-[#d60910] text-xs mt-1">{errors.phone.message}</p>}
// //                 </div>
// //               </div>
// //             </section>

// //             {/* Shipping Info */}
// //             <section className="mb-10">
// //               <h2 className="text-sm font-bold text-[#D87D4A] mb-4 tracking-widest uppercase">Shipping Info</h2>
// //               <div className="grid grid-cols-1 gap-4">
// //                 <div>
// //                   <label className="block text-xs font-bold mb-2">Street Address</label>
// //                   <input {...register("address.street")} className="w-full border rounded p-3 text-sm focus:border-[#D87D4A] outline-none" placeholder="123 Main St" />
// //                   {errors.address?.street && <p className="text-[#d60910] text-xs mt-1">{errors.address.street.message}</p>}
// //                 </div>
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                   <div>
// //                     <label className="block text-xs font-bold mb-2">ZIP Code</label>
// //                     <input {...register("address.zipCode")} className="w-full border rounded p-3 text-sm focus:border-[#D87D4A] outline-none" placeholder="110001" />
// //                   </div>
// //                   <div>
// //                     <label className="block text-xs font-bold mb-2">City</label>
// //                     <input {...register("address.city")} className="w-full border rounded p-3 text-sm focus:border-[#D87D4A] outline-none" placeholder="New Delhi" />
// //                   </div>
// //                   <div>
// //                     <label className="block text-xs font-bold mb-2">State</label>
// //                     <input {...register("address.state")} className="w-full border rounded p-3 text-sm focus:border-[#D87D4A] outline-none" placeholder="Delhi" />
// //                     {errors.address?.state && <p className="text-[#d60910] text-xs mt-1">{errors.address.state.message}</p>}
// //                   </div>
// //                   <div>
// //                     <label className="block text-xs font-bold mb-2">Country</label>
// //                     <input {...register("address.country")} className="w-full border rounded p-3 text-sm focus:border-[#D87D4A] outline-none" placeholder="India" />
// //                     {errors.address?.country && <p className="text-[#d60910] text-xs mt-1">{errors.address.country.message}</p>}
// //                   </div>
// //                 </div>
// //               </div>
// //             </section>

// //             {/* Payment Method Selection */}
// //             <section>
// //               <h2 className="text-sm font-bold text-[#D87D4A] mb-4 tracking-widest uppercase">Payment Method</h2>
// //               <div className="space-y-3">
// //                 {/* Online Payment Card */}
// //                 <div 
// //                   onClick={() => setValue("paymentMethod", "online")}
// //                   className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${
// //                     selectedPayment === "online" ? "border-[#D87D4A] bg-[#fffaf7] shadow-sm" : "border-gray-200"
// //                   }`}
// //                 >
// //                   <div className="flex items-center gap-4">
// //                     <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
// //                       selectedPayment === "online" ? "border-[#D87D4A]" : "border-gray-300"
// //                     }`}>
// //                       {selectedPayment === "online" && <div className="w-2.5 h-2.5 bg-[#D87D4A] rounded-full" />}
// //                     </div>
// //                     <div>
// //                       <p className="text-sm font-bold">Pay Online</p>
// //                       <p className="text-xs text-gray-500">UPI, QR Scan, Cards, Netbanking</p>
// //                     </div>
// //                   </div>
// //                   <div className="flex items-center gap-2">
// //                     <Image src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" alt="Razorpay" width={70} height={20} className="opacity-70" />
// //                   </div>
// //                 </div>

// //                 {/* COD Card */}
// //                 <div 
// //                   onClick={() => setValue("paymentMethod", "cod")}
// //                   className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${
// //                     selectedPayment === "cod" ? "border-[#D87D4A] bg-[#fffaf7] shadow-sm" : "border-gray-200"
// //                   }`}
// //                 >
// //                   <div className="flex items-center gap-4">
// //                     <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
// //                       selectedPayment === "cod" ? "border-[#D87D4A]" : "border-gray-300"
// //                     }`}>
// //                       {selectedPayment === "cod" && <div className="w-2.5 h-2.5 bg-[#D87D4A] rounded-full" />}
// //                     </div>
// //                     <div>
// //                       <p className="text-sm font-bold">Cash on Delivery</p>
// //                       <p className="text-xs text-gray-500">Pay at your doorstep</p>
// //                     </div>
// //                   </div>
// //                   <Banknote className="text-gray-400" size={24} />
// //                 </div>
// //               </div>
// //             </section>
// //           </div>

// //           {/* RIGHT COLUMN: SUMMARY */}
// //           <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 h-fit">
// //             <h2 className="text-lg font-bold mb-6">SUMMARY</h2>
// //             <div className="space-y-4 mb-6">
// //               {cartItems.map((item) => (
// //                 <div key={item.id} className="flex justify-between items-center">
// //                   <div className="flex items-center gap-3">
// //                     <div className="w-12 h-12 relative bg-gray-50 rounded border overflow-hidden">
// //                       {item.image ? (
// //                         <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
// //                       ) : (
// //                         <ShoppingCart className="h-4 w-4 absolute inset-0 m-auto text-gray-300" />
// //                       )}
// //                     </div>
// //                     <div className="text-sm">
// //                       <p className="font-bold">{item.name}</p>
// //                       <p className="text-gray-500">₹{item.price}</p>
// //                     </div>
// //                   </div>
// //                   <p className="text-xs font-bold text-gray-400">x{item.quantity}</p>
// //                 </div>
// //               ))}
// //             </div>

// //             <div className="border-t border-gray-100 pt-4 space-y-2 mb-6">
// //               <div className="flex justify-between text-sm">
// //                 <span className="text-gray-500">TOTAL</span>
// //                 <span className="font-bold">₹{cartTotal.toFixed(2)}</span>
// //               </div>
// //               <div className="flex justify-between text-sm">
// //                 <span className="text-gray-500">SHIPPING</span>
// //                 <span className="font-bold">₹{shippingFee.toFixed(2)}</span>
// //               </div>
// //               <div className="flex justify-between pt-2">
// //                 <span className="text-sm font-bold">GRAND TOTAL</span>
// //                 <span className="font-bold text-[#D87D4A]">₹{grandTotal.toFixed(2)}</span>
// //               </div>
// //             </div>

// //             <Button type="submit" className="w-full bg-[#D87D4A] hover:bg-[#c46d3b] text-white py-6 rounded-lg font-bold uppercase tracking-widest transition-all" disabled={cartItems.length === 0}>
// //               Continue & Pay
// //             </Button>
// //           </div>
// //         </div>
// //       </form>

// //       {/* OTP Modal */}
// //       <Dialog open={showOTPModal} onOpenChange={setShowOTPModal}>
// //         <DialogContent className="sm:max-w-md">
// //           <DialogHeader>
// //             <DialogTitle>Verify Your Phone</DialogTitle>
// //             <DialogDescription>
// //               We've sent a 6-digit OTP to {tempOrderData?.customer?.phone}. Please enter it below.
// //             </DialogDescription>
// //           </DialogHeader>
// //           <div className="space-y-4">
// //             <Input
// //               type="text"
// //               maxLength={6}
// //               placeholder="Enter OTP"
// //               value={otpCode}
// //               onChange={(e) => setOtpCode(e.target.value)}
// //               className="text-center text-2xl tracking-widest"
// //             />
// //             <Button
// //               onClick={handleVerifyOTP}
// //               disabled={isVerifyingOTP || otpCode.length !== 6}
// //               className="w-full bg-[#D87D4A] hover:bg-[#c46d3b]"
// //             >
// //               {isVerifyingOTP ? "Verifying..." : "Confirm & Place Order"}
// //             </Button>
// //             <p className="text-xs text-center text-gray-500">
// //               Didn't receive OTP?{" "}
// //               <button
// //                 onClick={handleResendOTP}
// //                 disabled={resendCooldown > 0}
// //                 className="text-[#D87D4A] hover:underline disabled:opacity-50"
// //               >
// //                 {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend"}
// //               </button>
// //             </p>
// //           </div>
// //         </DialogContent>
// //       </Dialog>
// //     </div>
// //   );
// // }



// "use client";

// import { useCart } from "@/context/CartContext";
// import { useState, useEffect, useRef } from "react";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import { ShoppingCart, Banknote } from "lucide-react";
// import { API_BASE_URL, createOrder } from "@/lib/api";
// import { useRouter } from "next/navigation";
// import { Input } from "@/components/ui/input";
// import { CheckoutFormValues, checkoutSchema } from "../validations/schema";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import Swal from "sweetalert2";

// export default function CheckoutPage() {
//   const { cartItems, cartTotal, clearCart } = useCart();
//   const [isSendingOTP, setIsSendingOTP] = useState(false);
//   const router = useRouter();
//   const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL!;
//   const widgetInitialized = useRef(false);

  
//   // Load MSG91 widget script once
//   useEffect(() => {
//     if (widgetInitialized.current) return;
//     widgetInitialized.current = true;

//     const script = document.createElement('script');
//     script.src = 'https://verify.msg91.com/otp-provider.js';
//     script.async = true;
//     document.head.appendChild(script);
//   }, []);

//   const {
//     register,
//     handleSubmit,
//     watch,
//     setValue,
//     formState: { errors },
//   } = useForm<CheckoutFormValues>({
//     resolver: zodResolver(checkoutSchema),
//     defaultValues: {
//       paymentMethod: "online",
//       paymentMode: "razorpay",
//     },
//   });

//   const selectedPayment = watch("paymentMethod");
//   const shippingFee = 0;
//   const grandTotal = cartTotal + shippingFee;

//   const loadRazorpayScript = () => {
//     return new Promise((resolve) => {
//       if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
//         return resolve(true);
//       }
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   const onSubmit = async (formData: CheckoutFormValues) => {
//     const subtotal = cartTotal;
//     const shipping = 0;
//     const tax = 0;
//     const total = subtotal + shipping + tax;

//     const orderData = {
//       customer: { ...formData, address: formData.address },
//       products: cartItems.map((item) => ({
//         productId: String(item.id),
//         name: item.name,
//         price: item.price,
//         quantity: item.quantity,
//         imageUrl: item.image || "",
//       })),
//       subtotal,
//       shipping,
//       tax,
//       total,
//       paymentMethod: formData.paymentMethod,
//       paymentMode: formData.paymentMethod === "cod" ? "cod" : "razorpay",
//       orderId: `ORD-${Date.now()}`,
//     };

//     // ==================== COD FLOW with MSG91 Widget ====================
//     if (formData.paymentMethod === "cod") {
//       setIsSendingOTP(true);
//       try {
//         // Configure the widget
//         const config = {
//           widgetId: process.env.NEXT_PUBLIC_MSG91_WIDGET_ID!,
//           tokenAuth: process.env.NEXT_PUBLIC_MSG91_TOKEN_AUTH!,
//           identifier: `+91${formData.phone}`,
//           exposeMethods: false,
//       success: async (data: any) => {
//   console.log('Full widget success data:', data); // See what's inside
//   // The JWT token is in data.message (based on your network log)
//   const accessToken = data.message || data.token;
//   if (!accessToken) {
//     throw new Error('No token received from widget');
//   }

//   const verifyRes = await fetch(`${API_BASE_URL}/api/orders/verify-widget-token`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ accessToken }),
//   });
//   const verifyData = await verifyRes.json();
//   if (!verifyRes.ok) throw new Error(verifyData.error || 'Token verification failed');

//   // Create COD order
//   const orderResponse = await createOrder(orderData);
//   if (orderResponse.success) {
//     clearCart();
//     router.push(`/checkout/success?orderId=${orderResponse.orderId}`);
//   } else {
//     throw new Error('Order creation failed');
//   }
// },
//           failure: (error: any) => {
//             console.error('OTP widget error', error);
//             Swal.fire('Verification Failed', error.message || 'Invalid OTP or user cancelled', 'error');
//             setIsSendingOTP(false);
//           },
//         };

//         if (typeof window !== 'undefined' && (window as any).initSendOTP) {
//           (window as any).initSendOTP(config);
//         } else {
//           throw new Error('MSG91 widget not loaded');
//         }
//       } catch (err: any) {
//         Swal.fire('Error', err.message || 'Failed to start OTP verification', 'error');
//         setIsSendingOTP(false);
//       }
//       return;
//     }

//     // ==================== ONLINE (RAZORPAY) FLOW ====================
//     try {
//       const response = await createOrder(orderData);

//       const loaded = await loadRazorpayScript();
//       if (!loaded) {
//         Swal.fire("Error", "Razorpay SDK failed to load", "error");
//         return;
//       }

//       const options = {
//         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
//         amount: response.amount * 100,
//         currency: "INR",
//         name: "Kin Ultrapower",
//         description: "Order Payment",
//         order_id: response.razorpayOrderId,
//         handler: async (razorpayResponse: any) => {
//           const verifyRes = await fetch(`${API_BASE_URL}/api/orders/verify-payment`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               orderId: response.orderId,
//               razorpay_payment_id: razorpayResponse.razorpay_payment_id,
//               razorpay_order_id: razorpayResponse.razorpay_order_id,
//               razorpay_signature: razorpayResponse.razorpay_signature,
//             }),
//           });

//           if (verifyRes.ok) {
//             clearCart();
//             router.push(`/checkout/success?orderId=${response.orderId}`);
//           } else {
//             const err = await verifyRes.json();
//             Swal.fire("Payment Failed", err.error || "Verification failed", "error");
//           }
//         },
//         prefill: {
//           name: formData.name,
//           email: formData.email,
//           contact: formData.phone,
//         },
//         theme: { color: "#D87D4A" },
//       };

//       const rzp = new (window as any).Razorpay(options);
//       rzp.open();
//     } catch (error: any) {
//       Swal.fire("Error", error.message || "Order submission failed", "error");
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8 max-w-6xl">
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* LEFT COLUMN: FORM */}
//           <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm border border-gray-100">
//             <h1 className="text-2xl font-bold mb-8 uppercase tracking-tight">Checkout</h1>

//             {/* Billing Details */}
//             <section className="mb-10">
//               <h2 className="text-sm font-bold text-[#D87D4A] mb-4 tracking-widest uppercase">Billing Details</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-xs font-bold mb-2">Name</label>
//                   <input {...register("name")} className="w-full border rounded p-3 text-sm focus:border-[#D87D4A] outline-none" placeholder="Enter name" />
//                   {errors.name && <p className="text-[#d60910] text-xs mt-1">{errors.name.message}</p>}
//                 </div>
//                 <div>
//                   <label className="block text-xs font-bold mb-2">Email Address</label>
//                   <input {...register("email")} className="w-full border rounded p-3 text-sm focus:border-[#D87D4A] outline-none" placeholder="email@example.com" />
//                   {errors.email && <p className="text-[#d60910] text-xs mt-1">{errors.email.message}</p>}
//                 </div>
//                 <div>
//                   <label className="block text-xs font-bold mb-2">Phone Number</label>
//                   <input {...register("phone")} className="w-full border rounded p-3 text-sm focus:border-[#D87D4A] outline-none" placeholder="9876543210" />
//                   {errors.phone && <p className="text-[#d60910] text-xs mt-1">{errors.phone.message}</p>}
//                 </div>
//               </div>
//             </section>

//             {/* Shipping Info */}
//             <section className="mb-10">
//               <h2 className="text-sm font-bold text-[#D87D4A] mb-4 tracking-widest uppercase">Shipping Info</h2>
//               <div className="grid grid-cols-1 gap-4">
//                 <div>
//                   <label className="block text-xs font-bold mb-2">Street Address</label>
//                   <input {...register("address.street")} className="w-full border rounded p-3 text-sm focus:border-[#D87D4A] outline-none" placeholder="123 Main St" />
//                   {errors.address?.street && <p className="text-[#d60910] text-xs mt-1">{errors.address.street.message}</p>}
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-xs font-bold mb-2">ZIP Code</label>
//                     <input {...register("address.zipCode")} className="w-full border rounded p-3 text-sm focus:border-[#D87D4A] outline-none" placeholder="110001" />
//                   </div>
//                   <div>
//                     <label className="block text-xs font-bold mb-2">City</label>
//                     <input {...register("address.city")} className="w-full border rounded p-3 text-sm focus:border-[#D87D4A] outline-none" placeholder="New Delhi" />
//                   </div>
//                   <div>
//                     <label className="block text-xs font-bold mb-2">State</label>
//                     <input {...register("address.state")} className="w-full border rounded p-3 text-sm focus:border-[#D87D4A] outline-none" placeholder="Delhi" />
//                     {errors.address?.state && <p className="text-[#d60910] text-xs mt-1">{errors.address.state.message}</p>}
//                   </div>
//                   <div>
//                     <label className="block text-xs font-bold mb-2">Country</label>
//                     <input {...register("address.country")} className="w-full border rounded p-3 text-sm focus:border-[#D87D4A] outline-none" placeholder="India" />
//                     {errors.address?.country && <p className="text-[#d60910] text-xs mt-1">{errors.address.country.message}</p>}
//                   </div>
//                 </div>
//               </div>
//             </section>

//             {/* Payment Method Selection */}
//             <section>
//               <h2 className="text-sm font-bold text-[#D87D4A] mb-4 tracking-widest uppercase">Payment Method</h2>
//               <div className="space-y-3">
//                 {/* Online Payment Card */}
//                 <div 
//                   onClick={() => setValue("paymentMethod", "online")}
//                   className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${
//                     selectedPayment === "online" ? "border-[#D87D4A] bg-[#fffaf7] shadow-sm" : "border-gray-200"
//                   }`}
//                 >
//                   <div className="flex items-center gap-4">
//                     <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
//                       selectedPayment === "online" ? "border-[#D87D4A]" : "border-gray-300"
//                     }`}>
//                       {selectedPayment === "online" && <div className="w-2.5 h-2.5 bg-[#D87D4A] rounded-full" />}
//                     </div>
//                     <div>
//                       <p className="text-sm font-bold">Pay Online</p>
//                       <p className="text-xs text-gray-500">UPI, QR Scan, Cards, Netbanking</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Image src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" alt="Razorpay" width={70} height={20} className="opacity-70" />
//                   </div>
//                 </div>

//                 {/* COD Card */}
//                 <div 
//                   onClick={() => setValue("paymentMethod", "cod")}
//                   className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${
//                     selectedPayment === "cod" ? "border-[#D87D4A] bg-[#fffaf7] shadow-sm" : "border-gray-200"
//                   }`}
//                 >
//                   <div className="flex items-center gap-4">
//                     <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
//                       selectedPayment === "cod" ? "border-[#D87D4A]" : "border-gray-300"
//                     }`}>
//                       {selectedPayment === "cod" && <div className="w-2.5 h-2.5 bg-[#D87D4A] rounded-full" />}
//                     </div>
//                     <div>
//                       <p className="text-sm font-bold">Cash on Delivery</p>
//                       <p className="text-xs text-gray-500">Pay at your doorstep</p>
//                     </div>
//                   </div>
//                   <Banknote className="text-gray-400" size={24} />
//                 </div>
//               </div>
//             </section>
//           </div>

//           {/* RIGHT COLUMN: SUMMARY */}
//           <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 h-fit">
//             <h2 className="text-lg font-bold mb-6">SUMMARY</h2>
//             <div className="space-y-4 mb-6">
//               {cartItems.map((item) => (
//                 <div key={item.id} className="flex justify-between items-center">
//                   <div className="flex items-center gap-3">
//                     <div className="w-12 h-12 relative bg-gray-50 rounded border overflow-hidden">
//                       {item.image ? (
//                         <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
//                       ) : (
//                         <ShoppingCart className="h-4 w-4 absolute inset-0 m-auto text-gray-300" />
//                       )}
//                     </div>
//                     <div className="text-sm">
//                       <p className="font-bold">{item.name}</p>
//                       <p className="text-gray-500">₹{item.price}</p>
//                     </div>
//                   </div>
//                   <p className="text-xs font-bold text-gray-400">x{item.quantity}</p>
//                 </div>
//               ))}
//             </div>

//             <div className="border-t border-gray-100 pt-4 space-y-2 mb-6">
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-500">TOTAL</span>
//                 <span className="font-bold">₹{cartTotal.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-500">SHIPPING</span>
//                 <span className="font-bold">₹{shippingFee.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between pt-2">
//                 <span className="text-sm font-bold">GRAND TOTAL</span>
//                 <span className="font-bold text-[#D87D4A]">₹{grandTotal.toFixed(2)}</span>
//               </div>
//             </div>

//             <Button 
//               type="submit" 
//               className="w-full bg-[#D87D4A] hover:bg-[#c46d3b] text-white py-6 rounded-lg font-bold uppercase tracking-widest transition-all" 
//               disabled={cartItems.length === 0 || isSendingOTP}
//             >
//               {isSendingOTP ? "Verifying..." : "Continue & Pay"}
//             </Button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }

"use client";

import { useCart } from "@/context/CartContext";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ShoppingCart, Banknote, ChevronLeft } from "lucide-react";
import { API_BASE_URL, createOrder } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { CheckoutFormValues, checkoutSchema } from "../validations/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const router = useRouter();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL!;
  const widgetInitialized = useRef(false);

  // Dynamic shipping based on selected payment method
  const [shippingFee, setShippingFee] = useState(0);

  // Get the first cart item (assuming single product checkout)
  const cartItem = cartItems[0];

  // Watch payment method from form
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: "online",
      paymentMode: "razorpay",
    },
  });

  const selectedPayment = watch("paymentMethod");

  // Recalculate shipping fee when payment method changes
  useEffect(() => {
    if (selectedPayment === "online") {
      setShippingFee(0);
    } else {
      // COD: use the codShipping stored in cart item (if available)
      const codFee = cartItem?.codShipping || 0;
      setShippingFee(codFee);
    }
  }, [selectedPayment, cartItem]);

  const grandTotal = cartTotal + shippingFee;

  // Load MSG91 widget script once
  useEffect(() => {
    if (widgetInitialized.current) return;
    widgetInitialized.current = true;

    const script = document.createElement("script");
    script.src = "https://verify.msg91.com/otp-provider.js";
    script.async = true;
    document.head.appendChild(script);
  }, []);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
        return resolve(true);
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const onSubmit = async (formData: CheckoutFormValues) => {
    const subtotal = cartTotal;
    const tax = 0;
    const total = subtotal + shippingFee + tax;

    const orderData = {
      customer: { ...formData, address: formData.address },
      products: cartItems.map((item) => ({
        productId: String(item.id),
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        imageUrl: item.image || "",
      })),
      subtotal,
      shipping: shippingFee,
      tax,
      total,
      paymentMethod: formData.paymentMethod,
      paymentMode: formData.paymentMethod === "cod" ? "cod" : "razorpay",
      orderId: `ORD-${Date.now()}`,
    };

    // ==================== COD FLOW with MSG91 Widget ====================
    if (formData.paymentMethod === "cod") {
      setIsSendingOTP(true);
      try {
        const config = {
          widgetId: process.env.NEXT_PUBLIC_MSG91_WIDGET_ID!,
          tokenAuth: process.env.NEXT_PUBLIC_MSG91_TOKEN_AUTH!,
          identifier: `+91${formData.phone}`,
          exposeMethods: false,
          success: async (data: any) => {
            console.log("Full widget success data:", data);
            const accessToken = data.message || data.token;
            if (!accessToken) {
              throw new Error("No token received from widget");
            }

            const verifyRes = await fetch(`${API_BASE_URL}/api/orders/verify-widget-token`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ accessToken }),
            });
            const verifyData = await verifyRes.json();
            if (!verifyRes.ok) throw new Error(verifyData.error || "Token verification failed");

            // Create COD order
            const orderResponse = await createOrder(orderData);
            if (orderResponse.success) {
              clearCart();
              router.push(`/checkout/success?orderId=${orderResponse.orderId}`);
            } else {
              throw new Error("Order creation failed");
            }
          },
          failure: (error: any) => {
            console.error("OTP widget error", error);
            Swal.fire("Verification Failed", error.message || "Invalid OTP or user cancelled", "error");
            setIsSendingOTP(false);
          },
        };

        if (typeof window !== "undefined" && (window as any).initSendOTP) {
          (window as any).initSendOTP(config);
        } else {
          throw new Error("MSG91 widget not loaded");
        }
      } catch (err: any) {
        Swal.fire("Error", err.message || "Failed to start OTP verification", "error");
        setIsSendingOTP(false);
      }
      return;
    }

    // ==================== ONLINE (RAZORPAY) FLOW ====================
    try {
      const response = await createOrder(orderData);

      const loaded = await loadRazorpayScript();
      if (!loaded) {
        Swal.fire("Error", "Razorpay SDK failed to load", "error");
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: response.amount * 100,
        currency: "INR",
        name: "Kin Ultrapower",
        description: "Order Payment",
        order_id: response.razorpayOrderId,
        handler: async (razorpayResponse: any) => {
          const verifyRes = await fetch(`${API_BASE_URL}/api/orders/verify-payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: response.orderId,
              razorpay_payment_id: razorpayResponse.razorpay_payment_id,
              razorpay_order_id: razorpayResponse.razorpay_order_id,
              razorpay_signature: razorpayResponse.razorpay_signature,
            }),
          });

          if (verifyRes.ok) {
            clearCart();
            router.push(`/checkout/success?orderId=${response.orderId}`);
          } else {
            const err = await verifyRes.json();
            Swal.fire("Payment Failed", err.error || "Verification failed", "error");
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: "#D87D4A" },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error: any) {
      Swal.fire("Error", error.message || "Order submission failed", "error");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
  <button 
    type="button"
    onClick={() => router.back()}
    className="flex items-center gap-2 text-gray-400 hover:text-[#D87D4A] transition-colors mb-6 group"
  >
    <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform text-gray-700" />
    <span className="text-lg font-medium text-gray-700">Back</span>
  </button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN: FORM */}
          <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            {/* Add this Back Button snippet */}
            <h1 className="text-2xl font-bold mb-8 uppercase tracking-tight">Checkout</h1>

            {/* Billing Details */}
            <section className="mb-10">
              <h2 className="text-sm font-bold text-[#D87D4A] mb-4 tracking-widest uppercase">Billing Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-2">Name</label>
                  <input
                    {...register("name")}
                    className="w-full border rounded p-3 text-sm focus:border-[#D87D4A] outline-none"
                    placeholder="Enter name"
                  />
                  {errors.name && <p className="text-[#d60910] text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold mb-2">Email Address</label>
                  <input
                    {...register("email")}
                    className="w-full border rounded p-3 text-sm focus:border-[#D87D4A] outline-none"
                    placeholder="email@example.com"
                  />
                  {errors.email && <p className="text-[#d60910] text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold mb-2">Phone Number</label>
                  <input
                    {...register("phone")}
                    className="w-full border rounded p-3 text-sm focus:border-[#D87D4A] outline-none"
                    placeholder="9876543210"
                  />
                  {errors.phone && <p className="text-[#d60910] text-xs mt-1">{errors.phone.message}</p>}
                </div>
              </div>
            </section>

            {/* Shipping Info */}
            <section className="mb-10">
              <h2 className="text-sm font-bold text-[#D87D4A] mb-4 tracking-widest uppercase">Shipping Info</h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-2">Street Address</label>
                  <input
                    {...register("address.street")}
                    className="w-full border rounded p-3 text-sm focus:border-[#D87D4A] outline-none"
                    placeholder="123 Main St"
                  />
                  {errors.address?.street && <p className="text-[#d60910] text-xs mt-1">{errors.address.street.message}</p>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold mb-2">ZIP Code</label>
                    <input
                      {...register("address.zipCode")}
                      className="w-full border rounded p-3 text-sm focus:border-[#D87D4A] outline-none"
                      placeholder="110001"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-2">City</label>
                    <input
                      {...register("address.city")}
                      className="w-full border rounded p-3 text-sm focus:border-[#D87D4A] outline-none"
                      placeholder="New Delhi"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-2">State</label>
                    <input
                      {...register("address.state")}
                      className="w-full border rounded p-3 text-sm focus:border-[#D87D4A] outline-none"
                      placeholder="Delhi"
                    />
                    {errors.address?.state && <p className="text-[#d60910] text-xs mt-1">{errors.address.state.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-2">Country</label>
                    <input
                      {...register("address.country")}
                      className="w-full border rounded p-3 text-sm focus:border-[#D87D4A] outline-none"
                      placeholder="India"
                    />
                    {errors.address?.country && <p className="text-[#d60910] text-xs mt-1">{errors.address.country.message}</p>}
                  </div>
                </div>
              </div>
            </section>

            {/* Payment Method Selection */}
            <section>
              <h2 className="text-sm font-bold text-[#D87D4A] mb-4 tracking-widest uppercase">Payment Method</h2>
              <div className="space-y-3">
                {/* Online Payment Card */}
                <div
                  onClick={() => setValue("paymentMethod", "online")}
                  className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${
                    selectedPayment === "online" ? "border-[#D87D4A] bg-[#fffaf7] shadow-sm" : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedPayment === "online" ? "border-[#D87D4A]" : "border-gray-300"
                      }`}
                    >
                      {selectedPayment === "online" && <div className="w-2.5 h-2.5 bg-[#D87D4A] rounded-full" />}
                    </div>
                    <div>
                      <p className="text-sm font-bold">Pay Online</p>
                      <p className="text-xs text-gray-500">UPI, QR Scan, Cards, Netbanking</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" alt="Razorpay" width={70} height={20} className="opacity-70" />
                  </div>
                </div>

                {/* COD Card */}
                <div
                  onClick={() => setValue("paymentMethod", "cod")}
                  className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${
                    selectedPayment === "cod" ? "border-[#D87D4A] bg-[#fffaf7] shadow-sm" : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedPayment === "cod" ? "border-[#D87D4A]" : "border-gray-300"
                      }`}
                    >
                      {selectedPayment === "cod" && <div className="w-2.5 h-2.5 bg-[#D87D4A] rounded-full" />}
                    </div>
                    <div>
                      <p className="text-sm font-bold">Cash on Delivery</p>
                      <p className="text-xs text-gray-500">Pay at your doorstep</p>
                    </div>
                  </div>
                  <Banknote className="text-gray-400" size={24} />
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: SUMMARY */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 h-fit">
            <h2 className="text-lg font-bold mb-6">SUMMARY</h2>
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 relative bg-gray-50 rounded border overflow-hidden">
                      {item.image ? (
                        <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                      ) : (
                        <ShoppingCart className="h-4 w-4 absolute inset-0 m-auto text-gray-300" />
                      )}
                    </div>
                    <div className="text-sm">
                      <p className="font-bold">{item.name}</p>
                      <p className="text-gray-500">₹{item.price}</p>
                    </div>
                  </div>
                  <p className="text-xs font-bold text-gray-400">x{item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-4 space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">TOTAL</span>
                <span className="font-bold">₹{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">SHIPPING</span>
                <span className="font-bold">
                  {shippingFee === 0 ? "FREE" : `₹${shippingFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-sm font-bold">GRAND TOTAL</span>
                <span className="font-bold text-[#D87D4A]">₹{grandTotal.toFixed(2)}</span>
              </div>
              <p className="text-xs text-gray-400 text-right -mt-2 mb-2">
                {selectedPayment === "online"
                  ? "Free shipping on prepaid orders"
                  : `₹${shippingFee} COD handling fee applies`}
              </p>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#D87D4A] hover:bg-[#c46d3b] text-white py-6 rounded-lg font-bold uppercase tracking-widest transition-all"
              disabled={cartItems.length === 0 || isSendingOTP}
            >
              {isSendingOTP ? "Verifying..." : "Continue & Pay"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}