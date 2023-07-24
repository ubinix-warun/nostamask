import { useRouter } from 'next/router';
import Link from 'next/link';
import cn from 'clsx';

type UserNavLinkProps = {
  name: string;
  path: string;
};

export function UserNavLink({ name, path }: UserNavLinkProps): JSX.Element {
  const {
    asPath,
    query: { id }
  } = useRouter();


  // const userPath = `/user/${id as string}${path ? `/${path}` : ''}`;
  const userPath = `/user/npub1qs6kesjt56ux7tl6kupse6x5y5wh9lnagwvuflcfyjy86ctl046av25hskv07a4mhevl3elqm25t2h8fgmmdex9l8d3hxrd6g64gtv87fqt9x4/${path}`;

  return (
    <Link href={userPath} scroll={false} legacyBehavior>
      <a
        className='hover-animation main-tab dark-bg-tab flex flex-1 justify-center
                   hover:bg-light-primary/10 dark:hover:bg-dark-primary/10'
      >
        <div className='px-6 md:px-8'>
          <p
            className={cn(
              'flex flex-col gap-3 whitespace-nowrap pt-3 font-bold transition-colors duration-200',
              asPath === userPath
                ? 'text-light-primary dark:text-dark-primary [&>i]:scale-100 [&>i]:opacity-100'
                : 'text-light-secondary dark:text-dark-secondary'
            )}
          >
            {name}
            <i className='h-1 scale-50 rounded-full bg-main-accent opacity-0 transition duration-200' />
          </p>
        </div>
      </a>
    </Link>
  );
}
