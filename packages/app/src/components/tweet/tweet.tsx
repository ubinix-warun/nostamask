import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import cn from 'clsx';
import { useModal } from '@lib/hooks/useModal';
import { delayScroll } from '@lib/utils';
import { Modal } from '@components/modal/modal';
import { TweetReplyModal } from '@components/modal/tweet-reply-modal';
import { ImagePreview } from '@components/input/image-preview';
import { UserAvatar } from '@components/user/user-avatar';
import { UserTooltip } from '@components/user/user-tooltip';
import { UserName } from '@components/user/user-name';
import { UserUsername } from '@components/user/user-username';
import { TweetActions } from '@components/tweet/tweet-actions';
import { TweetStatus } from '@components/tweet/tweet-status';
import { TweetStats } from '@components/tweet/tweet-stats';
import { TweetDate } from '@components/tweet/tweet-date';
import Avatar, { genConfig } from 'react-nice-avatar'
import type { Variants } from 'framer-motion';
import type { Tweet } from '@lib/types/tweet';
import type { User } from '@lib/types/user';
import { Event } from 'nostr-tools';
import { Kind0UserData } from '@lib/utils/nostr';
import useSwr from 'swr'
import { convertPubKeyOnlyToUser, convertUserDataToKind0UserData } from '@lib/utils/convert';

// export type TweetProps = Tweet & {
//   user: User;
//   modal?: boolean;
//   pinned?: boolean;
//   profile?: User | null;
//   parentTweet?: boolean;
// };

// export type TweetEventProps = Tweet & Event & {
export type TweetEventProps = Event & {
  // user: User;
  modal?: boolean;
  pinned?: boolean;
};

export const variants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.8 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

const fetcher = (url: string) => fetch(url).then((res) => res.json())
// const fetcher = async (url: string) => {
//   const res = await fetch(`${url}?_limit=${limit}`);
// };

