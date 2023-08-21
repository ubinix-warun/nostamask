import Link from 'next/link';
import { useState, useEffect, useRef, useId } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import cn from 'clsx';
import { toast } from 'react-hot-toast';
// import { addDoc, getDoc, serverTimestamp } from 'firebase/firestore';
// import { tweetsCollection } from '@lib/firebase/collections';
// import {
//   manageReply,
//   uploadImages,
//   manageTotalTweets,
//   manageTotalPhotos
// } from '@lib/firebase/utils';
import { useAuth } from '@lib/context/auth-context';
import { convertUsernameShort, sleep } from '@lib/utils';
import { getImagesData } from '@lib/validation';
import { UserAvatar } from '@components/user/user-avatar';
import Avatar, { genConfig } from 'react-nice-avatar'
import { InputForm, fromTop } from './input-form';
import { ImagePreview } from './image-preview';
import { InputOptions } from './input-options';
import type { ReactNode, FormEvent, ChangeEvent, ClipboardEvent } from 'react';
// import type { WithFieldValue } from 'firebase/firestore';
import type { Variants } from 'framer-motion';
import type { User } from '@lib/types/user';
import type { Tweet } from '@lib/types/tweet';
import type { FilesWithId, ImagesPreview, ImageData } from '@lib/types/file';
import { dateToUnix, useNostr } from 'nostr-react';
import { publishTweetData } from '@lib/utils/nostr';
import { uploadImages } from '@lib/utils/infura';

type InputProps = {
  modal?: boolean;
  reply?: boolean;
  parent?: { id: string; username: string };
  disabled?: boolean;
  children?: ReactNode;
  replyModal?: boolean;
  closeModal?: () => void;
};

export const variants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 }
};

