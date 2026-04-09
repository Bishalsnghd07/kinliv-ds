// backend/src/controllers/otp.controller.ts
import { Request, Response } from 'express';

export async function verifyWidgetToken(req: Request, res: Response) {
  const { accessToken } = req.body;
  if (!accessToken) {
    return res.status(400).json({ error: 'Access token required' });
  }

  try {
    const response = await fetch('https://control.msg91.com/api/v5/widget/verifyAccessToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        authkey: process.env.MSG91_AUTH_KEY!,
        'access-token': accessToken,
      }),
    });
    const data = await response.json();
    
    if (!response.ok || data.type === 'error') {
      throw new Error(data.message || 'Token verification failed');
    }
    
    // Explicitly return 200 with JSON
    return res.status(200).json({ success: true, identifier: data.identifier });
  } catch (err: any) {
    console.error('Token verification error:', err);
    return res.status(500).json({ error: err.message });
  }
}