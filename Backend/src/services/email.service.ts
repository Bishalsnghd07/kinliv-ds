// import sgMail from "@sendgrid/mail";

// // Initialize SendGrid
// if (!process.env.SENDGRID_API_KEY) {
//   throw new Error("SENDGRID_API_KEY is missing in environment variables!");
// }

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// export async function sendOrderConfirmation(
//   email: string,
//   order: {
//     id: string;
//     items: Array<{
//       name: string;
//       price: number;
//       quantity: number;
//       imageUrl?: string;
//     }>;
//     estimatedDelivery: string;
//   }
// ) {
//   try {
//     // Validate email format
//     if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       throw new Error("Invalid recipient email address");
//     }

//     // Check if sender email is set
//     if (!process.env.SENDER_EMAIL) {
//       throw new Error("SENDER_EMAIL is not configured");
//     }

//     const itemsHTML = order.items
//       .map(
//         (item) => `
//       <tr>
//         <td>
//           <img
//             src="${item.imageUrl || "https://via.placeholder.com/80"}"
//             alt="${item.name}"
//             width="80"
//             style="display: block; border: 1px solid #eee;"
//           >
//         </td>
//         <td style="padding: 10px;">
//           <strong>${item.name}</strong><br>
//           Qty: ${item.quantity}<br>
//           Price: ₹${item.price.toFixed(2)}
//         </td>
//       </tr>
//     `
//       )
//       .join("");

//     const msg = {
//       to: email,
//       from: {
//         email: process.env.SENDER_EMAIL,
//         name: "E-Commerce Jewellery Web App by Bishal",
//       },
//       subject: `Your Jewellery Order #${order.id}`,
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//           <div style="background-color: #f8f8f8; padding: 20px; text-align: center;">
//             <h1 style="color: #d87d4a;">Thank You For Your Order!</h1>
//           </div>

//           <div style="padding: 20px;">
//             <h3>Order #${order.id}</h3>
//             <p>Estimated delivery: <strong>${
//               order.estimatedDelivery
//             }</strong></p>

//             <h4>Your Items:</h4>
//             <table style="width: 100%; border-collapse: collapse;">
//               ${itemsHTML}
//             </table>

//             <p style="margin-top: 20px;">
//               <a href="https://luxe-jewels-six.vercel.app/orders/${order.id}"
//                  style="background-color: #d87d4a; color: white; padding: 10px 15px; text-decoration: none; border-radius: 4px;">
//                 Track Your Order
//               </a>
//             </p>
//           </div>

//           <div style="background-color: #f8f8f8; padding: 20px; text-align: center; font-size: 12px;">
//             <p>© ${new Date().getFullYear()} Luxe Jewels. All rights reserved.</p>
//           </div>
//         </div>
//       `,
//       // mailSettings: {
//       //   bypassListManagement: { enable: false },
//       //   spamCheck: { enable: true, threshold: 5 },
//       // },

//       // ... other email config
//       mailSettings: {
//         bypassListManagement: { enable: false }, // Don't bypass spam filters
//         // REMOVE spamCheck entirely
//       },
//       headers: {
//         // Add these headers for better deliverability
//         "X-Entity-Ref-ID": order.id, // Unique identifier
//       },
//     };

//     console.log("Attempting to send email to:", email); // Debug log
//     await sgMail.send(msg);
//     console.log("Email sent successfully!");
//   } catch (error) {
//     console.error("Failed to send order confirmation email:", error);

//     // Log detailed SendGrid error response if available
//     if (
//       typeof error === "object" &&
//       error !== null &&
//       "response" in error &&
//       typeof (error as any).response === "object" &&
//       (error as any).response !== null &&
//       "body" in (error as any).response
//     ) {
//       console.error("SendGrid API Response:", (error as any).response.body);
//     }

//     throw error; // Re-throw to handle in the calling function
//   }
// }

import sgMail from "@sendgrid/mail";

