import Image from 'next/image';
import profileImage from '@public/images/profile.jpg';

export default function AboutPage() {
  return (
    <section>
      <section className="mb-4 flex w-full flex-col items-center justify-center gap-1 px-12">
        <Image
          src={profileImage}
          alt="profile"
          className="rounded-md"
          width={150}
          height={200}
        />
        <h3 className="text-center text-lg font-bold sm:text-xl">
          2년차 프론트엔드 개발자 배준형입니다.
        </h3>
        <p className="text-center text-sm text-gray-600">
          Suspense, ErrorBoundary, Lazy Loading과 같은 React 최신기술과
          NextJS에서의 SSG, ISR, SSR에 관심이 있으며,
          <br />
          라이브러리에 의존하지 않은 직접 구현을 즐깁니다.
        </p>
      </section>
      <section className="mx-4 grid gap-4 rounded-md bg-gray-200 p-8 shadow-sm">
        <div className="flex flex-col items-center justify-center gap-1">
          <h4 className="text-2xl font-bold">Who am I?</h4>
          <p>Frontend Developer</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <h4 className="text-2xl font-bold">Career</h4>
          <p>스트리미 | 프로덕트실 프론트엔드 개발자 | 2022-04 ~</p>
          <p>삼성전자 | Foundry 사업부 설비 엔지니어 | 2020-03 ~ 2021-07</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <h4 className="text-2xl font-bold">Skills</h4>
          <p>React, Next JS, Typescript</p>
          <p>D3.js, Tailwind, Storybook</p>
          <p>Jest, Github Actions</p>
        </div>
      </section>
    </section>
  );
}
