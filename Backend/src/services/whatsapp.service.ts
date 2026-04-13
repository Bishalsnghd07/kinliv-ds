// import fetch from 'node-fetch';

// interface WhatsAppOrderData {
//   phoneNumber: string;      // Format: "91XXXXXXXXXX" (with country code)
//   orderId: string;          // Your ORD-xxxxxxxx
//   items: string;            // e.g., "Kids Calcium Gummy" (or comma-separated list)
//   amount: string;           // e.g., "499.00"
// }

// export async function sendOrderConfirmationWhatsApp(data: WhatsAppOrderData) {
//   const { phoneNumber, orderId, items, amount } = data;

//   // Validate required environment variables
//   const authKey = process.env.MSG91_AUTH_KEY;
//   const integrationId = process.env.MSG91_WHATSAPP_INTEGRATION_ID;
//   const templateId = process.env.MSG91_ORDER_CONFIRM_TEMPLATE_ID;
//   const senderNumber = process.env.MSG91_WHATSAPP_NUMBER;

//   if (!authKey || !integrationId || !templateId || !senderNumber) {
//     console.error('❌ MSG91 credentials missing in environment');
//     return;
//   }

//   // Ensure phone number has country code (assumes Indian number)
//   let formattedPhone = phoneNumber;
//   if (!phoneNumber.startsWith('91')) {
//     formattedPhone = `91${phoneNumber.replace(/^0+/, '')}`;
//   }

//   const payload = {
//     integration_id: integrationId,
//     recipients: [
//       {
//         mobiles: formattedPhone,
//         template_id: templateId,
//         sender: senderNumber,
//         type: "template",
//         variables: {
//           "1": orderId,
//           "2": items,
//           "3": amount
//         }
//       }
//     ]
//   };

//   try {
//     const response = await fetch(
//       'https://api.msg91.com/api/v5/whatsapp/whatsapp-outbound-message/bulk/',
//       {
//         method: 'POST',
//         headers: {
//           'authkey': authKey,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       }
//     );

//     const result = await response.json();
//     if (!response.ok) {
//       console.error('❌ MSG91 WhatsApp error:', result);
//       return;
//     }
//     console.log(`✅ WhatsApp sent to ${formattedPhone} for order ${orderId}`);
//   } catch (error) {
//     console.error('❌ WhatsApp service failed:', error);
//   }
// }

// backend/services/whatsapp.service.ts
// backend/services/whatsapp.service.ts
import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

interface WhatsAppOrderData {
  phoneNumber: string;      // Recipient's phone number (e.g., "917294812715")
  orderId: string;
  items: string;
  amount: string;
}

export async function sendOrderConfirmationWhatsApp(data: WhatsAppOrderData) {
  const { phoneNumber, orderId, items, amount } = data;

  // Format phone number to E.164 standard (e.g., +917294812715)
  let formattedPhone = phoneNumber.trim();
  if (!formattedPhone.startsWith('+')) {
    if (formattedPhone.startsWith('91')) {
      formattedPhone = `+${formattedPhone}`;
    } else {
      formattedPhone = `+91${formattedPhone.replace(/^0+/, '')}`;
    }
  }

  console.log("📞 WhatsApp service received:", {
    originalPhone: phoneNumber,
    formattedPhone,
    orderId,
    items,
    amount
  });

  const toNumber = `whatsapp:${formattedPhone}`;
  const fromNumber = `whatsapp:${process.env.TWILIO_WHATSAPP_SANDBOX_NUMBER}`;

  console.log(`📤 Sending WhatsApp from ${fromNumber} to ${toNumber}`);

  try {
    const message = await client.messages.create({
      body: `🎉 *Order Confirmed!*\n\nThank you for your order!\n\n*Order ID:* ${orderId}\n*Items:* ${items}\n*Total:* ₹${amount}\n\nWe'll notify you when it ships.`,
      from: fromNumber,
      to: toNumber,
    });

    console.log(`✅ WhatsApp sent! SID: ${message.sid}`);
    return { success: true, sid: message.sid };
  } catch (error) {
    console.error("❌ Twilio WhatsApp Error:", error);
    return { success: false, error };
  }
}