export function Input({
  modal,
  reply,
  parent,
  disabled,
  children,
  replyModal,
  closeModal
}: InputProps): JSX.Element {
  const [selectedImages, setSelectedImages] = useState<FilesWithId>([]);
  const [imagesPreview, setImagesPreview] = useState<ImagesPreview>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [visited, setVisited] = useState(false);

  const { user, isAdmin } = useAuth();

  const { publish } = useNostr();
  
  const { name, username, photoURL } = user as User;

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const previewCount = imagesPreview.length;
  const isUploadingImages = !!previewCount;

  useEffect(
    () => {
      if (modal) inputRef.current?.focus();
      return cleanImage;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const sendTweet = async (): Promise<void> => {
    inputRef.current?.blur();

    setLoading(true);

    if(user==null)
    {
      setLoading(false);
      toast.error('Profile is Error');
      return 
    }

    const isReplying = reply ?? replyModal;

    const userId = user?.id as string;

    const tweetData: Omit<Tweet, 'id'> = {
      text: inputValue.trim() || null,
      parent: isReplying && parent ? parent : null,
      images: await uploadImages(userId, selectedImages),
      userLikes: [],
      createdBy: userId,
      createdAt: dateToUnix(),
      // updatedAt: null,
      userReplies: 0,
      userRetweets: []
    };

    await sleep(500);

    try {

      await publishTweetData(user, publish, tweetData);

      // const [tweetRef] = await Promise.all([
      //   addDoc(tweetsCollection, tweetData),
      //   manageTotalTweets('increment', userId),
      //   tweetData.images && manageTotalPhotos('increment', userId),
      //   isReplying && manageReply('increment', parent?.id as string)
      // ]);

      // const { id: tweetId } = await getDoc(tweetRef);

      if (!modal && !replyModal) {
        discardTweet();
        setLoading(false);
      }

      if (closeModal) closeModal();

      toast.success(
        () => (
          <span className='flex gap-2'>
            Your Tweet was sent
            {/* <Link href={`/tweet/${tweetId}`} legacyBehavior>
              <a className='custom-underline font-bold'>View</a>
            </Link> */}
          </span>
        ),
        { duration: 6000 }
      );

    } catch (e) {

        console.log(e);
        
        if (!modal && !replyModal) {
          discardTweet();
          setLoading(false);
        }

        if (closeModal) closeModal();

        toast.error(
          () => (
            <span className='flex gap-2'>
              Your Tweet was Error
              {/* <Link href={`/tweet/${tweetId}`} legacyBehavior>
                <a className='custom-underline font-bold'>View</a>
              </Link> */}
            </span>
          ),
          { duration: 6000 }
        );

    }

  };

  const handleImageUpload = (
    e: ChangeEvent<HTMLInputElement> | ClipboardEvent<HTMLTextAreaElement>
  ): void => {
    const isClipboardEvent = 'clipboardData' in e;

    if (isClipboardEvent) {
      const isPastingText = e.clipboardData.getData('text');
      if (isPastingText) return;
    }

    const files = isClipboardEvent ? e.clipboardData.files : e.target.files;

    const imagesData = getImagesData(files, previewCount);

    if (!imagesData) {
      toast.error('Please choose a GIF or photo up to 4');
      return;
    }

    const { imagesPreviewData, selectedImagesData } = imagesData;

    setImagesPreview([...imagesPreview, ...imagesPreviewData]);
    setSelectedImages([...selectedImages, ...selectedImagesData]);

    inputRef.current?.focus();
  };

  const removeImage = (targetId: string) => (): void => {
    setSelectedImages(selectedImages.filter(({ id }) => id !== targetId));
    setImagesPreview(imagesPreview.filter(({ id }) => id !== targetId));

    const { src } = imagesPreview.find(
      ({ id }) => id === targetId
    ) as ImageData;

    URL.revokeObjectURL(src);
  };

  const cleanImage = (): void => {
    imagesPreview.forEach(({ src }) => URL.revokeObjectURL(src));

    setSelectedImages([]);
    setImagesPreview([]);
  };

  const discardTweet = (): void => {
    setInputValue('');
    setVisited(false);
    cleanImage();

    inputRef.current?.blur();
  };

  const handleChange = ({
    target: { value }
  }: ChangeEvent<HTMLTextAreaElement>): void => setInputValue(value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    void sendTweet();
  };

  const handleFocus = (): void => setVisited(!loading);

  const formId = useId();

  const inputLimit = isAdmin ? 560 : 280;

  const inputLength = inputValue.length;
  const isValidInput = !!inputValue.trim().length;
  const isCharLimitExceeded = inputLength > inputLimit;

  const isValidTweet =
    !isCharLimitExceeded && (isValidInput || isUploadingImages);

  return (
    <form
      className={cn('flex flex-col', {
        '-mx-4': reply,
        'gap-2': replyModal,
        'cursor-not-allowed': disabled
      })}
      onSubmit={handleSubmit}
    >
      {loading && (
        <motion.i className='h-1 animate-pulse bg-main-accent' {...variants} />
      )}
      {children}
      {reply && visited && (
        <motion.p
          className='ml-[75px] -mb-2 mt-2 text-light-secondary dark:text-dark-secondary'
          {...fromTop}
        >
          Replying to{' '}
          <Link href={`/user/${parent?.username as string}`} legacyBehavior>
            <a className='custom-underline text-main-accent'>
              {convertUsernameShort(parent?.username as string)}
            </a>
          </Link>
        </motion.p>
      )}
      <label
        className={cn(
          'hover-animation grid w-full grid-cols-[auto,1fr] gap-3 px-4 py-3',
          reply
            ? 'pt-3 pb-1'
            : replyModal
            ? 'pt-0'
            : 'border-b-2 border-light-border dark:border-dark-border',
          (disabled || loading) && 'pointer-events-none opacity-50'
        )}
        htmlFor={formId}
      >
        {photoURL=="" ?
          <Avatar style={{ width: '3rem', height: '3rem' }} {...genConfig(username) } />:
          <UserAvatar src={photoURL} alt={name} username={username} />
        }
        <div className='flex w-full flex-col gap-4'>
          <InputForm
            modal={modal}
            reply={reply}
            formId={formId}
            visited={visited}
            loading={loading}
            inputRef={inputRef}
            replyModal={replyModal}
            inputValue={inputValue}
            isValidTweet={isValidTweet}
            isUploadingImages={isUploadingImages}
            sendTweet={sendTweet}
            handleFocus={handleFocus}
            discardTweet={discardTweet}
            handleChange={handleChange}
            handleImageUpload={handleImageUpload}
          >
            {isUploadingImages && (
              <ImagePreview
                imagesPreview={imagesPreview}
                previewCount={previewCount}
                removeImage={!loading ? removeImage : undefined}
              />
            )}
          </InputForm>
          <AnimatePresence initial={false}>
            {(reply ? reply && visited && !loading : !loading) && (
              <InputOptions
                reply={reply}
                modal={modal}
                inputLimit={inputLimit}
                inputLength={inputLength}
                isValidTweet={isValidTweet}
                isCharLimitExceeded={isCharLimitExceeded}
                handleImageUpload={handleImageUpload}
              />
            )}
          </AnimatePresence>
        </div>
      </label>
    </form>
  );
}