if (!process.env.SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY is missing in environment variables!");
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendOrderConfirmation(
  email: string,
  order: {
    id: string;
    items: Array<{
      name: string;
      price: number;
      quantity: number;
      imageUrl?: string;
    }>;
    estimatedDelivery: string;
  }
) {
  try {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Invalid recipient email address");
    }

    if (!process.env.SENDER_EMAIL) {
      throw new Error("SENDER_EMAIL is not configured");
    }

    const itemsHTML = order.items
      .map((item) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">
          <img src="${item.imageUrl || "https://via.placeholder.com/80"}" alt="${item.name}" width="80" style="display: block; border-radius: 4px;">
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">
          <strong style="color: #333;">${item.name}</strong><br>
          <span style="color: #666;">Qty: ${item.quantity} | Price: ₹${item.price}</span>
        </td>
      </tr>`)
      .join("");

    const msg = {
      to: email,
      cc: [
        "roshan@volzad.com",
        "kashishbatra@volzad.com",
        "info@divarostore.com"
      ],
      from: {
        email: process.env.SENDER_EMAIL,
        name: "Kin Ultrapower Support", // Updated Brand Name
      },
      subject: `Order Confirmed: #${order.id} - Your Power is on the Way!`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee;">
          <div style="background-color: #1a1a1a; padding: 30px; text-align: center;">
            <h1 style="color: #f59e0b; margin: 0;">KIN ULTRAPOWER</h1>
            <p style="color: #fff; margin-top: 10px;">Your transformation has begun.</p>
          </div>

          <div style="padding: 30px; background-color: #ffffff;">
            <h2 style="color: #333;">Thank you for your order!</h2>
            <p style="color: #555;">Order ID: <strong>${order.id}</strong></p>
            <p style="color: #555;">Estimated delivery: <strong>${order.estimatedDelivery}</strong></p>

            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              ${itemsHTML}
            </table>
            <div style="margin-top: 30px; line-height: 1.6;">
              <p style="font-size: 16px; font-weight: bold; color: #1a1a1a;">
                Great choice! Thousands are already seeing results with Kin Ultrapower.<br>
                <span style="color: #666; font-weight: normal; font-size: 14px;">(बहुत बढ़िया चुनाव! हजारों लोग Kin Ultrapower के साथ शानदार परिणाम देख रहे हैं।)</span>
              </p>

              <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">

              <h3 style="color: #1a1a1a; margin-bottom: 10px;">📦 What Happens Next? (अब आगे क्या होगा?)</h3>
              <p style="margin-bottom: 5px;">Your order is being carefully prepared for dispatch.<br>
              <span style="color: #666; font-size: 14px;">(आपका ऑर्डर सावधानीपूर्वक डिस्पैच के लिए तैयार किया जा रहा है।)</span></p>
              
              <p style="margin-bottom: 5px;">Estimated delivery: <strong>4–7 days</strong>.<br>
              <span style="color: #666; font-size: 14px;">(अनुमानित डिलीवरी: 4–7 दिन में।)</span></p>

              <p style="margin-bottom: 5px;">Results typically begin within 15 days, as this is a safe Ayurvedic formulation with no side effects.<br>
              <span style="color: #666; font-size: 14px;">(यह एक सुरक्षित आयुर्वेदिक उत्पाद है, जिसके परिणाम आमतौर पर 15 दिनों में दिखने शुरू हो जाते हैं और इसका कोई साइड इफेक्ट नहीं है।)</span></p>

              <h3 style="color: #1a1a1a; margin-top: 25px; margin-bottom: 10px;">💊 How to Use (इस्तेमाल करने का सही तरीका)</h3>
              <ul style="padding-left: 20px; margin-bottom: 20px;">
                <li style="margin-bottom: 10px;">
                  Doctors typically recommend taking it every night with a glass of milk.<br>
                  <span style="color: #666; font-size: 13px;">(डॉक्टर आमतौर पर इसे हर रात एक गिलास दूध के साथ लेने की सलाह देते हैं।)</span>
                </li>
                <li style="margin-bottom: 10px;">
                  Use consistently for at least 30 days for visible results.<br>
                  <span style="color: #666; font-size: 13px;">(अच्छे परिणाम के लिए कम से कम 30 दिनों तक नियमित रूप से इस्तेमाल करें।)</span>
                </li>
                <li style="margin-bottom: 10px;">
                   Stay well hydrated during the course.<br>
                  <span style="color: #666; font-size: 13px;">(इस दौरान अपने शरीर को अच्छी तरह हाइड्रेट रखें।)</span>
                </li>
              </ul>

              <div style="background-color: #fffbeb; border: 1px dashed #f59e0b; padding: 20px; border-radius: 8px; text-align: center;">
                <h3 style="color: #b45309; margin: 0;">🎁 Surprise Bonus (खास ऑफर आपके लिए)</h3>
                <p style="margin: 10px 0; font-size: 18px; font-weight: bold;">
                  Get 10% OFF on your next order – Use code: <span style="color: #f59e0b; background: #1a1a1a; padding: 2px 8px; border-radius: 4px;">POWER10</span>
                </p>
                <p style="color: #b45309; font-size: 13px; margin: 0;">
                  (अपने अगले ऑर्डर पर 10% की छूट पाएं – कोड इस्तेमाल करें: POWER10)
                </p>
              </div>

              <p style="margin-top: 20px; font-size: 13px; color: #666; text-align: center;">
                Most customers reorder before completing their 30-day cycle to maintain results.<br>
                (ज्यादातर ग्राहक अपने 30 दिन पूरे होने से पहले ही दोबारा ऑर्डर करते हैं ताकि उनके परिणाम बने रहें।)
              </p>
              <div style="margin-bottom: 20px;">
   
    <a href="https://wa.me/919217900585" 
       style="display: inline-block; background-color: #25D366; color: #ffffff; padding: 12px 25px; border-radius: 10px; text-decoration: none; font-weight: bold; margin: 5px; font-size: 15px; box-shadow: 0 4px 10px rgba(37, 211, 102, 0.2);">
      💬 WhatsApp Support
    </a>
    </div>
            </div>
          </div>

          <div style="background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #999;">
            <p>© ${new Date().getFullYear()} Shreembm Ayurveda. All rights reserved.</p>
          </div>
        </div>
      `,
    };

    console.log("🚀 Attempting to send email to:", email);
    await sgMail.send(msg);
    console.log("✅ Email sent successfully (CC'd team members)!");
  } catch (error: any) {
    console.error("❌ SendGrid Error Details:", error.response?.body || error.message);
    throw error;
  }
}