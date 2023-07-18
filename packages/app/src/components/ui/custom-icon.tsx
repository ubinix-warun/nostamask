import cn from 'clsx';

type IconName = keyof typeof Icons;

type IconProps = {
  className?: string;
};

type CustomIconProps = IconProps & {
  iconName: IconName;
};

const Icons = {
  PinIcon,
  AppleIcon,
  PinOffIcon,
  GoogleIcon,
  TwitterIcon,
  FeatherIcon,
  SpinnerIcon,
  TriangleIcon,
  FlaskFox,
  SnapLogo,
  MetamaskFox,
};

export function CustomIcon({
  iconName,
  className
}: CustomIconProps): JSX.Element {
  const Icon = Icons[iconName];

  return <Icon className={className ?? 'h-6 w-6'} />;
}

function TwitterIcon({ className }: IconProps): JSX.Element {
  return (
    <svg className={cn('fill-current', className)} viewBox='0 0 24 24'>
      <g>
        <path d='M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z' />
      </g>
    </svg>
  );
}

function FeatherIcon({ className }: IconProps): JSX.Element {
  return (
    <svg
      className={cn('fill-current', className)}
      viewBox='0 0 24 24'
      aria-hidden='true'
    >
      <g>
        <path d='M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z' />
      </g>
    </svg>
  );
}

function SpinnerIcon({ className }: IconProps): JSX.Element {
  return (
    <svg
      className={cn('animate-spin', className)}
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
    >
      <circle
        className='opacity-25'
        cx='12'
        cy='12'
        r='10'
        stroke='currentColor'
        strokeWidth='4'
      />
      <path
        className='opacity-75'
        fill='currentColor'
        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
      />
    </svg>
  );
}

function GoogleIcon({ className }: IconProps): JSX.Element {
  return (
    <svg
      className={className}
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 48 48'
    >
      <g>
        <path
          fill='#EA4335'
          d='M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z'
        />
        <path
          fill='#4285F4'
          d='M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z'
        />
        <path
          fill='#FBBC05'
          d='M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z'
        />
        <path
          fill='#34A853'
          d='M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z'
        />
        <path fill='none' d='M0 0h48v48H0z' />
      </g>
    </svg>
  );
}

function AppleIcon({ className }: IconProps): JSX.Element {
  return (
    <svg className={className} viewBox='0 0 24 24'>
      <g>
        <path d='M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z' />
      </g>
    </svg>
  );
}

function TriangleIcon({ className }: IconProps): JSX.Element {
  return (
    <svg className={className} viewBox='0 0 24 24' aria-hidden='true'>
      <g>
        <path d='M12.538 6.478c-.14-.146-.335-.228-.538-.228s-.396.082-.538.228l-9.252 9.53c-.21.217-.27.538-.152.815.117.277.39.458.69.458h18.5c.302 0 .573-.18.69-.457.118-.277.058-.598-.152-.814l-9.248-9.532z' />
      </g>
    </svg>
  );
}

function PinIcon({ className }: IconProps): JSX.Element {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      strokeWidth='2'
      stroke='currentColor'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M15 4.5l-4 4l-4 1.5l-1.5 1.5l7 7l1.5 -1.5l1.5 -4l4 -4' />
      <line x1='9' y1='15' x2='4.5' y2='19.5' />
      <line x1='14.5' y1='4' x2='20' y2='9.5' />
    </svg>
  );
}

function PinOffIcon({ className }: IconProps): JSX.Element {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      strokeWidth='2'
      stroke='currentColor'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <line x1='3' y1='3' x2='21' y2='21' />
      <path d='M15 4.5l-3.249 3.249m-2.57 1.433l-2.181 .818l-1.5 1.5l7 7l1.5 -1.5l.82 -2.186m1.43 -2.563l3.25 -3.251' />
      <line x1='9' y1='15' x2='4.5' y2='19.5' />
      <line x1='14.5' y1='4' x2='20' y2='9.5' />
    </svg>
  );
}


