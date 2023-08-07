import { Input } from '@components/input/input';
import { Tweet } from '@components/tweet/tweet';
import type { TweetEventProps } from '@components/tweet/tweet';

type TweetReplyModalProps = {
  tweet: TweetEventProps;
  closeModal: () => void;
};

export function TweetReplyModal({
  tweet,
  closeModal
}: TweetReplyModalProps): JSX.Element {
  return (
    <Input
      modal
      replyModal
      parent={{ id: tweet.id, username: tweet.pubkey }}
      closeModal={closeModal}
    >
      <Tweet modal parentTweet {...tweet} />
    </Input>
  );
}
