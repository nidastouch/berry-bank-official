# Berry Bank Deployment Guide

## 🚀 Task 1: Setting Up Resend Newsletter System

Your newsletter API is already built at `/app/api/newsletter/route.ts`. Here's how to activate it:

### Step 1: Create Resend Account
1. Go to https://resend.com
2. Sign up for a free account (100 emails/day free tier)
3. Verify your email address

### Step 2: Get Your API Key
1. Log into Resend dashboard
2. Navigate to **API Keys** in the sidebar
3. Click **Create API Key**
4. Name it "Berry Bank Production"
5. Copy the API key (starts with `re_`)

### Step 3: Set Up Your Domain (Required for sending from @berrybank.app)
1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain: `berrybank.app`
4. Follow the DNS verification steps:
   - Add the provided TXT records to your GoDaddy DNS settings
   - Add the MX, SPF, and DKIM records for email authentication
   - Wait 5-10 minutes for DNS propagation
   - Click "Verify Domain" in Resend

**Note:** Until you verify your domain, emails will only send to your own email address (for testing).

### Step 4: Create an Audience (Optional - for managing subscribers)
1. In Resend dashboard, go to **Audiences**
2. Click **Create Audience**
3. Name it "Berry Bank Newsletter"
4. Copy the Audience ID (starts with `aud_`)

### Step 5: Add Environment Variables
Add these to your `.env.local` file:

```env
# Resend Configuration
RESEND_API_KEY=re_your_api_key_here
RESEND_AUDIENCE_ID=aud_your_audience_id_here  # Optional
```

### Step 6: Test the Newsletter
1. Start your dev server: `npm run dev`
2. Go to the homepage and scroll to the newsletter section
3. Enter your email and submit
4. Check your inbox for the welcome email!

### Features Already Implemented:
✅ Email validation
✅ Beautiful HTML welcome email with Berry Bank branding
✅ Automatic audience list management
✅ Error handling
✅ Success/error notifications to users

---

## 🌐 Task 2: Deploying to Vercel & Migrating Domain from Firebase

### Part A: Deploy to Vercel

#### Step 1: Install Vercel CLI (optional)
```bash
npm i -g vercel
```

#### Step 2: Push to GitHub (if not already)
1. Create a new repository on GitHub
2. Push your code:
```bash
git init
git add .
git commit -m "Initial Berry Bank deployment"
git branch -M main
git remote add origin https://github.com/yourusername/berry-bank-official.git
git push -u origin main
```

#### Step 3: Deploy to Vercel
1. Go to https://vercel.com
2. Sign in with GitHub
3. Click **Add New... → Project**
4. Import your `berry-bank-official` repository
5. Configure project:
   - **Framework Preset:** Next.js
   - **Root Directory:** `./`
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`

#### Step 4: Add Environment Variables to Vercel
In the Vercel project settings, add these environment variables:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=y5xd11f2
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=skP1YbGazp9guv1sr5QUjxtqZgWH6DnaF0IieTNqd2vVaCrUaCry45quLmH3JlMtDx5El327EMMgpiHJ3E0tld6giYxC7xz2Nu0H4ptZllexndSavfo1t0fiAAH7ov9xhfUm22FLEC84qUW803dfNQy15xLT7228w8sBiLzADrCESSVzmAfS
RESEND_API_KEY=re_your_api_key_from_step_1
RESEND_AUDIENCE_ID=aud_your_audience_id_from_step_1
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

#### Step 5: Deploy
Click **Deploy** and wait ~2 minutes for the build to complete.

Your site will be live at: `https://berry-bank-official.vercel.app`

---

### Part B: Migrate Domain from Firebase to Vercel

#### Step 1: Remove Domain from Firebase
1. Go to Firebase Console: https://console.firebase.google.com
2. Select your Berry Bank project
3. Navigate to **Hosting**
4. Click on **Custom domains**
5. Find `berrybank.app` and click **Delete** or **Remove**
6. Confirm removal

#### Step 2: Add Domain to Vercel
1. In your Vercel project dashboard, go to **Settings → Domains**
2. Enter your domain: `berrybank.app`
3. Click **Add**
4. Vercel will show you DNS records to add

#### Step 3: Update DNS Records in GoDaddy

1. **Log into GoDaddy:**
   - Go to https://www.godaddy.com
   - Click **Sign In** (top right)
   - Enter your credentials

2. **Navigate to DNS Management:**
   - Click your profile icon → **My Products**
   - Find `berrybank.app` and click **DNS**

