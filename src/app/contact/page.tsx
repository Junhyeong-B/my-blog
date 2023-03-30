import EmailForm from '@/components/EmailForm';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import { SiNotion } from 'react-icons/si';

export default function ContactPage() {
  return (
    <section className="flex flex-col items-center gap-2">
      <h2 className="text-2xl font-bold">Contact Me</h2>
      <p>apparatus1@naver.com</p>
      <div className="flex items-center gap-4">
        <a target="_blank" href="https://bit.ly/3lp2Lib">
          <AiFillGithub size={38} />
        </a>
        <a target="_blank" href="https://bit.ly/3TmhMOe">
          <AiFillLinkedin size={40} />
        </a>
        <a target="_blank" href="https://bit.ly/3JBr98h">
          <SiNotion size={34} />
        </a>
      </div>
      <h2 className="text-2xl font-bold">Or Send me an email</h2>
      <EmailForm />
    </section>
  );
}
