// backend/src/services/otp.service.ts

const MSG91_AUTH_KEY = process.env.MSG91_AUTH_KEY!;
const MSG91_WIDGET_ID = process.env.MSG91_WIDGET_ID!;

export async function sendOTPviaSMS(phone: string): Promise<{ requestId: string }> {
  const cleanPhone = phone.replace(/\D/g, '');
  if (cleanPhone.length !== 10) throw new Error("Phone must be 10 digits");
  const mobileWithCountryCode = `${cleanPhone}`; // No '+'

  const url = `https://api.msg91.com/api/v5/otp?authkey=${MSG91_AUTH_KEY}&mobile=${mobileWithCountryCode}&widget_id=${MSG91_WIDGET_ID}`;
  const response = await fetch(url, { method: 'POST' });
  const data = await response.json();

  if (!response.ok || data.type === 'error') {
    throw new Error(data.message || 'Failed to send OTP');
  }
  return { requestId: data.message };
}

export async function verifyOTP(phone: string, otpCode: string): Promise<boolean> {
  const cleanPhone = phone.replace(/\D/g, '');
  const mobileWithCountryCode = `${cleanPhone}`;
  const url = `https://api.msg91.com/api/v5/otp/verify?authkey=${MSG91_AUTH_KEY}&mobile=${mobileWithCountryCode}&otp=${otpCode}`;
  const response = await fetch(url, { method: 'POST' });
  const data = await response.json();

  return response.ok && data.type === 'success';
}