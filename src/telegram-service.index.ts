import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import { generateOTP } from './utils/helper/generate-otp';
import { databaseConnection } from './configs/db.config';
import { TelegramAuthModel } from './models/telegram-auth.model';
import { generateRandomUsername } from './utils/helper/unique-username-generator';
import { telegramAuthService } from './services/auth/telegram-auth.service';

dotenv.config();

databaseConnection();

const token = process.env.TELEGRAM_BOT_TOKEN || '';
const bot = new TelegramBot(token, { polling: true });
const userParams: { [key: number]: string } = {};

bot.onText(/\/start(.*)/, (msg, match) => {
  const chatId = msg.chat.id;
  const deviceId = match ? match[1] : '';
  userParams[chatId] = deviceId;

  bot.sendMessage(chatId, `Kodni olish uchun telefon raqamingizni yuboring.`, {
    reply_markup: {
      keyboard: [
        [
          {
            text: 'Telefon raqamni yuborish',
            request_contact: true,
          },
        ],
      ],
      one_time_keyboard: true,
    },
  });
});

bot.on('contact', async (msg) => {
  const chatId = msg.chat.id;
  const phoneNumber = msg.contact ? msg.contact.phone_number : '';
  const otpExpireDate = new Date(Date.now() + 2000 * 60 * 1000); // 2 minutes from now
  const fullName = msg.from?.first_name + ' ' + msg.from?.last_name || '';

  const deviceId = userParams[chatId]?.replace(' ', '');

  if (!deviceId) {
    bot.sendMessage(chatId, "Sayt orqali botga kirib qaytadan urunib ko'ring.");
    return;
  }

  try {
    const otp = generateOTP();
    bot.sendMessage(chatId, `Sizning kodingiz: ${otp}`);

    const existingTelegramAuth = await telegramAuthService.getTelegramAuthByDeviceId(deviceId);

    if (existingTelegramAuth) {
      return await telegramAuthService.refreshOtpByDeviceId(deviceId, otp, otpExpireDate);
    }

    const newTelegramAuth = {
      otp,
      deviceId,
      phoneNumber: `+${phoneNumber}`,
      expireDate: otpExpireDate,
      fullName: fullName || 'Telegram User',
      username: generateRandomUsername.generateUsername(),
    };
    const telegramAuth = new TelegramAuthModel(newTelegramAuth);
    telegramAuth.save();
  } catch (error: any) {
    bot.sendMessage(chatId, error.message);
  }

  console.log(`Received phone number: ${phoneNumber} from chat ID: ${chatId}`);
});