3. **Update A Record (for root domain):**
   - Find the existing A record for `@` (root domain)
   - Click **Edit** (pencil icon)
   - Change the IP address to Vercel's IP: `76.76.21.21`
   - Set TTL to `600` seconds (or leave default)
   - Click **Save**

4. **Update CNAME Record for www (if you want www.berrybank.app):**
   - Find or add a CNAME record
   - Name: `www`
   - Value: `cname.vercel-dns.com`
   - TTL: `600` seconds
   - Click **Save**

5. **Add Vercel Verification Record (if required):**
   - Vercel might ask for a TXT record for verification
   - Add a new TXT record:
     - Name: `@`
     - Value: (copy from Vercel dashboard)
     - TTL: `600` seconds
   - Click **Save**

#### Step 4: Wait for DNS Propagation
- DNS changes can take 5 minutes to 48 hours (usually ~1 hour)
- Check status at: https://dnschecker.org
- Enter `berrybank.app` to see global propagation

#### Step 5: Verify in Vercel
1. Go back to Vercel project → **Settings → Domains**
2. Wait for the domain status to change to **Valid**
3. Vercel will automatically generate SSL certificate (HTTPS)

#### Step 6: Set Primary Domain (Optional)
If you want `berrybank.app` (without www) to be primary:
1. In Vercel domains settings
2. Click on `berrybank.app`
3. Set as **Primary Domain**
4. www.berrybank.app will redirect to berrybank.app

---

### Part C: Resend Domain DNS (for sending emails from @berrybank.app)

**After your domain is pointing to Vercel**, add these DNS records in GoDaddy for Resend:

1. Go to GoDaddy DNS Management for `berrybank.app`
2. Add the records shown in your Resend dashboard:

**Typical Resend DNS Records:**
- **TXT Record** (for domain verification)
  - Name: `@` or `resend._domainkey`
  - Value: (copy from Resend dashboard)

- **MX Record** (for receiving bounces)
  - Name: `@`
  - Value: `feedback-smtp.us-east-1.amazonses.com`
  - Priority: `10`

- **DKIM Records** (for email authentication)
  - Name: `resend._domainkey`
  - Value: (long string from Resend)

- **SPF Record** (add to existing TXT record or create new)
  - Name: `@`
  - Value: `v=spf1 include:amazonses.com ~all`

3. Click **Save** after adding each record
4. Wait 5-10 minutes
5. Go to Resend dashboard → **Domains** → Click **Verify Domain**

---

## ✅ Final Checklist

### Before Going Live:
- [ ] Resend API key added to Vercel environment variables
- [ ] Domain verified in Resend (for sending emails)
- [ ] Domain pointed to Vercel (A record: 76.76.21.21)
- [ ] SSL certificate active (HTTPS working)
- [ ] Newsletter signup tested and working
- [ ] All environment variables set in Vercel
- [ ] Sanity Studio accessible at berrybank.app/studio
- [ ] Run final build locally: `npm run build`
- [ ] Test all pages after deployment

### Testing Checklist:
1. Homepage loads correctly
2. Navigation works (all links)
3. Newsletter signup works and sends email
4. Mobile responsive (test on phone)
5. Sanity Studio login works
6. Shop/cart functionality works
7. All images loading
8. No console errors

---

## 🆘 Troubleshooting

### Domain Not Working
- **DNS not propagated:** Wait 1-2 hours, check dnschecker.org
- **Wrong DNS records:** Double-check GoDaddy A record is `76.76.21.21`
- **Vercel showing error:** Make sure domain is verified in Vercel dashboard

### Newsletter Not Sending
- **API key missing:** Check Vercel environment variables
- **Domain not verified:** Verify domain in Resend dashboard
- **Email going to spam:** Add all DKIM/SPF records in GoDaddy DNS

### Build Failing on Vercel
- **Environment variables:** Ensure all env vars are set
- **Build command:** Should be `npm run build`
- **Check logs:** Click on failed deployment to see error details

---

## 📞 Support Resources

- **Vercel Docs:** https://vercel.com/docs
- **Resend Docs:** https://resend.com/docs
- **GoDaddy DNS Help:** https://www.godaddy.com/help/manage-dns-680
- **DNS Checker:** https://dnschecker.org

---

## 🎉 Next Steps After Deployment

1. **Monitor Analytics:** Add Vercel Analytics
2. **Set Up Monitoring:** Use Vercel Monitoring for errors
3. **Custom Email Templates:** Update Resend email templates as needed
4. **Add More Audiences:** Create segments in Resend
5. **Set Up Stripe Webhooks:** Point to berrybank.app/api/webhooks/stripe
6. **SEO Optimization:** Submit sitemap to Google Search Console

---

Need help with any of these steps? Just ask!
