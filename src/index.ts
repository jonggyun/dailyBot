require('dotenv').config();

import axios from 'axios';
import { getNews } from './parser';

export const sendMessage = async () => {
  try {
    const news = await getNews() || [];
    const date = new Date().toLocaleDateString();
    const webhookApi = process.env.WEBHOOK_URL_SLACK || '';
    const message = {
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `📰 오늘의 뉴스(${date})`,
          },
        },
        {
          type: 'divider',
        },
        ...news,
      ],
    };
    await axios.post(webhookApi, message);
  } catch (error) {
    console.log('😱 Error has been occured.', error.message);
  }
};

(function () {
  console.log('⭐️ Start DailyBot.');
  sendMessage();
})();
