import Email from "../../emails/emali";
import { Resend } from "resend";
const resend = new Resend(process.env.REACT_APP_Email);

export default async function POST() {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: process.env.REACT_APP_PersonalEmail,
    subject: "subject",
    react: Email(),
  });
}
