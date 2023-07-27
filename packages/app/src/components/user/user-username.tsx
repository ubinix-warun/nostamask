import Link from 'next/link';
import cn from 'clsx';
import { convertUsernameShort } from '@lib/utils';

type UserUsernameProps = {
  username: string;
  className?: string;
  disableLink?: boolean;
};

export function UserUsername({
  username,
  className,
  disableLink
}: UserUsernameProps): JSX.Element {
  return (
    <Link href={`/user/${username}`} legacyBehavior>
      <a
        className={cn(
          'truncate text-light-secondary dark:text-dark-secondary',
          className,
          disableLink && 'pointer-events-none'
        )}
        tabIndex={-1}
      >
        @{convertUsernameShort(username)}
      </a>
    </Link>
  );
}
