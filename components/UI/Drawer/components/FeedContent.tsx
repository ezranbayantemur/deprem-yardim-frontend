import FeedChannelTwitter from "./channels/FeedChannelTwitter";
import FeedChannelBabala from "./channels/FeedChannelBabala";
import FeedChannelGeneric from "./channels/FeedChannelGeneric";
import {
  BaseFeedChannel,
  FeedChannelBabalaProps,
  FeedChannelTwitterProps,
} from "./types";

type Props = {
  content: FeedChannelTwitterProps | FeedChannelBabalaProps;
};

const contentMapper = {
  generic: (source: BaseFeedChannel<any>) => <FeedChannelGeneric {...source} />,
  twitter: (source: FeedChannelTwitterProps) => (
    <FeedChannelTwitter {...source} />
  ),
  Babala: (source: FeedChannelBabalaProps) => <FeedChannelBabala {...source} />,
};

const FeedContent = ({ content }: Props) => {
  console.log();
  const channel = content.channel || "generic";
  // @ts-ignore: content'i uygun bulamıyor, type ile güncellenecek
  return <>{contentMapper[channel](content)}</>;
};

export default FeedContent;