export function Tweet(tweet : TweetEventProps): JSX.Element {
  const {
    id: tweetId,
    content,
    modal,
    // images,
    // parent,
    // pinned,
  //   profile,
  //   userLikes,
  //   createdBy,
  //   createdAt,
  //   parentTweet,
  //   userReplies,
  //   userRetweets,
    pubkey,
    created_at: createdAt,
    // user: tweetUserData,
    tags
  } = tweet;
  
  const { data: userData, error, isLoading: loading } = useSwr<Kind0UserData>(`/api/metadata/${pubkey}`, fetcher)
  console.log(userData);

  let tweetUserData = convertPubKeyOnlyToUser(pubkey);

  let ownerId = tweetUserData.id;
  let name = tweetUserData.name;
  let username = tweetUserData.username;
  let verified = tweetUserData.verified;
  let photoURL = tweetUserData.photoURL;

  if(userData) {
    tweetUserData = convertUserDataToKind0UserData(userData as Kind0UserData);
    // { id: ownerId, name, username, verified, photoURL } = tweetUserData;
    ownerId = tweetUserData.id;
    name = tweetUserData.name;
    username = tweetUserData.username;
    verified = tweetUserData.verified;
    photoURL = tweetUserData.photoURL;
  }

  // const { user } = useAuth();
  // console.log(tweet);
  // console.log(tweetUserData);

  const { open, openModal, closeModal } = useModal();

  const tweetLink = `/tweet/${tweetId}`;

  // const userId = user?.id as string;
  const userId = tweetUserData?.id as string;

  // const isOwner = userId === createdBy;

  // const { id: parentId, username: parentUsername = username } = parent ?? {};

  // const {
  //   id: profileId,
  //   name: profileName,
  //   username: profileUsername
  // } = profile ?? {};

  // const reply = !!parent;
  // const tweetIsRetweeted = userRetweets.includes(profileId ?? '');

  const reply = tags.length > 0;

  return (
    <motion.article
      {...(!modal ? { ...variants, layout: 'position' } : {})}
      animate={{
        ...variants.animate,
        // ...(parentTweet && { transition: { duration: 0.2 } })
      }}
    >
      <Modal
        className='flex items-start justify-center'
        modalClassName='bg-main-background rounded-2xl max-w-xl w-full my-8 overflow-hidden'
        open={open}
        closeModal={closeModal}
      >
        {/* <TweetReplyModal tweet={tweet} closeModal={closeModal} /> */}
      </Modal>
      <Link href={tweetLink} scroll={!reply} legacyBehavior>
        <a
          className={cn(
            `accent-tab hover-card relative flex flex-col 
             gap-y-4 px-4 py-3 outline-none duration-200`,
            // parentTweet
            //   ? 'mt-0.5 pt-2.5 pb-0'
            //   : 'border-b border-light-border dark:border-dark-border'
          )}
          onClick={delayScroll(200)}
        >
          <div className='grid grid-cols-[auto,1fr] gap-x-3 gap-y-1'>
            {/* <AnimatePresence initial={false}>
              {modal ? null : pinned ? (
                <TweetStatus type='pin'>
                  <p className='text-sm font-bold'>Pinned Tweet</p>
                </TweetStatus>
              ) : (
                tweetIsRetweeted && (
                  <TweetStatus type='tweet'>
                    <Link href={profileUsername as string} legacyBehavior>
                      <a className='custom-underline truncate text-sm font-bold'>
                        {userId === profileId ? 'You' : profileName} Retweeted
                      </a>
                    </Link>
                  </TweetStatus>
                )
              )}
            </AnimatePresence> */}
            <div className='flex flex-col items-center gap-2'>
              <UserTooltip avatar modal={modal} {...tweetUserData}>
                {photoURL=="" ?
                  <Avatar style={{ width: '3rem', height: '3rem' }} {...genConfig(username) } />:
                  <UserAvatar src={photoURL} alt={name} username={username} />
                }
              </UserTooltip>
              {/* {parentTweet && (
                <i className='hover-animation h-full w-0.5 bg-light-line-reply dark:bg-dark-line-reply' />
              )} */}
            </div>
            <div className='flex min-w-0 flex-col'>
              <div className='flex justify-between gap-2 text-light-secondary dark:text-dark-secondary'>
                <div className='flex gap-1 truncate xs:overflow-visible xs:whitespace-normal'>
                  <UserTooltip modal={modal} {...tweetUserData}>
                    <UserName
                      name={name}
                      username={username}
                      verified={verified}
                      className='text-light-primary dark:text-dark-primary'
                    />
                  </UserTooltip>
                  <UserTooltip modal={modal} {...tweetUserData}>
                    <UserUsername username={username} />
                  </UserTooltip>
                  <TweetDate tweetLink={tweetLink} createdAt={createdAt} />
                </div>
                {/* <div className='px-4'>
                  {!modal && (
                    <TweetActions
                      isOwner={isOwner}
                      ownerId={ownerId}
                      tweetId={tweetId}
                      parentId={parentId}
                      username={username}
                      hasImages={!!images}
                      createdBy={createdBy}
                    />
                  )}
                </div> */}
              </div>
              {(reply || modal) && (
                <p
                  className={cn(
                    'text-light-secondary dark:text-dark-secondary',
                    modal && 'order-1 my-2'
                  )}
                >
                  Replying to{' '}
                  {/* <Link href={`/user/${parentUsername}`} legacyBehavior>
                    <a className='custom-underline text-main-accent'>
                      @{parentUsername}
                    </a>
                  </Link> */}
                </p>
              )}
              {content && (
                <p className='whitespace-pre-line break-words'>{content}</p>
              )}
              <div className='mt-1 flex flex-col gap-2'>
                {/* {images && (
                  <ImagePreview
                    tweet
                    imagesPreview={images}
                    previewCount={images.length}
                  />
                )} */}
                {/* {!modal && (
                  <TweetStats
                    reply={reply}
                    userId={userId}
                    isOwner={isOwner}
                    tweetId={tweetId}
                    userLikes={userLikes}
                    userReplies={userReplies}
                    userRetweets={userRetweets}
                    openModal={!parent ? openModal : undefined}
                  />
                )} */}
              </div>
            </div>
          </div>
        </a>
      </Link>
    </motion.article>
  );
}
