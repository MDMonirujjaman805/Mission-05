import { prismaAdapter } from "better-auth/adapters/prisma";
import { betterAuth } from "better-auth";
import { prisma } from "./prisma.js";
import nodemailer from "nodemailer";

const isCLI = process.env.BETTER_AUTH_CLI === "true";

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  //   trustedOrigins: [
  //     "http://example.com",
  //     "http://app.example.com",
  //     "http://localhost:3000",
  //     "*.example.com",
  //     "https:*.example.com",
  //     "http:*.dev.example.com",
  //   ],

  trustedOrigins: [process.env.APP_URL!],

  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "USER",
        required: false,
      },
      phone: {
        type: "string",
        required: false,
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    autoSignIn: false,
  },

  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      // console.log({ user }, { url }, { token });
      try {
        const verificationURL = `${process.env.APP_URL}/verify-email?token=${token}`;
        const info = await transporter.sendMail({
          from: '"Prisma Blog" <prismablog@gmail.com>',
          to: user.email,
          subject: "Please Verify Your Email !!!",
          html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verify Your Email</title>
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      background-color: #f4f6f8;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
        Roboto, Helvetica, Arial, sans-serif;
    "
  >
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding: 40px 0">
          <table
            width="100%"
            max-width="600"
            cellpadding="0"
            cellspacing="0"
            style="
              background-color: #ffffff;
              border-radius: 10px;
              box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
              overflow: hidden;
            "
          >
            <!-- Header -->
            <tr>
              <td
                style="
                  background-color: #4f46e5;
                  padding: 24px;
                  text-align: center;
                  color: #ffffff;
                  font-size: 22px;
                  font-weight: 600;
                "
              >
                Prisma Blog
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding: 32px">
                <h2 style="margin-top: 0; color: #111827">
                 Hello ${user.name} Verify your email address 👋
                </h2>

                <p style="color: #374151; font-size: 15px; line-height: 1.6">
                  Thanks for signing up for <strong>Prisma Blog</strong>.
                  Please confirm your email address by clicking the button
                  below.
                </p>

                <div style="text-align: center; margin: 32px 0">
                  <a
                    href="${verificationURL}"
                    target="_blank"
                    style="
                      background-color: #4f46e5;
                      color: #ffffff;
                      text-decoration: none;
                      padding: 14px 28px;
                      border-radius: 8px;
                      font-weight: 600;
                      display: inline-block;
                    "
                  >
                    Verify Email
                  </a>
                </div>

                <p style="color: #6b7280; font-size: 14px">
                  If the button doesn’t work, copy and paste this link into
                  your browser:
                </p>

                <p
                  style="
                    word-break: break-all;
                    color: #4f46e5;
                    font-size: 14px;
                  "
                >
                  ${url}
                </p>

                <p
                  style="
                    color: #6b7280;
                    font-size: 14px;
                    margin-top: 24px;
                  "
                >
                  This link will expire soon. If you didn’t create an
                  account, you can safely ignore this email.
                </p>

                <p style="color: #111827; font-size: 14px">
                  — Prisma Blog Team
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td
                style="
                  background-color: #f9fafb;
                  padding: 16px;
                  text-align: center;
                  font-size: 12px;
                  color: #9ca3af;
                "
              >
                © 2025 Prisma Blog. All rights reserved.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`,
        });
        console.log("Message sent:", info.messageId);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    // socialProviders: {
    //   github: {
    //     clientId: process.env.GITHUB_CLIENT_ID as string,
    //     clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    //   },
    // },
  },
  // Sign In with Google
  baseURL: process.env.BETTER_AUTH_URL,
  socialProviders: {
    google: {
      accessType: "offline",
      prompt: "select_account consent",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
