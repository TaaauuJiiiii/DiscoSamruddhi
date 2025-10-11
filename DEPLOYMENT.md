# Deployment Guide - Render + Uptime Monitoring

Complete guide to deploy your Discord bot on Render with uptime monitoring.

## Part 1: Deploy to Render

### Step 1: Push to GitHub

1. Make sure all your changes are committed:
   ```bash
   git add .
   git commit -m "Ready for Render deployment"
   git push origin main
   ```

### Step 2: Create Render Account

1. Go to [render.com](https://render.com)
2. Sign up with your GitHub account (recommended)

### Step 3: Create New Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Select your bot repository

### Step 4: Configure the Service

Fill in these settings:

- **Name**: `samruddhi-discord-bot` (or any name you prefer)
- **Region**: Choose closest to you
- **Branch**: `main`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Instance Type**: **Free**

### Step 5: Add Environment Variables

Click **"Advanced"** and add these environment variables:

1. **DISCORD_TOKEN**
   - Value: Your Discord bot token

2. **GEMINI_API_KEY**
   - Value: Your Google Gemini API key

3. **PORT** (automatically set by Render, but you can verify)
   - Value: 3000

### Step 6: Deploy

1. Click **"Create Web Service"**
2. Wait for the deployment to complete (2-5 minutes)
3. Check the logs to see: `Logged in as [YourBotName]! I'M ONLINE AND ALREADY ANNOYED.`

### Step 7: Copy Your Service URL

After deployment, copy your service URL. It will look like:
```
https://samruddhi-discord-bot.onrender.com
```

---

## Part 2: Set Up Uptime Monitoring

Render's free tier sleeps after 15 minutes of inactivity. To keep your bot alive 24/7, use an uptime monitor.

### Option 1: UptimeRobot (Recommended - Easy & Free)

1. **Sign Up**
   - Go to [uptimerobot.com](https://uptimerobot.com)
   - Create a free account

2. **Add New Monitor**
   - Click **"+ Add New Monitor"**
   - **Monitor Type**: HTTP(s)
   - **Friendly Name**: Samruddhi Discord Bot
   - **URL**: `https://your-app-name.onrender.com/health`
   - **Monitoring Interval**: 5 minutes (free tier)

3. **Save Monitor**
   - Click **"Create Monitor"**
   - Done! Your bot will be pinged every 5 minutes

### Option 2: Cron-job.org (Alternative)

1. **Sign Up**
   - Go to [cron-job.org](https://cron-job.org)
   - Create free account

2. **Create Cronjob**
   - Click **"Create cronjob"**
   - **Title**: Samruddhi Bot Keep-Alive
   - **URL**: `https://your-app-name.onrender.com/health`
   - **Schedule**: Every 5 minutes (`*/5 * * * *`)

3. **Save**
   - Enable the cronjob
   - Your bot will stay alive!

### Option 3: BetterUptime (Alternative)

1. Go to [betteruptime.com](https://betteruptime.com)
2. Free plan monitors every 3 minutes
3. Add your Render URL with `/health` endpoint

---

## Part 3: Verify Everything Works

### Check Your Bot is Online

1. **In Discord**: Bot should show as online
2. **Test it**: Mention the bot in a server
3. **Check Logs**: Go to Render dashboard → Logs

### Check Uptime Monitor

1. Visit your uptime monitor dashboard
2. Should show "Up" or "Online" status
3. Wait 5-10 minutes and check again

### Health Check Endpoint

Visit in your browser:
```
https://your-app-name.onrender.com/health
```

You should see:
```json
{
  "status": "ok",
  "uptime": 123.456,
  "timestamp": "2024-10-11T12:00:00.000Z",
  "bot": "Samruddhi Discord Bot"
}
```

---

## Troubleshooting

### Bot Not Starting
- Check Render logs for errors
- Verify environment variables are set correctly
- Make sure DISCORD_TOKEN and GEMINI_API_KEY are correct

### Bot Going Offline
- Check uptime monitor is active
- Verify the monitor is pinging every 5 minutes
- Check Render logs for crashes

### Render Free Tier Limits
- 750 hours/month free
- Sleeps after 15 minutes of inactivity (hence the uptime monitor)
- Limited to 512MB RAM

### Out of Free Hours
- Monitor your usage in Render dashboard
- Consider upgrading to paid plan ($7/month for always-on)
- Or use Oracle Cloud free tier (more complex setup)

---

## Cost Breakdown (100% Free Setup)

| Service | Cost | What It Does |
|---------|------|--------------|
| Render Free Tier | $0 | Hosts your bot |
| UptimeRobot | $0 | Keeps bot alive |
| Discord | $0 | Bot platform |
| Google Gemini API | $0 | AI responses (free tier) |

**Total: $0/month** 🎉

---

## Maintenance

### Update Your Bot
1. Push changes to GitHub
2. Render will auto-deploy (if enabled)
3. Or manually deploy from Render dashboard

### Monitor Performance
- Check Render logs regularly
- Watch for API errors
- Monitor Gemini API usage quota

### Backup
- Your code is on GitHub ✓
- Environment variables: save in password manager
- Regular commits recommended

---

## Next Steps

- [ ] Deploy to Render
- [ ] Set up uptime monitor
- [ ] Test bot functionality
- [ ] Join your Discord server
- [ ] Share with friends!

Happy hosting! 🚀

