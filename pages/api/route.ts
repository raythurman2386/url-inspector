import type { NextApiRequest, NextApiResponse } from 'next';

const API_KEY = process.env.SAFE_BROWSING_API_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { url } = req.body;
      const domain = new URL(url).hostname;

      const payload = {
        client: {
          clientId: 'your-client-id',
          clientVersion: '1.0.0',
        },
        threatInfo: {
          threatTypes: ['MALWARE', 'SOCIAL_ENGINEERING', 'UNWANTED_SOFTWARE'],
          platformTypes: ['ANY_PLATFORM'],
          threatEntryTypes: ['URL'],
          threatEntries: [{ url: domain }],
        },
      };

      const response = await fetch(
        `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (data.matches) {
        res.status(200).json({ message: 'The URL may be potentially harmful.' });
      } else {
        res.status(200).json({ message: 'The URL is safe.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while checking the URL.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
}
