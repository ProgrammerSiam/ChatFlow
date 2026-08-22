'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import BadgePill from '@/shared/BadgePill';
import { Bot } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

export default function AiModelsPricingSection() {
  const { isAuthenticated } = useAuthStore();
  const id = React.useId().replace(/:/g, '_');

  return (
    <section
      className="relative px-4 py-16 sm:py-20 md:py-28 overflow-hidden"
      aria-labelledby="unlock-models-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 dark:border-zinc-800/80 bg-slate-50/70 dark:bg-zinc-950/60 p-6 sm:p-12 lg:p-16 backdrop-blur-xl shadow-xl">
          {/* Top Pill & Headline */}
          <div className="relative z-10 mx-auto mb-10 flex max-w-2xl flex-col items-center gap-4 text-center sm:mb-14">
            <BadgePill icon={<Bot className="size-3 text-purple-600 dark:text-purple-400" />} label="Frontier AI Ecosystem" />

            <h2
              id="unlock-models-heading"
              className="text-slate-900 dark:text-white text-3xl sm:text-4xl md:text-[42px] font-medium tracking-[-1px] leading-[1.15]"
            >
              All the Top AI Models, One Subscription - Save 90%
            </h2>

            <p className="text-slate-500 dark:text-slate-400 max-w-xl text-sm sm:text-base leading-relaxed">
              Skip a dozen AI subscriptions. Every frontier model lives in one workspace — pick the right one for the job, switch anytime, and save over 90% versus paying for each.
            </p>

            <div className="pt-2">
              <Link
                href={isAuthenticated ? '/chat' : '/login'}
                className="inline-flex items-center justify-center font-medium transition-all duration-200 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 h-11 rounded-full px-6 text-sm shadow-md hover:scale-105 active:scale-95"
              >
                Grab The Deal
              </Link>
            </div>
          </div>

          {/* AI Models Grid & Circuit Connector */}
          <div className="relative z-10 flex flex-col items-center gap-0">
            {/* Grid of Models */}
            <div className="grid w-full max-w-4xl grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {/* ChatGPT */}
              <div className="bg-white dark:bg-zinc-900/90 border border-slate-200/80 dark:border-zinc-800 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-2xs transition-all duration-300 hover:scale-105">
                <div className="flex size-8 shrink-0 items-center justify-center text-slate-900 dark:text-white">
                  <svg width="20" height="20" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M14.8892 7.15035C15.2274 6.13523 15.111 5.0232 14.5701 4.09986C13.7567 2.68362 12.1215 1.95501 10.5245 2.29789C9.81408 1.49753 8.79336 1.04238 7.72327 1.0489C6.09087 1.04517 4.64249 2.09617 4.14029 3.64936C3.09162 3.86413 2.18644 4.52053 1.65675 5.45087C0.837293 6.86338 1.02411 8.64392 2.11889 9.85517C1.78067 10.8703 1.89714 11.9823 2.43801 12.9057C3.25141 14.3219 4.8866 15.0505 6.4836 14.7076C7.19358 15.508 8.21476 15.9631 9.28485 15.9562C10.9182 15.9604 12.367 14.9084 12.8692 13.3538C13.9179 13.1391 14.8231 12.4827 15.3528 11.5523C16.1713 10.1398 15.984 8.36067 14.8897 7.14942L14.8892 7.15035ZM9.28578 14.982C8.63217 14.983 7.99906 14.7542 7.49732 14.3354C7.52015 14.3233 7.55975 14.3014 7.58537 14.2856L10.5539 12.5712C10.7057 12.485 10.7989 12.3233 10.798 12.1486V7.96375L12.0526 8.68818C12.0661 8.6947 12.0749 8.70774 12.0768 8.72265V12.1882C12.0749 13.7293 10.8269 14.9788 9.28578 14.982ZM3.28356 12.4184C2.95605 11.8528 2.83819 11.1899 2.95046 10.5465C2.97236 10.5596 3.01103 10.5833 3.03851 10.5992L6.00701 12.3135C6.15749 12.4016 6.34384 12.4016 6.49478 12.3135L10.1188 10.2209V11.6697C10.1197 11.6846 10.1127 11.6991 10.1011 11.7084L7.1004 13.4409C5.76383 14.2106 4.05643 13.7531 3.28356 12.4184ZM2.5023 5.93863C2.82841 5.37214 3.34319 4.93888 3.95627 4.71387C3.95627 4.73949 3.95487 4.78468 3.95487 4.81636V8.2456C3.95394 8.41984 4.04711 8.58149 4.19852 8.66768L7.8225 10.7599L6.56792 11.4843C6.55534 11.4927 6.5395 11.4941 6.52552 11.488L3.52441 9.75408C2.19064 8.98167 1.73362 7.27474 2.5023 5.93863ZM12.8101 8.33738L9.18609 6.24471L10.4407 5.52075C10.4532 5.51236 10.4691 5.51097 10.4831 5.51702L13.4842 7.24958C14.8203 8.02152 15.2782 9.73079 14.5063 11.0669C14.1797 11.6325 13.6654 12.0657 13.0528 12.2912V8.75945C13.0542 8.58522 12.961 8.42403 12.8101 8.33738ZM14.0586 6.45807C14.0367 6.44456 13.998 6.42127 13.9705 6.40543L11.002 4.69104C10.8516 4.60299 10.6652 4.60299 10.5143 4.69104L6.8903 6.78371V5.33487C6.88937 5.31996 6.89635 5.30552 6.908 5.2962L9.90865 3.56504C11.2452 2.79403 12.954 3.25291 13.7246 4.58995C14.0502 5.15458 14.1681 5.81564 14.0586 6.45807H14.0586ZM6.20827 9.04037L4.95322 8.31595C4.93971 8.30943 4.93086 8.29638 4.929 8.28148V4.81589C4.92993 3.27294 6.18171 2.02256 7.72466 2.02349C8.37734 2.02349 9.00906 2.2527 9.5108 2.67011C9.48797 2.68223 9.44884 2.70412 9.42275 2.71996L6.45425 4.43435C6.30237 4.52053 6.2092 4.68173 6.21013 4.85642L6.20827 9.03944V9.04037ZM6.88983 7.57103L8.50406 6.63883L10.1183 7.57056V9.43449L8.50406 10.3662L6.88983 9.43449V7.57103Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-900 dark:text-white text-sm font-semibold">ChatGPT</span>
                  <span className="text-slate-500 dark:text-slate-400 text-xs">$20/Month</span>
                </div>
              </div>

              {/* Claude */}
              <div className="bg-white dark:bg-zinc-900/90 border border-slate-200/80 dark:border-zinc-800 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-2xs transition-all duration-300 hover:scale-105">
                <div className="flex size-8 shrink-0 items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M3.96931 10.9546L6.90516 9.3136L6.95428 9.17058L6.90516 9.09154H6.76158L6.27038 9.06143L4.59275 9.01626L3.13805 8.95604L1.72869 8.88077L1.37352 8.80549L1.04102 8.3689L1.07502 8.1506L1.37352 7.95112L1.80048 7.98876L2.74509 8.05274L4.16201 8.1506L5.18975 8.21082L6.71246 8.3689H6.95428L6.98829 8.27104L6.90516 8.21082L6.84093 8.1506L5.37489 7.16074L3.78794 6.11442L2.95669 5.51222L2.50705 5.20736L2.28035 4.92131L2.18211 4.29653L2.59018 3.84865L3.13805 3.88628L3.27785 3.92392L3.83329 4.34922L5.01972 5.26381L6.56888 6.40046L6.79559 6.58865L6.88627 6.52467L6.8976 6.4795L6.79559 6.31013L5.95299 4.79334L5.05372 3.25021L4.65321 2.61037L4.54741 2.22647C4.50963 2.0684 4.48318 1.93666 4.48318 1.77482L4.94793 1.14628L5.20486 1.06348L5.82453 1.14628L6.08524 1.3721L6.47064 2.24906L7.09408 3.63035L8.06136 5.50845L8.34475 6.06549L8.49588 6.58112L8.55256 6.7392H8.6508V6.64887L8.73015 5.59126L8.87751 4.29277L9.02109 2.62167L9.07021 2.1512L9.30447 1.58664L9.76922 1.28177L10.132 1.45491L10.4304 1.88021L10.3889 2.15496L10.2113 3.3029L9.86368 5.10197L9.63698 6.30637H9.76922L9.92036 6.15582L10.5325 5.34661L11.5602 4.06694L12.0136 3.55884L12.5426 2.99804L12.8827 2.73081H13.525L13.9973 3.43087L13.7857 4.15351L13.1245 4.98906L12.5766 5.69664L11.7907 6.75049L11.2995 7.59357L11.3448 7.66131L11.462 7.65002L13.2378 7.27365L14.1976 7.10052L15.3424 6.9048L15.8601 7.14568L15.9167 7.39033L15.7127 7.8909L14.4885 8.192L13.0527 8.47805L10.9141 8.98239L10.8876 9.00121L10.9179 9.03884L11.8814 9.12917L12.2932 9.15176H13.3021L15.18 9.29102L15.6711 9.6147L15.9659 10.0099L15.9167 10.311L15.1611 10.6949L14.1409 10.454L11.7605 9.88945L10.9443 9.68621H10.831V9.75395L11.5111 10.4164L12.758 11.538L14.3185 12.9832L14.3978 13.3408L14.1976 13.6231L13.986 13.593L12.6144 12.5655L12.0854 12.1025L10.8876 11.0976H10.8083V11.203L11.0841 11.6057L12.5426 13.7887L12.6182 14.4586L12.5124 14.6769L12.1345 14.8087L11.7189 14.7334L10.865 13.5403L9.98459 12.1966L9.27424 10.9922L9.18734 11.0412L8.76793 15.5388L8.57145 15.7684L8.11804 15.9415L7.7402 15.6555L7.53994 15.1926L7.7402 14.278L7.98202 13.0849L8.1785 12.1364L8.35608 10.9584L8.46188 10.5669L8.45432 10.5406L8.36742 10.5519L7.47571 11.7713L6.11924 13.5967L5.04617 14.7409L4.78923 14.8425L4.34338 14.6129L4.38494 14.2027L4.63432 13.8376L6.11924 11.9557L7.01474 10.789L7.59284 10.1153L7.58906 10.0174H7.55505L3.61036 12.5692L2.90757 12.6596L2.60529 12.3773L2.64308 11.9143L2.78666 11.7638L3.97309 10.9508L3.96931 10.9546Z"
                      fill="#D97757"
                    />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-900 dark:text-white text-sm font-semibold">Claude</span>
                  <span className="text-slate-500 dark:text-slate-400 text-xs">$20/Month</span>
                </div>
              </div>

              {/* Gemini */}
              <div className="bg-white dark:bg-zinc-900/90 border border-slate-200/80 dark:border-zinc-800 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-2xs transition-all duration-300 hover:scale-105">
                <div className="flex size-8 shrink-0 items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8.49147 0.90918C8.65031 0.90918 8.78883 1.0178 8.82761 1.17197C8.94611 1.64351 9.10226 2.10478 9.29456 2.55133C9.79725 3.71929 10.487 4.74149 11.3628 5.61723C12.239 6.4932 13.261 7.18299 14.4287 7.68568C14.8753 7.87792 15.3367 8.03407 15.8083 8.15263C15.9624 8.19141 16.0708 8.3297 16.0708 8.48854C16.0708 8.64738 15.9624 8.7859 15.808 8.82468C15.3365 8.94318 14.8752 9.09933 14.4287 9.29163C13.2607 9.79432 12.2388 10.4841 11.3628 11.3599C10.487 12.2361 9.79725 13.258 9.29456 14.4257C9.10223 14.8724 8.94601 15.3337 8.82737 15.8053C8.8086 15.8803 8.76537 15.9468 8.70452 15.9943C8.64367 16.0419 8.5687 16.0678 8.49147 16.0679C8.33263 16.0679 8.19434 15.9595 8.15556 15.8051C8.03698 15.3336 7.88075 14.8723 7.68838 14.4257C7.18592 13.2578 6.49636 12.2358 5.62016 11.3599C4.74419 10.4841 3.72222 9.79432 2.55426 9.29163C2.10769 9.09932 1.64643 8.94309 1.1749 8.82444C1.09998 8.80573 1.03346 8.76254 0.985856 8.70174C0.938254 8.64094 0.912302 8.56599 0.912109 8.48877C0.912109 8.32993 1.02073 8.19164 1.1749 8.15287C1.64645 8.03429 2.10771 7.87806 2.55426 7.68568C3.72222 7.18323 4.74442 6.49343 5.62016 5.61746C6.49613 4.74172 7.18592 3.71953 7.68861 2.55157C7.88085 2.10499 8.037 1.64372 8.15556 1.1722C8.17425 1.09721 8.21745 1.0306 8.2783 0.982946C8.33915 0.935296 8.41418 0.909333 8.49147 0.90918Z"
                      fill={`url(#paint_gemini_${id})`}
                    />
                    <defs>
                      <linearGradient id={`paint_gemini_${id}`} x1="5.22" y1="11.05" x2="13.09" y2="4.41" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#4893FC" />
                        <stop offset="0.27" stopColor="#4893FC" />
                        <stop offset="0.777" stopColor="#969DFF" />
                        <stop offset="1" stopColor="#BD99FE" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-900 dark:text-white text-sm font-semibold">Gemini</span>
                  <span className="text-slate-500 dark:text-slate-400 text-xs">$20/Month</span>
                </div>
              </div>

              {/* Perplexity */}
              <div className="bg-white dark:bg-zinc-900/90 border border-slate-200/80 dark:border-zinc-800 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-2xs transition-all duration-300 hover:scale-105">
                <div className="flex size-8 shrink-0 items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.78573 1.06264L8.07299 4.96641V1.07163H8.90755V4.98388L13.214 1.06264V5.51352H14.9821V11.9335H13.2194V15.8968L8.90755 12.1529V15.9398H8.07299V12.2146L3.79059 15.9422V11.9335H2.02246V5.51352H3.78573V1.06264ZM7.44383 6.32822H2.85702V11.1188H3.78955V9.60766L7.44383 6.32822ZM4.62511 9.96915V14.1243L8.07299 11.1231V6.8742L4.62511 9.96915ZM8.93157 11.0834V6.87019L12.3804 9.96533V11.9335H12.3849V14.0818L8.93157 11.0834ZM13.2194 11.1188H14.1475V6.32822H9.59489L13.2194 9.57371V11.1188ZM12.3794 5.51352V2.93662L9.54939 5.51352H12.3794ZM7.45031 5.51352H4.6203V2.93662L7.45031 5.51352Z"
                      fill="#20808D"
                    />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-900 dark:text-white text-sm font-semibold">Perplexity</span>
                  <span className="text-slate-500 dark:text-slate-400 text-xs">$20/Month</span>
                </div>
              </div>

              {/* Grok */}
              <div className="bg-white dark:bg-zinc-900/90 border border-slate-200/80 dark:border-zinc-800 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-2xs transition-all duration-300 hover:scale-105">
                <div className="flex size-8 shrink-0 items-center justify-center text-slate-900 dark:text-white">
                  <svg width="20" height="20" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6.6924 10.6551L11.9766 6.77229C12.2357 6.58194 12.6059 6.65618 12.7294 6.95188C13.379 8.51121 13.0888 10.3852 11.7962 11.6718C10.5037 12.9584 8.70517 13.2406 7.06133 12.5979L5.26557 13.4255C7.84122 15.1779 10.9689 14.7446 12.9233 12.7978C14.4736 11.2546 14.9537 9.15114 14.5048 7.2543L14.5088 7.25833C13.8578 4.47176 14.6689 3.35794 16.3304 1.08034C16.3697 1.02633 16.409 0.97233 16.4484 0.916977L14.262 3.09332V3.08657L6.69106 10.6565"
                      fill="currentColor"
                    />
                    <path
                      d="M5.60194 11.5989C3.75326 9.84104 4.072 7.1206 5.64939 5.55184C6.8158 4.39075 8.72687 3.91687 10.3951 4.61352L12.1868 3.78996C11.8641 3.55775 11.4503 3.30798 10.9756 3.13247C8.82996 2.25356 6.26109 2.69099 4.51687 4.42585C2.83911 6.0959 2.3115 8.66377 3.21752 10.855C3.89432 12.4926 2.78485 13.651 1.66725 14.8202C1.2712 15.2346 0.8738 15.6491 0.553711 16.0879L5.60056 11.6002"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-900 dark:text-white text-sm font-semibold">Grok</span>
                  <span className="text-slate-500 dark:text-slate-400 text-xs">$30/Month</span>
                </div>
              </div>

              {/* Mistral */}
              <div className="bg-white dark:bg-zinc-900/90 border border-slate-200/80 dark:border-zinc-800 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-2xs transition-all duration-300 hover:scale-105">
                <div className="flex size-8 shrink-0 items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M13.9404 6.34262C13.9404 6.93234 13.9417 7.17358 13.9433 6.8787C13.9449 6.58386 13.9449 6.10138 13.9433 5.8065C13.9417 5.51166 13.9404 5.7529 13.9404 6.34262ZM7.41222 7.40945C7.40188 7.41609 6.6077 7.41994 5.22436 7.42005L3.05273 7.42021V8.49081V9.56138L4.95932 9.56645C6.91351 9.57164 10.8857 9.57206 12.8426 9.56733L13.9406 9.56466L13.9378 8.49245L13.935 7.42021H11.756C10.315 7.42021 9.57473 7.41658 9.57032 7.40945C9.56129 7.39488 7.43481 7.39488 7.41222 7.40945Z" fill="#FC8304" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M13.9405 8.48616C13.9405 9.07592 13.9418 9.31716 13.9434 9.02228C13.9451 8.72744 13.9451 8.24492 13.9434 7.95008C13.9418 7.6552 13.9405 7.89644 13.9405 8.48616ZM3.05549 10.6332L3.05825 11.7029L4.12922 11.7058C4.71822 11.7074 5.21111 11.7061 5.22455 11.7029L5.24894 11.697L5.24619 10.6331L5.24343 9.56916L4.14806 9.56642L3.05273 9.56367L3.05549 10.6332ZM7.3979 9.57096C7.38231 9.58652 7.3897 11.694 7.4054 11.707C7.41613 11.7158 7.71122 11.7184 8.50065 11.7164L9.58124 11.7136L9.584 10.6387L9.58675 9.56378H8.49594C7.89599 9.56378 7.40188 9.56703 7.3979 9.57096ZM11.7444 9.57725C11.7415 9.58465 11.7405 10.066 11.742 10.6468L11.7448 11.7029H12.8374H13.9299L13.9353 10.6333L13.9407 9.56378H12.8451C11.9786 9.56378 11.7484 9.56661 11.7444 9.57725Z" fill="#FC4C04" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M13.9404 4.19809C13.9404 4.78781 13.9417 5.02905 13.9433 4.73421C13.9449 4.43933 13.9449 3.95684 13.9433 3.66197C13.9417 3.36713 13.9404 3.60837 13.9404 4.19809ZM5.24335 5.26484C5.23891 5.27201 4.86761 5.27571 4.14469 5.27571H3.05273V6.34792V7.42013H5.22076C6.4132 7.42013 7.39652 7.41719 7.40594 7.4136C7.42336 7.40693 7.4337 5.316 7.41655 5.2714C7.40866 5.25095 5.25599 5.24447 5.24335 5.26484ZM9.57699 5.26877C9.5681 5.27949 9.56554 5.57063 9.56757 6.3491L9.57032 7.41475L11.7555 7.41745L13.9406 7.4202L13.9378 6.34796L13.935 5.27571H12.8432C12.127 5.27571 11.749 5.27201 11.7447 5.26492C11.7333 5.24661 9.59231 5.25042 9.57699 5.26877Z" fill="#FCB404" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M3.05273 4.20412V5.27636L4.14802 5.27362L5.24331 5.27087L5.24607 4.20137L5.24883 3.13184H4.15078H3.05273V4.20412ZM11.7419 4.20137L11.7447 5.27087L12.8426 5.27362L13.9406 5.27636L13.9378 4.20412L13.935 3.13184H12.8371H11.7392L11.7419 4.20137ZM9.5593 6.34312C9.5593 6.92688 9.5606 7.16572 9.56221 6.87382C9.56382 6.58192 9.56382 6.10427 9.56221 5.81237C9.5606 5.52051 9.5593 5.75931 9.5593 6.34312Z" fill="#FCDB04" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M13.9385 10.6364L13.9332 11.7032L11.7713 11.6992C10.0222 11.696 9.60454 11.6979 9.58348 11.7091L9.55744 11.723V12.7859C9.55744 13.5982 9.5605 13.8518 9.57042 13.8616C9.58045 13.8717 10.3233 13.8746 12.8481 13.8746H16.1129V12.7862V11.6978H15.0312H13.9495L13.9467 10.6337L13.9439 9.56954L13.9385 10.6364ZM0.892578 12.788V13.8746L4.15677 13.8719L7.42097 13.8692L7.42373 12.7981C7.42553 12.1034 7.42273 11.7226 7.4158 11.7143C7.40753 11.7044 6.65646 11.7014 4.14885 11.7014H0.892578V12.788Z" fill="#E40404" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-900 dark:text-white text-sm font-semibold">Mistral</span>
                  <span className="text-slate-500 dark:text-slate-400 text-xs">$15/Month</span>
                </div>
              </div>

              {/* DeepSeek */}
              <div className="bg-white dark:bg-zinc-900/90 border border-slate-200/80 dark:border-zinc-800 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-2xs transition-all duration-300 hover:scale-105">
                <div className="flex size-8 shrink-0 items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M16.0717 3.70022C15.9077 3.61922 15.8372 3.77375 15.7412 3.85226C15.7088 3.87801 15.6809 3.91166 15.6535 3.94115C15.4136 4.20119 15.134 4.3715 14.769 4.35073C14.2344 4.32124 13.7784 4.49114 13.3753 4.90612C13.2896 4.39476 13.0047 4.08945 12.5717 3.89338C12.3445 3.79161 12.1153 3.68984 11.957 3.46843C11.8459 3.31141 11.816 3.13611 11.7598 2.96331C11.725 2.85904 11.6893 2.75187 11.5712 2.73401C11.4429 2.71324 11.3924 2.8229 11.3424 2.91429C11.1403 3.28773 11.0628 3.70022 11.0697 4.11769C11.0874 5.05566 11.4785 5.80255 12.2543 6.33467C12.3429 6.39532 12.3654 6.45721 12.3376 6.54611C12.2847 6.72888 12.2219 6.90667 12.1657 7.08986C12.1309 7.207 12.078 7.23276 11.9546 7.18125C11.5286 7.00097 11.1604 6.73428 10.8356 6.41069C10.2837 5.86984 9.78471 5.27208 9.16228 4.80435C9.0159 4.69468 8.87034 4.59291 8.71904 4.49654C8.0839 3.87053 8.80227 3.35627 8.96834 3.29604C9.1426 3.2329 9.02861 3.01398 8.46687 3.01648C7.90554 3.01897 7.39095 3.20964 6.73613 3.46344C6.64018 3.50208 6.53973 3.53032 6.43599 3.55234C5.84145 3.43894 5.22435 3.41318 4.57896 3.48671C3.36446 3.62462 2.39432 4.20701 1.68087 5.20147C0.824319 6.39532 0.622585 7.75284 0.869423 9.17017C1.12897 10.6619 1.87974 11.8985 3.03438 12.8647C4.23085 13.8658 5.60937 14.3564 7.18183 14.2625C8.13679 14.2073 9.20041 14.0773 10.3998 13.0479C10.7024 13.1999 11.0197 13.2606 11.5466 13.3067C11.9521 13.3453 12.3425 13.2859 12.6451 13.2228C13.1187 13.121 13.0859 12.6765 12.9149 12.5943C11.5261 11.9388 11.8308 12.2055 11.5536 11.9903C12.2592 11.1425 13.3229 10.2627 13.739 7.41304C13.7714 7.18623 13.7435 7.04458 13.739 6.86056C13.7366 6.74965 13.7612 6.70604 13.8871 6.69316C14.2348 6.65328 14.5726 6.55649 14.8826 6.38286C15.7822 5.88438 16.1447 5.06646 16.2304 4.08446C16.2431 3.93492 16.2279 3.77915 16.0721 3.70064L16.0717 3.70022Z"
                      fill="#4D6BFE"
                    />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-900 dark:text-white text-sm font-semibold">DeepSeek</span>
                  <span className="text-slate-500 dark:text-slate-400 text-xs">V3 / R1 Included</span>
                </div>
              </div>

              {/* Meta Llama */}
              <div className="bg-white dark:bg-zinc-900/90 border border-slate-200/80 dark:border-zinc-800 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-2xs transition-all duration-300 hover:scale-105">
                <div className="flex size-8 shrink-0 items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M2.25225 10.2094C2.25225 10.836 2.38586 11.317 2.5605 11.608C2.78946 11.9892 3.13098 12.1507 3.47914 12.1507C3.92821 12.1507 4.33902 12.036 5.13071 10.909C5.76495 10.0057 6.51228 8.73783 7.01512 7.94297L7.86669 6.59632C8.45823 5.66108 9.14292 4.62143 9.92796 3.91672C10.5688 3.34154 11.2602 3.022 11.956 3.022C13.1241 3.022 14.2368 3.71871 15.0883 5.02542C16.0203 6.45652 16.4727 8.25909 16.4727 10.1193C16.4727 11.2251 16.2609 12.0377 15.9005 12.6796C15.5524 13.3005 14.8738 13.9207 13.7323 13.9207V12.1507C14.7097 12.1507 14.9536 11.2263 14.9536 10.1684C14.9536 8.6608 14.6121 6.98776 13.8598 5.79232C13.3259 4.94439 12.634 4.42628 11.8728 4.42628C11.0495 4.42628 10.387 5.06536 9.64244 6.20488C9.24659 6.8103 8.84022 7.5481 8.38394 8.38063L7.88166 9.29646C6.87264 11.1378 6.61706 11.5572 6.11256 12.2494C5.22828 13.4614 4.47319 13.9207 3.47914 13.9207C2.29993 13.9207 1.55426 13.3952 1.09244 12.6032C0.715444 11.9578 0.530273 11.111 0.530273 10.1461L2.25225 10.2094Z"
                      fill="#0081FB"
                    />
                    <path
                      d="M1.8877 5.15062C2.67716 3.89812 3.81646 3.02223 5.12319 3.02223C5.87995 3.02223 6.63228 3.25276 7.41786 3.91296C8.27719 4.63478 9.19306 5.82337 10.3357 7.78229L10.7454 8.48528C11.7344 10.1811 12.2972 11.0536 12.6265 11.465C13.05 11.9934 13.3466 12.1509 13.732 12.1509C14.7094 12.1509 14.9533 11.2265 14.9533 10.1686L16.4724 10.1195C16.4724 11.2254 16.2606 12.0379 15.9002 12.6799C15.5521 13.3007 14.8735 13.9209 13.732 13.9209C13.0223 13.9209 12.3936 13.7623 11.6984 13.0873C11.164 12.5692 10.5392 11.6488 10.0585 10.8214L8.62868 8.36317C7.91128 7.1295 7.25321 6.20968 6.87233 5.79313C6.46263 5.3452 5.93595 4.80425 5.09547 4.80425C4.41522 4.80425 3.83753 5.29555 3.35409 6.04705L1.8877 5.15062Z"
                      fill="#0082FB"
                    />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-900 dark:text-white text-sm font-semibold">Llama 3.3</span>
                  <span className="text-slate-500 dark:text-slate-400 text-xs">70B / 405B Free</span>
                </div>
              </div>
            </div>

            {/* Connecting Circuit Flow SVG */}
            <div className="relative z-30 text-white w-full max-w-[520px] flex justify-center mb-0.5 pt-0 select-none pointer-events-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
              <svg width="520" height="106" viewBox="0 0 520 106" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto overflow-visible">
                <path d="M259.619 105.909L263.949 98.4087H255.289L259.619 105.909ZM0.75 0H0V49.7207H0.75H1.5V0H0.75ZM21.75 70.7207V71.4707H238.619V70.7207V69.9707H21.75V70.7207ZM259.619 91.7207H258.869V99.1587H259.619H260.369V91.7207H259.619ZM238.619 70.7207V71.4707C249.803 71.4707 258.869 80.5369 258.869 91.7207H259.619H260.369C260.369 79.7085 250.631 69.9707 238.619 69.9707V70.7207ZM0.75 49.7207H0C0 61.7329 9.73781 71.4707 21.75 71.4707V70.7207V69.9707C10.5662 69.9707 1.5 60.9045 1.5 49.7207H0.75Z" fill="currentColor" />
                <path d="M259.619 105.909L255.289 98.4087H263.949L259.619 105.909ZM518.488 0H519.238V49.7207H518.488H517.738V0H518.488ZM497.488 70.7207V71.4707H280.619V70.7207V69.9707H497.488V70.7207ZM259.619 91.7207H260.369V99.1587H259.619H258.869V91.7207H259.619ZM280.619 70.7207V71.4707C269.435 71.4707 260.369 80.5369 260.369 91.7207H259.619H258.869C258.869 79.7085 268.607 69.9707 280.619 69.9707V70.7207ZM518.488 49.7207H519.238C519.238 61.7329 509.5 71.4707 497.488 71.4707V70.7207V69.9707C508.671 69.9707 517.738 60.9045 517.738 49.7207H518.488Z" fill="currentColor" />
                <path d="M259.619 105.908L263.949 98.4085H255.289L259.619 105.908ZM169.149 0.654297H168.399V49.5805H169.149H169.899V0.654297H169.149ZM190.149 70.5805V71.3305H238.619V70.5805V69.8305H190.149V70.5805ZM259.619 91.5805H258.869V99.1585H259.619H260.369V91.5805H259.619ZM238.619 70.5805V71.3305C249.803 71.3305 258.869 80.3968 258.869 91.5805H259.619H260.369C260.369 79.5683 250.631 69.8305 238.619 69.8305V70.5805ZM169.149 49.5805H168.399C168.399 61.5927 178.137 71.3305 190.149 71.3305V70.5805V69.8305C178.965 69.8305 169.899 60.7643 169.899 49.5805H169.149Z" fill="currentColor" />
                <path d="M259.619 105.908L255.289 98.4085H263.949L259.619 105.908ZM350.089 0.654297H350.839V49.5805H350.089H349.339V0.654297H350.089ZM329.089 70.5805V71.3305H280.619V70.5805V69.8305H329.089V70.5805ZM259.619 91.5805H260.369V99.1585H259.619H258.869V91.5805H259.619ZM280.619 70.5805V71.3305C269.435 71.3305 260.369 80.3968 260.369 91.5805H259.619H258.869C258.869 79.5683 268.607 69.8305 280.619 69.8305V70.5805ZM350.089 49.5805H350.839C350.839 61.5927 341.101 71.3305 329.089 71.3305V70.5805V69.8305C340.272 69.8305 349.339 60.7643 349.339 49.5805H350.089Z" fill="currentColor" />
              </svg>
            </div>

            {/* Central Unified ChatFlow Tier Card with Action CTA */}
            <div className="relative z-20">
              <div className="border border-slate-200/80 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 rounded-[24px] flex flex-col sm:flex-row items-center gap-4 border-2 px-5 py-4 shadow-[0px_20px_50px_rgba(114,92,255,0.15)] dark:shadow-[0px_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                {/* Glowing Iridescent App Icon */}
                <div className="relative size-14 sm:size-16 shrink-0 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-lg shadow-purple-500/20">
                  <div className="h-full w-full rounded-[14px] bg-white dark:bg-zinc-950 flex items-center justify-center">
                    <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                      ⚡
                    </div>
                  </div>
                </div>

                {/* Price & Action Button */}
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                  <p className="text-slate-900 dark:text-white leading-none">
                    <span className="text-3xl sm:text-4xl font-semibold tracking-[-1px]">$12</span>
                    <span className="text-sm font-normal text-slate-500 dark:text-slate-400">/month</span>
                  </p>

                  <Link
                    href={isAuthenticated ? '/chat' : '/login'}
                    className="mt-2 inline-flex items-center gap-2 text-xs font-semibold rounded-full px-3.5 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <span>Grab The Deal</span>
                    <span className="text-[10px] bg-white/25 px-1.5 py-0.5 rounded-full font-medium">Save $113/mo</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Top Right Ambient Glow Effect */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 h-72 w-80 -rotate-40 rounded-full blur-[50px] opacity-75 dark:opacity-40"
            style={{
              background:
                'linear-gradient(169deg, #C9C1FF 29.61%, #725CFF 93.52%)',
            }}
          />

          {/* Bottom Ambient Radial Glow Graphic */}
          <div className="absolute inset-x-0 bottom-0 pointer-events-none select-none flex justify-center overflow-hidden">
            <Image
              src="/assets/hero-radial-glow.png"
              alt="Hero Radial Glow"
              width={2400}
              height={1000}
              className="w-full h-auto object-cover opacity-85 dark:opacity-60"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
