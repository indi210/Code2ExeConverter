
import telebot
from telebot import types
import time
import threading
from datetime import datetime

# === CONFIGURATION ===
BOT_TOKEN = '8181163736:AAFBZS9CR1t90wIvKgXT5IcAVqFNLh8ujmM'
CHANNEL_ID = '@hl3_8A5g86BmMzJk'
VIP_LINK = 'https://t.me/+yourPrivateVIPLink'  # Replace with real private VIP invite
BTC_WALLET = '1JFFPVegzKY8eMSRvzJm7RTpbTPjUCtzyS'
PAYPAL_EMAIL = 'mini31@mail.com'
ADMIN_EMAIL = 'ervin210@icloud.com'
WATERMARK = '🔥 t.me/bestxxx23'

bot = telebot.TeleBot(BOT_TOKEN)
earnings_log = []

# ========== START ==========
@bot.message_handler(commands=['start'])
def start(message):
    bot.send_message(message.chat.id, (
        "👑 Welcome to MAX-INCOME Bot v3.0

"
        "Use /buy to get full VIP access for just £1–£15
"
        "Use /donate to support
"
        "Use /stats for income report
"
        "Use /promo to grow your traffic 🚀"
    ))

# ========== BUY VIP ==========
@bot.message_handler(commands=['buy'])
def show_payment_info(message):
    text = (
        f"💸 VIP Access — Support & Unlock Content

"
        f"💳 PayPal: {PAYPAL_EMAIL}
"
        f"🪙 BTC: {BTC_WALLET}

"
        "➡️ After payment, send a screenshot with caption 'paid'
"
        "You’ll get full access to premium VIP."
    )
    bot.send_message(message.chat.id, text)

# ========== CONFIRM PAYMENT ==========
@bot.message_handler(content_types=['photo'])
def handle_payment_screenshot(message):
    if message.caption and 'paid' in message.caption.lower():
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        earnings_log.append((message.from_user.username or message.from_user.id, timestamp))
        bot.send_message(message.chat.id, f"✅ Payment confirmed!
🎁 VIP Access: {VIP_LINK}")

# ========== DONATIONS ==========
@bot.message_handler(commands=['donate'])
def donation_info(message):
    bot.send_message(message.chat.id, (
        f"🙏 Want to donate?

PayPal: {PAYPAL_EMAIL}
BTC: {BTC_WALLET}
"
        "Send proof with caption 'donation' and you’ll get a thank-you gift!"
    ))

# ========== ADMIN STATS ==========
@bot.message_handler(commands=['stats'])
def show_stats(message):
    if message.chat.type == 'private' and str(message.from_user.id) in ['your_telegram_id']:
        stats = "\n".join([f"{u} | {t}" for u, t in earnings_log])
        bot.send_message(message.chat.id, f"📈 Earnings Log:
{stats or 'No sales yet.'}")
    else:
        bot.send_message(message.chat.id, "❌ You are not authorized to view stats.")

# ========== PROMO ==========
@bot.message_handler(commands=['promo'])
def promo(message):
    bot.send_message(message.chat.id, (
        "📢 Promote this channel:
"
        "- Share your bot link
"
        "- Join Telegram exchange groups
"
        "- Use Reddit, Twitter, or Instagram for traffic

"
        "💡 More traffic = more income!"
    ))

# ========== VIP POST ==========
@bot.message_handler(commands=['postvip'])
def ask_vip_content(message):
    bot.send_message(message.chat.id, "Send text/photo/video to post to VIP.")
    bot.register_next_step_handler(message, post_to_vip)

def post_to_vip(message):
    try:
        if message.content_type == 'text':
            bot.send_message(CHANNEL_ID, f"{message.text}

{WATERMARK}")
        elif message.content_type == 'photo':
            bot.send_photo(CHANNEL_ID, message.photo[-1].file_id, caption=f"{message.caption or ''}

{WATERMARK}")
        elif message.content_type == 'video':
            bot.send_video(CHANNEL_ID, message.video.file_id, caption=f"{message.caption or ''}

{WATERMARK}")
        bot.send_message(message.chat.id, "✅ Sent to VIP.")
    except Exception as e:
        bot.send_message(message.chat.id, f"❌ Failed: {e}")

# ========== START LOOP ==========
print("💸 MAX-INCOME BOT v3.0 running 24/7...")
threading.Thread(target=bot.polling, daemon=True).start()
