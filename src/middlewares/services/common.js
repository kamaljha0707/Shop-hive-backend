import nodemailer  from "nodemailer"

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.MAIL,
      pass: process.env.MAIL_PASSWORD,
    },
  });

 const sendMail = async function ({to, subject, text, html}){
    try {
        let info = await transporter.sendMail({
            from: '"E-commerce" <process.env.MAIL>', // sender address
            to,
            subject,
            text,
            html
          });
          console.log('from common js', info);
        return info;  
    } catch (error) {
        console.log(error.message);
    }
}

export default sendMail