function FlaskFox({ className }: IconProps): JSX.Element {
  return (
    <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.7263 9.8073L12.0438 5.43543L13.339 2.32193H7.79883L9.09409 5.43543L9.41153 9.8073L9.51117 11.1859L9.51812 14.5793H11.6174L11.6244 11.1859L11.7263 9.8073Z" fill="url(#paint0_linear_205_1983)"/>
      <path d="M18.7542 8.96532L14.7896 7.80643L15.9875 9.61763L14.1987 13.1036L16.5645 13.0735H20.0819L18.7542 8.96532Z" fill="url(#paint1_linear_205_1983)"/>
      <path d="M6.35065 7.80643L2.38609 8.96532L1.06766 13.0735H4.58502L6.94383 13.1036L5.15503 9.61763L6.35065 7.80643Z" fill="url(#paint2_linear_205_1983)"/>
      <path d="M12.1203 11.9979L11.6198 14.5817L11.9836 14.8315L14.1964 13.1035L14.2636 11.3687L12.1203 11.9979Z" fill="url(#paint3_linear_205_1983)"/>
      <path d="M6.88132 11.3687L6.94156 13.1035L9.15439 14.8315L9.51818 14.5817L9.01768 11.9979L6.88132 11.3687Z" fill="url(#paint4_linear_205_1983)"/>
      <path d="M19.5952 5.98827L20.2324 2.89559L19.2778 0.0249634L11.9836 5.43543L14.7061 7.87581L18.7541 8.96762L19.6254 7.9452L19.2453 7.67225L19.8524 7.11941L19.389 6.75624L19.9961 6.29361L19.5952 5.98827Z" fill="url(#paint5_linear_205_1983)"/>
      <path d="M1.54501 5.98827L0.907806 2.89559L1.86245 0.0249634L9.15669 5.43543L6.43409 7.87581L2.38612 8.9653L1.51489 7.94289L1.89489 7.66994L1.28781 7.11709L1.75123 6.75393L1.14415 6.2913L1.54501 5.98827Z" fill="url(#paint6_linear_205_1983)"/>
      <path d="M5.15271 9.61761L6.88127 11.3687L6.94151 13.1035L5.15271 9.61761Z" fill="url(#paint7_linear_205_1983)"/>
      <path d="M15.9875 9.61761L14.1987 13.1035L14.2659 11.3687L15.9875 9.61761Z" fill="url(#paint8_linear_205_1983)"/>
      <path d="M14.5532 16.0806L11.9836 14.8315L12.1875 16.5062L12.1643 17.2117L14.5532 16.0806Z" fill="#FF9F5A"/>
      <path d="M6.58707 16.0805L8.976 17.2094L8.95978 16.5039L9.15673 14.8291L6.58707 16.0805Z" fill="#FF9F5A"/>
      <path d="M16.5621 13.0735L14.5532 16.0806L18.8514 17.2626L20.0795 13.0735H16.5621Z" fill="url(#paint9_linear_205_1983)"/>
      <path d="M1.06766 13.0735L2.28877 17.2626L6.58699 16.0806L4.58502 13.0735H1.06766Z" fill="url(#paint10_linear_205_1983)"/>
      <path d="M1.86243 0.0249634L9.15666 5.43543L8.01201 2.32193L1.86243 0.0249634Z" fill="url(#paint11_linear_205_1983)"/>
      <path d="M13.1282 2.32193L11.9836 5.43543L19.2778 0.0249634L13.1282 2.32193Z" fill="url(#paint12_linear_205_1983)"/>
      <path d="M6.35065 7.80644L5.15271 9.61764L9.41386 9.80732L9.15666 5.43546L6.35065 7.80644Z" fill="url(#paint13_linear_205_1983)"/>
      <path d="M14.7895 7.80644L11.9835 5.43546L11.7263 9.80732L15.9875 9.61764L14.7895 7.80644Z" fill="url(#paint14_linear_205_1983)"/>
      <path d="M6.58707 16.0806L9.15673 14.8315L6.9439 13.1035L6.58707 16.0806Z" fill="#9383FA"/>
      <path d="M11.9836 14.8315L14.5532 16.0806L14.1964 13.1035L11.9836 14.8315Z" fill="#9383FA"/>
      <path d="M14.1987 13.1035L14.5556 16.0806L16.5645 13.0735L14.1987 13.1035Z" fill="url(#paint15_linear_205_1983)"/>
      <path d="M6.94157 13.1035L6.58473 16.0806L4.57581 13.0735L6.94157 13.1035Z" fill="url(#paint16_linear_205_1983)"/>
      <path d="M15.9875 9.61761L11.7263 9.80729L12.1202 11.9978L12.7505 10.6794L14.2659 11.3687L15.9875 9.61761Z" fill="#9C5ADD"/>
      <path d="M6.88127 11.3687L8.3897 10.6794L9.01995 11.9978L9.41386 9.80729L5.15271 9.61761L6.88127 11.3687Z" fill="#9C5ADD"/>
      <path d="M12.1203 11.9979L11.7264 9.80731L11.6267 11.186L11.6198 14.5817L12.1203 11.9979Z" fill="url(#paint17_linear_205_1983)"/>
      <path d="M9.02002 11.9979L9.52051 14.5817L9.51356 11.186L9.41393 9.80731L9.02002 11.9979Z" fill="url(#paint18_linear_205_1983)"/>
      <path d="M12.1805 17.2001L12.1898 16.5038L11.9998 16.3373H9.14048L8.95743 16.5038L8.97365 17.2094L6.58472 16.0805L7.41887 16.7629L9.11731 17.938H12.0206L13.7191 16.7629L14.5532 16.0805L12.1805 17.2001Z" fill="#DF7554"/>
      <path d="M11.9835 14.8315L11.6197 14.5816H9.52046L9.15667 14.8315L8.95972 16.5062L9.14277 16.3396H11.9998L12.1898 16.5062L11.9835 14.8315Z" fill="#161616" stroke="#161616" stroke-width="0.00668686" stroke-miterlimit="10" stroke-linejoin="round"/>
      <path d="M12.7505 10.6794L12.1202 11.9978L14.2659 11.3687L12.7505 10.6794Z" fill="#161616"/>
      <path d="M8.38975 10.6794L9.02 11.9978L6.88132 11.3687L8.38975 10.6794Z" fill="#161616"/>
      <defs>
      <linearGradient id="paint0_linear_205_1983" x1="10.5701" y1="2.32082" x2="10.5701" y2="14.5805" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FB7FE4"/>
      <stop offset="1" stop-color="#BCABFB"/>
      </linearGradient>
      <linearGradient id="paint1_linear_205_1983" x1="17.1393" y1="7.80661" x2="17.1393" y2="13.103" gradientUnits="userSpaceOnUse">
      <stop stop-color="#B65FE5"/>
      <stop offset="1" stop-color="#ADA2FC"/>
      </linearGradient>
      <linearGradient id="paint2_linear_205_1983" x1="4.00472" y1="7.80661" x2="4.00472" y2="13.103" gradientUnits="userSpaceOnUse">
      <stop stop-color="#B65FE5"/>
      <stop offset="1" stop-color="#ADA2FC"/>
      </linearGradient>
      <linearGradient id="paint3_linear_205_1983" x1="11.6201" y1="13.0992" x2="14.266" y2="13.0992" gradientUnits="userSpaceOnUse">
      <stop stop-color="#C8A8F7"/>
      <stop offset="1" stop-color="#BAAAFB"/>
      </linearGradient>
      <linearGradient id="paint4_linear_205_1983" x1="6.88185" y1="13.0992" x2="9.52015" y2="13.0992" gradientUnits="userSpaceOnUse">
      <stop stop-color="#C8A8F7"/>
      <stop offset="1" stop-color="#BAAAFB"/>
      </linearGradient>
      <linearGradient id="paint5_linear_205_1983" x1="13.3344" y1="7.76991" x2="21.1442" y2="3.25322" gradientUnits="userSpaceOnUse">
      <stop stop-color="#541758"/>
      <stop offset="0.4286" stop-color="#4F206C"/>
      <stop offset="0.62" stop-color="#4D2577"/>
      <stop offset="1" stop-color="#8B45B6"/>
      </linearGradient>
      <linearGradient id="paint6_linear_205_1983" x1="6.4016" y1="7.72852" x2="-0.325901" y2="2.07384" gradientUnits="userSpaceOnUse">
      <stop stop-color="#541758"/>
      <stop offset="0.4286" stop-color="#4F206C"/>
      <stop offset="0.62" stop-color="#4D2577"/>
      <stop offset="1" stop-color="#8B45B6"/>
      </linearGradient>
      <linearGradient id="paint7_linear_205_1983" x1="5.15329" y1="11.3603" x2="6.94246" y2="11.3603" gradientUnits="userSpaceOnUse">
      <stop stop-color="#BA86F3"/>
      <stop offset="0.5281" stop-color="#B786F4"/>
      <stop offset="0.8987" stop-color="#AE86F5"/>
      <stop offset="1" stop-color="#AA86F6"/>
      </linearGradient>
      <linearGradient id="paint8_linear_205_1983" x1="14.1978" y1="11.3603" x2="15.987" y2="11.3603" gradientUnits="userSpaceOnUse">
      <stop stop-color="#BA86F3"/>
      <stop offset="0.5281" stop-color="#B786F4"/>
      <stop offset="0.8987" stop-color="#AE86F5"/>
      <stop offset="1" stop-color="#AA86F6"/>
      </linearGradient>
      <linearGradient id="paint9_linear_205_1983" x1="17.3174" y1="13.0727" x2="17.3174" y2="17.2628" gradientUnits="userSpaceOnUse">
      <stop stop-color="#906EF7"/>
      <stop offset="1" stop-color="#575ADE"/>
      </linearGradient>
      <linearGradient id="paint10_linear_205_1983" x1="3.82656" y1="13.0727" x2="3.82656" y2="17.2628" gradientUnits="userSpaceOnUse">
      <stop stop-color="#906EF7"/>
      <stop offset="1" stop-color="#575ADE"/>
      </linearGradient>
      <linearGradient id="paint11_linear_205_1983" x1="1.86302" y1="2.72998" x2="9.1562" y2="2.72998" gradientUnits="userSpaceOnUse">
      <stop stop-color="#BB65ED"/>
      <stop offset="1" stop-color="#E560E3"/>
      </linearGradient>
      <linearGradient id="paint12_linear_205_1983" x1="11.984" y1="2.72998" x2="19.2772" y2="2.72998" gradientUnits="userSpaceOnUse">
      <stop stop-color="#E560E3"/>
      <stop offset="0.2946" stop-color="#DE61E5"/>
      <stop offset="0.7098" stop-color="#CC63E9"/>
      <stop offset="1" stop-color="#BB65ED"/>
      </linearGradient>
      <linearGradient id="paint13_linear_205_1983" x1="7.28362" y1="5.43502" x2="7.28362" y2="9.80699" gradientUnits="userSpaceOnUse">
      <stop stop-color="#DC69E6"/>
      <stop offset="1" stop-color="#C289F3"/>
      </linearGradient>
      <linearGradient id="paint14_linear_205_1983" x1="13.8566" y1="5.43502" x2="13.8566" y2="9.80699" gradientUnits="userSpaceOnUse">
      <stop stop-color="#DC69E6"/>
      <stop offset="1" stop-color="#C289F3"/>
      </linearGradient>
      <linearGradient id="paint15_linear_205_1983" x1="15.3805" y1="9.23862" x2="15.3805" y2="17.035" gradientUnits="userSpaceOnUse">
      <stop stop-color="#6848BA"/>
      <stop offset="0.3363" stop-color="#6356D5"/>
      </linearGradient>
      <linearGradient id="paint16_linear_205_1983" x1="5.75984" y1="13.0726" x2="5.75984" y2="16.0807" gradientUnits="userSpaceOnUse">
      <stop stop-color="#6848BA"/>
      <stop offset="0.3363" stop-color="#6356D5"/>
      </linearGradient>
      <linearGradient id="paint17_linear_205_1983" x1="11.8703" y1="14.5805" x2="11.8703" y2="9.80701" gradientUnits="userSpaceOnUse">
      <stop stop-color="#BA86F3"/>
      <stop offset="0.5281" stop-color="#B786F4"/>
      <stop offset="0.8987" stop-color="#AE86F5"/>
      <stop offset="1" stop-color="#AA86F6"/>
      </linearGradient>
      <linearGradient id="paint18_linear_205_1983" x1="9.01979" y1="12.1938" x2="9.52017" y2="12.1938" gradientUnits="userSpaceOnUse">
      <stop stop-color="#BA86F3"/>
      <stop offset="0.5281" stop-color="#B786F4"/>
      <stop offset="0.8987" stop-color="#AE86F5"/>
      <stop offset="1" stop-color="#AA86F6"/>
      </linearGradient>
      </defs>
    </svg>
  );
}

function SnapLogo({ className }: IconProps): JSX.Element {
  return (
    <svg width="125" height="125" viewBox="0 0 125 125" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M88.5473 0.415527H36.5005C13.893 0.415527 0.415527 13.9484 0.415527 36.5446V88.5034C0.415527 111.1 13.893 124.57 36.5005 124.57H88.4852C111.093 124.57 124.57 111.1 124.57 88.5034V36.5446C124.632 13.9484 111.155 0.415527 88.5473 0.415527ZM59.8533 92.2281C59.8533 94.0904 58.9216 95.7665 57.3068 96.7597C56.4373 97.3184 55.5057 97.5667 54.5119 97.5667C53.7045 97.5667 52.8971 97.3805 52.0897 97.008L30.3518 86.1445C27.2464 84.5305 25.2589 81.3645 25.2589 77.8261V57.2785C25.2589 55.4161 26.1905 53.7401 27.8053 52.7468C29.4201 51.7536 31.3455 51.6915 33.0224 52.4985L54.7604 63.3621C57.9279 64.9761 59.9154 68.142 59.9154 71.6804V92.2281H59.8533ZM58.549 59.0166L35.1962 46.4149C33.5193 45.4838 32.4635 43.6835 32.4635 41.635C32.4635 39.6485 33.5193 37.7862 35.1962 36.855L58.549 24.2533C61.0333 22.9496 63.9524 22.9496 66.4368 24.2533L89.7895 36.855C91.4664 37.7862 92.5223 39.5864 92.5223 41.635C92.5223 43.6835 91.4664 45.4838 89.7895 46.4149L66.4368 59.0166C65.1946 59.6995 63.8282 60.0099 62.4618 60.0099C61.0954 60.0099 59.7912 59.6995 58.549 59.0166ZM99.789 77.8261C99.789 81.3645 97.8015 84.5925 94.634 86.1445L72.896 97.008C72.1507 97.3805 71.3433 97.5667 70.4738 97.5667C69.4801 97.5667 68.5484 97.3184 67.6789 96.7597C66.0641 95.7665 65.1325 94.0904 65.1325 92.2281V71.6804C65.1325 68.142 67.1199 64.914 70.2875 63.3621L92.0254 52.4985C93.7023 51.6915 95.6277 51.7536 97.2425 52.7468C98.8573 53.7401 99.789 55.4161 99.789 57.2785V77.8261Z" fill="#24272A"/>
    </svg>
  );
}


function MetamaskFox({ className }: IconProps): JSX.Element {
  return (
    <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M25.2148 0.942841L15.1025 8.58272L16.983 4.08028L25.2148 0.942841Z" fill="#E17726" stroke="#E17726" stroke-width="0.269643" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M1.88965 0.942841L11.9119 8.65402L10.1215 4.08028L1.88965 0.942841Z" fill="#E27625" stroke="#E27625" stroke-width="0.269643" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M21.5739 18.6572L18.8833 22.854L24.6446 24.4737L26.2949 18.7488L21.5739 18.6572Z" fill="#E27625" stroke="#E27625" stroke-width="0.269643" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M0.819336 18.7488L2.4597 24.4737L8.21097 22.854L5.53038 18.6572L0.819336 18.7488Z" fill="#E27625" stroke="#E27625" stroke-width="0.269643" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M7.90089 11.5674L6.30054 14.0325L12.0018 14.2974L11.8118 8.03265L7.90089 11.5674Z" fill="#E27625" stroke="#E27625" stroke-width="0.269643" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M19.2034 11.5674L15.2326 7.96133L15.1025 14.2973L20.8038 14.0325L19.2034 11.5674Z" fill="#E27625" stroke="#E27625" stroke-width="0.269643" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8.21094 22.854L11.6617 21.1529L8.69104 18.7896L8.21094 22.854Z" fill="#E27625" stroke="#E27625" stroke-width="0.269643" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M15.4426 21.1529L18.8834 22.854L18.4133 18.7896L15.4426 21.1529Z" fill="#E27625" stroke="#E27625" stroke-width="0.269643" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M18.8834 22.8541L15.4426 21.1529L15.7227 23.4347L15.6927 24.4024L18.8834 22.8541Z" fill="#D5BFB2" stroke="#D5BFB2" stroke-width="0.269643" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8.21094 22.8541L11.4116 24.4024L11.3916 23.4347L11.6617 21.1529L8.21094 22.8541Z" fill="#D5BFB2" stroke="#D5BFB2" stroke-width="0.269643" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M11.4717 17.282L8.61108 16.4263L10.6315 15.479L11.4717 17.282Z" fill="#233447" stroke="#233447" stroke-width="0.269643" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M15.6326 17.282L16.4728 15.479L18.5032 16.4263L15.6326 17.282Z" fill="#233447" stroke="#233447" stroke-width="0.269643" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8.21111 22.854L8.71122 18.6572L5.53052 18.7488L8.21111 22.854Z" fill="#CC6228" stroke="#CC6228" stroke-width="0.269643" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M18.3933 18.6572L18.8834 22.854L21.574 18.7488L18.3933 18.6572Z" fill="#CC6228" stroke="#CC6228" stroke-width="0.269643" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M20.8038 14.0325L15.1025 14.2974L15.6327 17.282L16.4728 15.479L18.5033 16.4264L20.8038 14.0325Z" fill="#CC6228" stroke="#CC6228" stroke-width="0.269643" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8.61117 16.4264L10.6316 15.479L11.4718 17.282L12.0019 14.2974L6.30066 14.0325L8.61117 16.4264Z" fill="#CC6228" stroke="#CC6228" stroke-width="0.269643" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6.30066 14.0325L8.69119 18.7896L8.61117 16.4264L6.30066 14.0325Z" fill="#E27525" stroke="#E27525" stroke-width="0.269643" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M18.5035 16.4264L18.4135 18.7896L20.804 14.0325L18.5035 16.4264Z" fill="#E27525" stroke="#E27525" stroke-width="0.269643" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12.0019 14.2974L11.4718 17.282L12.1419 20.8066L12.292 16.1615L12.0019 14.2974Z" fill="#E27525" stroke="#E27525" stroke-width="0.269643" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M15.1027 14.2974L14.8226 16.1513L14.9627 20.8066L15.6328 17.282L15.1027 14.2974Z" fill="#E27525" stroke="#E27525" stroke-width="0.269643" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M15.6327 17.282L14.9625 20.8065L15.4426 21.1529L18.4133 18.7896L18.5033 16.4263L15.6327 17.282Z" fill="#F5841F" stroke="#F5841F" stroke-width="0.269643" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8.61108 16.4263L8.6911 18.7896L11.6618 21.1529L12.1419 20.8065L11.4717 17.282L8.61108 16.4263Z" fill="#F5841F" stroke="#F5841F" stroke-width="0.269643" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M15.6926 24.4024L15.7226 23.4346L15.4625 23.2105H11.6417L11.3916 23.4346L11.4116 24.4024L8.21094 22.854L9.33118 23.7912L11.6017 25.3904H15.4925L17.773 23.7912L18.8833 22.854L15.6926 24.4024Z" fill="#C0AC9D" stroke="#C0AC9D" stroke-width="0.269643" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M15.4426 21.1529L14.9625 20.8065H12.1419L11.6618 21.1529L11.3917 23.4347L11.6418 23.2106H15.4626L15.7227 23.4347L15.4426 21.1529Z" fill="#161616" stroke="#161616" stroke-width="0.269643" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M25.6449 9.08186L26.4951 4.86464L25.2148 0.942841L15.4426 8.32806L19.2035 11.5674L24.5146 13.1463L25.6849 11.7507L25.1748 11.3738L25.985 10.62L25.3648 10.1311L26.175 9.4995L25.6449 9.08186Z" fill="#763E1A" stroke="#763E1A" stroke-width="0.269643" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M0.609375 4.86464L1.46957 9.08186L0.919443 9.4995L1.73962 10.1311L1.11949 10.62L1.92967 11.3738L1.41955 11.7507L2.58981 13.1463L7.90099 11.5674L11.6618 8.32806L1.88966 0.942841L0.609375 4.86464Z" fill="#763E1A" stroke="#763E1A" stroke-width="0.269643" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M24.5147 13.1463L19.2035 11.5674L20.8039 14.0325L18.4133 18.7896L21.574 18.7488H26.2951L24.5147 13.1463Z" fill="#F5841F" stroke="#F5841F" stroke-width="0.269643" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M7.9009 11.5674L2.58973 13.1463L0.819336 18.7488H5.53038L8.69107 18.7896L6.30055 14.0325L7.9009 11.5674Z" fill="#F5841F" stroke="#F5841F" stroke-width="0.269643" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M15.1024 14.2974L15.4425 8.32806L16.9829 4.08029H10.1213L11.6617 8.32806L12.0018 14.2974L12.1318 16.1717L12.1418 20.8065H14.9624L14.9724 16.1717L15.1024 14.2974Z" fill="#F5841F" stroke="#F5841F" stroke-width="0.269643" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );
}